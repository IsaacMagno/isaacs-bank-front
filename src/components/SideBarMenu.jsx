import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faChartArea,
  faTable,
} from "@fortawesome/free-solid-svg-icons";

const SideBarMenu = () => {
  return (
    <>
      <div id='layoutSidenav_nav'>
        <nav
          className='sb-sidenav accordion sb-sidenav-dark'
          id='sidenavAccordion'
        >
          <a className='navbar-brand ps-3' href='/'>
            <img
              className='img-thumbnail bg-transparent'
              style={{ border: "none" }}
              src={require("../images/iLogo.png")}
            />
          </a>
          <div className='sb-sidenav-menu'>
            <div className='nav'>
              <div className='sb-sidenav-menu-heading'>Menu</div>
              <a className='nav-link' href='/'>
                <div className='sb-nav-link-icon'>
                  <FontAwesomeIcon icon={faTachometerAlt} />
                </div>
                Dashboard
              </a>
              {/* <div className='sb-sidenav-menu-heading'>Seções</div>
              <a className='nav-link' href='/'>
                <div className='sb-nav-link-icon'>
                  <FontAwesomeIcon icon={faChartArea} />
                </div>
                Gráficos
              </a>
              <a className='nav-link' href='/'>
                <div className='sb-nav-link-icon'>
                  <FontAwesomeIcon icon={faTable} />
                </div>
                Tabelas
              </a> */}
            </div>
          </div>
          <div className='sb-sidenav-footer'>
            <div className='small'>Desenvolvido por:</div>
            Isaac Magno
          </div>
        </nav>
      </div>
    </>
  );
};

export default SideBarMenu;
