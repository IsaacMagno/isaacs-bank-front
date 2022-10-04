import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import SideBarMenu from "../components/SideBarMenu";
import MainContent from "../components/MainContent";

const Home = () => {
  const bankRegister = useSelector((state) => state.moneyManager);

  useEffect(() => {}, [bankRegister]);

  return (
    <div className='container-flex'>
      <div id='layoutSidenav' className='layoutSidenav'>
        <SideBarMenu />
        <MainContent />
      </div>
    </div>
  );
};

export default Home;
