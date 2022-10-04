import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { valuesManager } from "../../services/axiosRequests";
import { depositManager } from "../../functions/depositManager";
import { setDepositLogs } from "../../Redux/reducers/moneyManager";

import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import DataTable from "react-data-table-component";
import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable } from "@fortawesome/free-solid-svg-icons";

const Deposit = () => {
  const [columns, setColumns] = useState();
  const [data, setData] = useState();

  const [depositValue, setDepositValue] = useState("");
  const [depositDesc, setDepositDesc] = useState("");
  const [depositCategory, setDepositCategory] = useState("");

  const { depositLogs } = useSelector((state) => state.moneyManager);
  const dispatch = useDispatch();

  useEffect(() => {
    setColumns([
      {
        name: "Categoria",
        selector: (row) => row.category,
      },
      {
        name: "Descrição",
        selector: (row) => row.description,
      },
      {
        name: "Data",
        selector: (row) => row.date,
        sortable: true,
      },
      {
        name: "Valor",
        selector: (row) => row.value,
        sortable: true,
      },
    ]);

    if (depositLogs) {
      setData(
        depositLogs.map((log) => ({
          id: Math.floor(Math.random() * 100) + log.id,
          category: log.category,
          description: log.description,
          date: moment(log.createdAt).format("DD/MM/YYYY"),
          value: log.value,
        }))
      );
    }
  }, [depositLogs]);

  const handleSubmit = async () => {
    await valuesManager(
      {
        value: depositValue,
        description: depositDesc,
        category: depositCategory,
      },
      "deposit"
    );

    await depositManager().then((response) =>
      dispatch(setDepositLogs(response))
    );

    setDepositValue("");
    setDepositDesc("");
    setDepositCategory("");
  };

  return (
    <>
      <Card className='mb-4  bg-dark'>
        <Card.Header className='bg-black text-white'>
          <FontAwesomeIcon icon={faTable} className='me-1' />
          Depósitos
        </Card.Header>
        <Card.Body className='bg-dark text-white'>
          <InputGroup className='mb-3'>
            <Form.Control
              placeholder='Depositar'
              aria-label='depositar'
              type='number'
              value={depositValue}
              onChange={({ target }) => setDepositValue(target.value)}
            />
            <Form.Control
              placeholder='Descrição'
              aria-label='descrição'
              type='text'
              value={depositDesc}
              onChange={({ target }) => setDepositDesc(target.value)}
            />
            <Dropdown onSelect={(selected) => setDepositCategory(selected)}>
              <Dropdown.Toggle variant='success' id='dropdown-basic'>
                {depositCategory ? depositCategory : "Categoria"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey='Salario'>Sálario</Dropdown.Item>
                <Dropdown.Item eventKey='Renda Extra'>
                  Renda Extra
                </Dropdown.Item>
                <Dropdown.Item eventKey='Outros'>Outros</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button variant='outline-success' onClick={() => handleSubmit()}>
              Enviar
            </Button>
          </InputGroup>

          <DataTable
            pagination
            responsive
            highlightOnHover
            theme='dark'
            progressPending={depositLogs ? false : true}
            columns={columns}
            data={data}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default Deposit;
