import React from "react";

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  onPrevPage,
  onNextPage,
}) {
  return (
    <div className="pageNo">
      <button
        onClick={onPrevPage}
        disabled={currentPage === 1}
        className="page-icon"
      >
        {/* <img src="left-arrow.png" alt="previous"  className="page-icon"/> */}
        Prev
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <p
          key={index}
          style={{ margin: "5px", cursor: "pointer" }}
          onClick={() => onPageChange(index + 1)}
          className={index + 1 === currentPage ? "currentPage" : ""}
        >
          {index + 1}
        </p>
      ))}
      <button
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className="page-icon"
      >
        {/* <img src="right-arrow.png" alt="next" className="page-icon"/> */}
        Next
      </button>
    </div>
  );
}

export default Pagination;
