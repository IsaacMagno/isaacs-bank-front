import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setAccount } from "../../Redux/reducers/moneyManager";
import { createExpense, accountData } from "../../services/axiosRequests";

import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import DataTable from "react-data-table-component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable } from "@fortawesome/free-solid-svg-icons";

const FutureExpenses = () => {
  const [columns, setColumns] = useState();
  const [data, setData] = useState();

  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseDesc, setExpenseDesc] = useState("");
  const [expenseValue, setExpenseValue] = useState("");
  const [expenseName, setExpenseName] = useState("");

  const {
    account: { expenses },
  } = useSelector((state) => state.moneyManager);
  const dispatch = useDispatch();

  // const handleRowSelected = useCallback(async (state) => {
  //   if (state.selectedRows.length) {
  //     const { id } = state.selectedRows[0];
  //     const formatedID = id.replace(/\D/g, "");

  //     await deleteExpense(formatedID);
  //     await expensesManager().then((response) =>
  //       dispatch(setExpenseLogs(response))
  //     );
  //   }
  // }, []);

  useEffect(() => {
    setColumns([
      {
        name: "Categoria",
        selector: (row) => row.category,
      },
      {
        name: "Nome",
        selector: (row) => row.name,
      },
      {
        name: "Descrição",
        selector: (row) => row.description,
      },
      {
        name: "Valor",
        selector: (row) => row.value,
        sortable: true,
      },
    ]);

    if (expenses) {
      setData(
        expenses.map((log) => ({
          id: log.descricao + "_" + log.id,
          name: log.nome,
          category: log.categoria,
          description: log.descricao,
          value: log.valor,
        }))
      );
    }
  }, [expenses]);

  const handleSubmit = async () => {
    await createExpense({
      categoria: expenseCategory,
      nome: expenseName,
      descricao: expenseDesc,
      valor: expenseValue,
    });

    await accountData().then((response) => dispatch(setAccount(response)));

    setExpenseDesc("");
    setExpenseValue("");
    setExpenseCategory("");
    setExpenseName("");
  };

  return (
    <>
      <Card className='mb-4 bg-dark'>
        <Card.Header className='bg-black text-white'>
          <FontAwesomeIcon icon={faTable} className='me-1' />
          Despesas Futuras
        </Card.Header>
        <Card.Body className='bg-dark text-white'>
          <InputGroup className='mb-3'>
            <Dropdown onSelect={(selected) => setExpenseCategory(selected)}>
              <Dropdown.Toggle variant='primary' id='dropdown-basic'>
                {expenseCategory ? expenseCategory : "Categoria"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey='Necessidade'>
                  Necessidade
                </Dropdown.Item>
                <Dropdown.Item eventKey='Desejo'>Desejo</Dropdown.Item>
                <Dropdown.Item eventKey='Importante'>Importante</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Form.Control
              placeholder='Nome'
              aria-label='nome'
              type='text'
              value={expenseName}
              onChange={({ target }) => setExpenseName(target.value)}
            />
            <Form.Control
              placeholder='Descrição'
              aria-label='descrição'
              type='text'
              value={expenseDesc}
              onChange={({ target }) => setExpenseDesc(target.value)}
            />
            <Form.Control
              placeholder='Valor'
              aria-label='valor'
              type='number'
              value={expenseValue}
              onChange={({ target }) => setExpenseValue(target.value)}
            />

            <Button variant='outline-primary' onClick={() => handleSubmit()}>
              Enviar
            </Button>
          </InputGroup>

          <DataTable
            pagination
            responsive
            highlightOnHover
            // selectableRows
            // selectableRowsSingle
            // onSelectedRowsChange={handleRowSelected}
            theme='dark'
            progressPending={expenses ? false : true}
            columns={columns}
            data={data}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default FutureExpenses;
