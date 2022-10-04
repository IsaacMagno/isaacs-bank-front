import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Card from "react-bootstrap/Card";
import DataTable from "react-data-table-component";
import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable } from "@fortawesome/free-solid-svg-icons";

const Logs = () => {
  const [allLogs, setAllLogs] = useState();
  const [columns, setColumns] = useState();
  const [data, setData] = useState();

  const { withdrawLogs, depositLogs } = useSelector(
    (state) => state.moneyManager
  );

  useEffect(() => {
    setAllLogs([...withdrawLogs, ...depositLogs]);
  }, [withdrawLogs, depositLogs]);

  useEffect(() => {
    setColumns([
      {
        id: "categoryId",
        name: "Categoria",
        selector: (row) => row.category,
      },
      {
        id: "descriptionId",
        name: "Descrição",
        selector: (row) => row.description,
      },
      {
        id: "dateId",
        name: "Data",
        selector: (row) => row.date,
        sortable: true,
      },
      {
        id: "valueId",
        name: "Valor",
        selector: (row) => row.value,
        sortable: true,
      },
    ]);

    if (allLogs) {
      setData(
        allLogs.map((log) => ({
          id: Math.random() * log.id,
          category: log.category,
          description: log.description,
          date: moment(log.createdAt).format("DD/MM/YYYY"),
          value: log.value,
        }))
      );
    }
  }, [allLogs]);

  return (
    <>
      <Card className='mb-4 bg-dark'>
        <Card.Header className='bg-black text-white'>
          <FontAwesomeIcon icon={faTable} className='me-1' />
          Registros
        </Card.Header>
        <Card.Body className='bg-dark text-white'>
          <DataTable
            pagination
            responsive
            highlightOnHover
            defaultSortFieldId='valueId'
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

export default Logs;
