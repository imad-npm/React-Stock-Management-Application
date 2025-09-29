import React, { useEffect, useState } from 'react'

function Pagination({totalPages,currentPage,setCurrentPage}) {


    function handleNext() {
        setCurrentPage(currentPage+1)
      }
      function handlePrevious() {
        setCurrentPage(currentPage-1)
      }

    

  return (
           
<nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className={`page-item ${currentPage==1 ? 'disabled':'' }`} onClick={handlePrevious}>
      <a className="page-link" href="#" >Previous</a>
      </li>
   
      {
  Array.from({ length: totalPages }, (_, index) => (
    <li
      key={index} // Add key prop here
      className={`page-item ${index + 1 === currentPage ? "active" : ""}`}
      onClick={() => setCurrentPage(index + 1)}
    >
      <a className="page-link" href="#">
        {index + 1}
      </a>
    </li>
  ))
}

   
    <li className="page-item"className={currentPage==totalPages ? 'disabled':''}  onClick={handleNext}><a className="page-link" href="#">Next</a></li>
  </ul>
</nav>
  )
}

export default Pagination