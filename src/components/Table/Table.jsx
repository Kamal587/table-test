import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import "./Table.css";
import { COLUMNS } from "./columns";
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
} from "react-table";
import Pagination from "./Pagination/Pagination";

import { GlobalFilter } from "./Filter/GlobalFilter";

const Table = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useSelector((state) => state.posts.posts);
  console.log(data);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    gotoPage,
    page,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state,
  } = useTable(
    { columns, data, initialState: { pageIndex: 0 } },

    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const { globalFilter } = state;
  const { pageSize } = state;
  return (
    <div>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "15px 10px",

                        background: "white",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        {/* <button onClick={() => previousPage()}>Назад</button> */}
        <Pagination
          gotoPage={gotoPage}
          length={data.length}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
        {/* <button onClick={() => nextPage()}>Вперед</button> */}
      </div>
    </div>
  );
};

export default Table;
