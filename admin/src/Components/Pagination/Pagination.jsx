import React from "react";
import "./Pagination.css";

const Pagination = ({ page, totalPages, setPage }) => {
  if (totalPages <= 1) return null;

  const prev = () => setPage(Math.max(1, page - 1));
  const next = () => setPage(Math.min(totalPages, page + 1));

  const pagesToShow = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);
  for (let i = start; i <= end; i++) pagesToShow.push(i);

  return (
    <div className="pagination">
      <button onClick={prev} disabled={page === 1}>Prev</button>
      {start > 1 && <button onClick={() => setPage(1)}>1</button>}
      {start > 2 && <span className="dots">…</span>}
      {pagesToShow.map((p) => (
        <button key={p} onClick={() => setPage(p)} className={p === page ? "active" : ""}>
          {p}
        </button>
      ))}
      {end < totalPages - 1 && <span className="dots">…</span>}
      {end < totalPages && <button onClick={() => setPage(totalPages)}>{totalPages}</button>}
      <button onClick={next} disabled={page === totalPages}>Next</button>
    </div>
  );
};

export default Pagination;
