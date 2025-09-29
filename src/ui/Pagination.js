import React from "react";

function Pagination({ totalPages, currentPage, setCurrentPage }) {
  function handleNext() {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  }

  function handlePrevious() {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }

  const baseClasses =
    "px-3 py-2 leading-tight border transition duration-150 ease-in-out";
  const normalClasses =
    "text-secondary bg-white border-light-gray hover:bg-light-gray hover:text-text";
  const activeClasses =
    "z-10 bg-primary text-white border-primary hover:bg-primary-600";

  return (
    <nav aria-label="Page navigation example" className="mt-4 shadow-sm">
      <ul className="flex justify-center space-x-1">
        {/* Previous */}
        <li
          className={`${baseClasses} ${normalClasses} rounded-l-lg ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handlePrevious}
        >
          Previous
        </li>

        {/* Pages */}
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          return (
            <li
              key={pageNumber}
              className={`${baseClasses} ${
                pageNumber === currentPage ? activeClasses : normalClasses
              }`}
              onClick={() => setCurrentPage(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}

        {/* Next */}
        <li
          className={`${baseClasses} ${normalClasses} rounded-r-lg ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleNext}
        >
          Next
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
