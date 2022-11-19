import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setAccount } from "../../Redux/reducers/moneyManager";
import {
  createBill,
  accountData,
  updateBill,
} from "../../services/axiosRequests";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import DataTable from "react-data-table-component";
import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable } from "@fortawesome/free-solid-svg-icons";

const Bills = () => {
  const [columns, setColumns] = useState();
  const [data, setData] = useState();

  const [billName, setBillName] = useState("");
  const [billTotalValue, setBillTotalValue] = useState("");
  const [billInstallment, setBillInstallment] = useState("");

  const {
    account: { bills },
  } = useSelector((state) => state.moneyManager);
  const dispatch = useDispatch();

  const interfaceUpdate = async () =>
    await accountData().then((response) => dispatch(setAccount(response)));

  const handleUpdate = async (row) => {
    const id = row.id.replace(/\D/g, "");
    const { installmentValue } = row;
    await updateBill(installmentValue, id);

    interfaceUpdate();
  };

  const handleSubmit = async () => {
    await createBill({
      nome: billName,
      valorTotal: billTotalValue,
      numeroParcelas: billInstallment,
    });

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
        name: "Valor Total",
        selector: (row) => row.totalValue,
        sortable: true,
      },
      {
        name: "Valor Pago",
        selector: (row) => row.totalPaid,
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
        name: "Data Inicio",
        selector: (row) => row.startDate,
        sortable: true,
      },
      {
        name: "Data Final",
        selector: (row) => row.finalDate,
        sortable: true,
      },
      {
        selector: (row) => row.pay,
        cell: (row) => <Button onClick={() => handleUpdate(row)}>Pagar</Button>,
      },
    ]);

    if (bills) {
      setData(
        bills.map((log) => ({
          id: log.nome + "_" + log.id,
          name: log.nome,
          totalValue: log.valorTotal,
          totalPaid: parseFloat(log.valorPago.toFixed(2)),
          installment: log.numeroParcelas,
          installmentValue: parseFloat(log.valorParcelas.toFixed(2)),
          startDate: moment(log.dataInicio).format("DD/MM/YYYY"),
          finalDate: moment(log.dataFinal).format("DD/MM/YYYY"),
        }))
      );
    }
  }, [bills]);

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
            columns={columns}
            data={data}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default Bills;
