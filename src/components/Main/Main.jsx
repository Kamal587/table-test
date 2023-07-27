import React from "react";
import style from "./Main.module.css";

import Table from "../Table/Table";

const Main = () => {
  return (
    <div className={style.wrap}>
      <Table />
    </div>
  );
};

export default Main;
