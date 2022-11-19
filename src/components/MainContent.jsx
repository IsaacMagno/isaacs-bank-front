import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Deposit from "./accManComponents/Deposit";
import Withdraw from "./accManComponents/Withdraw";
import Logs from "./accManComponents/Logs";
import Bills from "./accManComponents/Bills";
import FutureExpenses from "./accManComponents/FutureExpenses";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const MainContent = () => {
  const [Component, setComponent] = useState(<Logs />);
  const [tableSelected, setTableSelected] = useState("logs");

  const {
    account: { saldo },
  } = useSelector((state) => state.moneyManager);

  useEffect(() => {
    if (tableSelected == "withdraw") setComponent(<Withdraw />);

    if (tableSelected == "deposit") setComponent(<Deposit />);

    if (tableSelected == "logs") setComponent(<Logs />);

    if (tableSelected == "bill") setComponent(<Bills />);

    if (tableSelected == "expense") setComponent(<FutureExpenses />);
  }, [tableSelected]);

  return (
    <>
      <div id='layoutSidenav_content'>
        <main style={{ height: "60rem" }} className='m-5'>
          <div className='container-fluid px-4'>
            <h1 className='mt-4 text-gainsboro'>Bem vindo</h1>
            <ol className='breadcrumb mb-4'>
              <li className='breadcrumb-item active text-white'>
                <h5>
                  Saldo:{"  "}
                  {saldo
                    ? saldo.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })
                    : null}
                </h5>
              </li>
            </ol>
            <div className='row'>
              <div className='col-xl-3 col-md-6'>
                <div
                  className='card bg-primary text-white mb-4'
                  style={{ cursor: "pointer" }}
                >
                  <div className='card-body'>Despesas Futuras</div>
                  <div className='card-footer d-flex align-items-center justify-content-between'>
                    <span
                      className='small text-white stretched-link'
                      onClick={() => setTableSelected("expense")}
                    >
                      Ver detalhes
                    </span>
                    <div className='small text-white'>
                      <FontAwesomeIcon icon={faAngleRight} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-xl-3 col-md-6'>
                <div
                  className='card bg-warning text-white mb-4'
                  style={{ cursor: "pointer" }}
                >
                  <div className='card-body'>Contas</div>
                  <div className='card-footer d-flex align-items-center justify-content-between'>
                    <span
                      className='small text-white stretched-link'
                      onClick={() => setTableSelected("bill")}
                    >
                      Ver detalhes
                    </span>
                    <div className='small text-white'>
                      <FontAwesomeIcon icon={faAngleRight} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-xl-3 col-md-6'>
                <div
                  className='card bg-success text-white mb-4'
                  style={{ cursor: "pointer" }}
                >
                  <div className='card-body'>Depósitos</div>
                  <div className='card-footer d-flex align-items-center justify-content-between'>
                    <span
                      className='small text-white stretched-link'
                      onClick={() => setTableSelected("deposit")}
                    >
                      Ver detalhes
                    </span>
                    <div className='small text-white'>
                      <FontAwesomeIcon icon={faAngleRight} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-xl-3 col-md-6'>
                <div
                  className='card bg-danger text-white mb-4'
                  style={{ cursor: "pointer" }}
                >
                  <div className='card-body'>Saques</div>
                  <div className='card-footer d-flex align-items-center justify-content-between'>
                    <span
                      className='small text-white stretched-link'
                      onClick={() => setTableSelected("withdraw")}
                    >
                      Ver detalhes
                    </span>
                    <div className='small text-white'>
                      <FontAwesomeIcon icon={faAngleRight} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {Component}
          </div>
        </main>
        <footer className='py-4 bg-black mt-auto'>
          <div className='container-fluid px-4'>
            <div className='d-flex align-items-center justify-content-between small'>
              <div className='text-muted'>
                Copyright &copy; IsaacBanks - 2022
              </div>
              <div>
                <a href='#'>Privacy Policy</a>
                &middot;
                <a href='#'>Terms &amp; Conditions</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default MainContent;
