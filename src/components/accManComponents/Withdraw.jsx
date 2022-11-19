import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setAccount } from "../../Redux/reducers/moneyManager";
import { valuesManager, accountData } from "../../services/axiosRequests";

import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import DataTable from "react-data-table-component";
import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable } from "@fortawesome/free-solid-svg-icons";

const Withdraw = () => {
  const [columns, setColumns] = useState();
  const [data, setData] = useState();

  const [withdrawValue, setWithdrawValue] = useState("");
  const [withdrawDesc, setWithdrawDesc] = useState("");
  const [withdrawCategory, setWithdrawCategory] = useState("");

  const {
    account: { withdrawals },
  } = useSelector((state) => state.moneyManager);
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

    if (withdrawals) {
      setData(
        withdrawals.map((log) => ({
          id: Math.floor(Math.random() * 100) + log.id,
          category: log.categoria,
          description: log.descricao,
          date: moment(log.data).format("DD/MM/YYYY"),
          value: log.valor,
        }))
      );
    }
  }, [withdrawals]);

  const handleSubmit = async () => {
    await valuesManager(
      {
        valor: withdrawValue,
        descricao: withdrawDesc,
        categoria: withdrawCategory,
      },
      "withdraw"
    );

    await accountData().then((response) => dispatch(setAccount(response)));
    setWithdrawValue("");
    setWithdrawDesc("");
    setWithdrawCategory("");
  };

  return (
    <>
      <Card className='mb-4 bg-dark'>
        <Card.Header className='bg-black text-white'>
          <FontAwesomeIcon icon={faTable} className='me-1' />
          Saques
        </Card.Header>
        <Card.Body className='bg-dark text-white'>
          <InputGroup className='mb-3'>
            <Form.Control
              placeholder='Sacar'
              aria-label='sacar'
              type='number'
              value={withdrawValue}
              onChange={({ target }) => setWithdrawValue(target.value)}
            />
            <Form.Control
              placeholder='Descrição'
              aria-label='descrição'
              type='text'
              value={withdrawDesc}
              onChange={({ target }) => setWithdrawDesc(target.value)}
            />
            <Dropdown onSelect={(selected) => setWithdrawCategory(selected)}>
              <Dropdown.Toggle variant='danger' id='dropdown-basic'>
                {withdrawCategory ? withdrawCategory : "Categoria"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey='Mercado'>Mercado</Dropdown.Item>
                <Dropdown.Item eventKey='Manutenção'>Manutenção</Dropdown.Item>
                <Dropdown.Item eventKey='Gasolina'>Gasolina</Dropdown.Item>
                <Dropdown.Item eventKey='Despesas'>Despesas</Dropdown.Item>
                <Dropdown.Item eventKey='Outros'>Outros</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button variant='outline-danger' onClick={() => handleSubmit()}>
              Enviar
            </Button>
          </InputGroup>

          <DataTable
            pagination
            responsive
            highlightOnHover
            theme='dark'
            progressPending={withdrawals ? false : true}
            columns={columns}
            data={data}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default Withdraw;
