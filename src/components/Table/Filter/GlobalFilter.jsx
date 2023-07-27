import style from "./GlobalFilter.module.css";
import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
import search from "./../../../assets/search.png";

export const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 200);
  return (
    <div className={style.search}>
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        className={style.inpSearch}
        placeholder={"Поиск"}
      />
      <img src={search} alt="" className={style.imgSearch} />
    </div>
  );
};
