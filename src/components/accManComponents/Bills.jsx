import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { valuesManager, updateBill } from "../../services/axiosRequests";
import { billManager } from "../../functions/billManager";
import { setBillLogs } from "../../Redux/reducers/moneyManager";

import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import DataTable from "react-data-table-component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable } from "@fortawesome/free-solid-svg-icons";

const Bills = () => {
  const [columns, setColumns] = useState();
  const [data, setData] = useState();

  const [billName, setBillName] = useState("");
  const [billTotalValue, setBillTotalValue] = useState("");
  const [billInstallment, setBillInstallment] = useState("");

  const { billLogs } = useSelector((state) => state.moneyManager);
  const dispatch = useDispatch();

  const interfaceUpdate = async () =>
    await billManager().then((response) => dispatch(setBillLogs(response)));

  const handleUpdate = async (name, selected, targetId) => {
    const id = targetId.replace(/\D/g, "");
    await updateBill(name, selected, id);

    interfaceUpdate();
  };

  const handleSubmit = async () => {
    await valuesManager(
      {
        name: billName,
        value: 0,
        totalValue: billTotalValue,
        installment: billInstallment,
        status: "Em andamento",
      },
      "bill"
    );

    interfaceUpdate();

    setBillName("");
    setBillTotalValue("");
    setBillInstallment("");
  };

  useEffect(() => {
    setColumns([
      {
        name: "Nome",
        selector: (row) => row.name,
      },
      {
        name: "Valor Pago",
        selector: (row) => row.value,
        sortable: true,
        cell: (row) => (
          <Form.Control
            placeholder='Valor'
            aria-label='valor'
            type='number'
            value={row.value}
            id={row.id}
            onChange={({ target }) =>
              handleUpdate("value", target.value, target.id)
            }
          />
        ),
      },
      {
        name: "Valor Total",
        selector: (row) => row.totalValue,
        sortable: true,
      },
      {
        name: "Qtd. Parcelas",
        selector: (row) => row.installment,
        sortable: true,
      },
      {
        name: "Valor Parcelas",
        selector: (row) => row.installmentValue,
        sortable: true,
      },
      {
        name: "Status",
        selector: (row) => row.status,
        sortable: true,
        cell: (row) => (
          <Dropdown
            onSelect={(selected, { target }) =>
              handleUpdate("status", selected, target.id)
            }
          >
            <Dropdown.Toggle
              variant='warning'
              id='dropdown-basic'
              style={{ minWidth: "18.5vh" }}
            >
              {row.status}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey='Em andamento' id={row.id}>
                Em andamento
              </Dropdown.Item>
              <Dropdown.Item eventKey='Concluido' id={row.id}>
                Concluido
              </Dropdown.Item>
              <Dropdown.Item eventKey='Parado' id={row.id}>
                Parado
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ),
      },
    ]);

    if (billLogs) {
      setData(
        billLogs.map((log) => ({
          id: log.name + "_" + log.id,
          name: log.name,
          value: log.value,
          totalValue: log.totalValue,
          installment: log.installment,
          installmentValue: log.installmentValue,
          status: log.status,
        }))
      );
    }
  }, [billLogs]);

  return (
    <>
      <Card className='mb-4 bg-dark'>
        <Card.Header className='bg-black text-white'>
          <FontAwesomeIcon icon={faTable} className='me-1' />
          Contas
        </Card.Header>
        <Card.Body className='bg-dark text-white'>
          <InputGroup className='mb-3'>
            <Form.Control
              placeholder='Nome'
              aria-label='Nome'
              type='text'
              value={billName}
              onChange={({ target }) => setBillName(target.value)}
            />
            <Form.Control
              placeholder='Valor Total'
              aria-label='valor total'
              type='number'
              value={billTotalValue}
              onChange={({ target }) => setBillTotalValue(target.value)}
            />
            <Form.Control
              placeholder='N° de Parcelas'
              aria-label='N° de Parcelas'
              type='number'
              value={billInstallment}
              onChange={({ target }) => setBillInstallment(target.value)}
            />
            <Button variant='outline-warning' onClick={() => handleSubmit()}>
              Enviar
            </Button>
          </InputGroup>

          <DataTable
            pagination
            responsive
            highlightOnHover
            theme='dark'
            progressPending={billLogs ? false : true}
            columns={columns}
            data={data}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default Bills;
