import { useState, useEffect, memo } from "react";
import "./Pagination.css";
import { usePaginationPages } from "./usePaginationPages";

function Pagination({ gotoPage, length, pageSize, setPageSize }) {
  const [perPage, setPerPage] = useState(pageSize);

  const { canGo, currentPage, pages, goTo, goNext, goPrev } =
    usePaginationPages({
      gotoPage,
      length,
      pageSize,
    });

  useEffect(() => {
    setPageSize(Number(perPage));
  }, [perPage, setPageSize]);

  return (
    <div className="pagination">
      <button onClick={goPrev} disabled={!canGo.previous} className="prev">
        Назад
      </button>
      <div>
        {pages.map((page, i) => (
          <button
            onClick={() => goTo(page)}
            key={i}
            style={{
              color: currentPage === page ? "#7EBC3C" : "#474955",
            }}
            className="page"
          >
            {page}
          </button>
        ))}
      </div>
      <button onClick={goNext} disabled={!canGo.next} className="next">
        Далее
      </button>
    </div>
  );
}

export default memo(Pagination);
