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
  <ul class="pagination">
    <li className={`page-item ${currentPage==1 ? 'disabled':'' }`} onClick={handlePrevious}>
      <a class="page-link" href="#" >Previous</a>
      </li>
   
      {
  Array.from({ length: totalPages }, (_, index) => (
    <li
      className={`page-item ${index + 1 === currentPage ? "active" : ""}`}
      onClick={() => setCurrentPage(index + 1)}
    >
      <a className="page-link" href="#">
        {index + 1}
      </a>
    </li>
  ))
}

   
    <li class="page-item"className={currentPage==totalPages ? 'disabled':''}  onClick={handleNext}><a class="page-link" href="#">Next</a></li>
  </ul>
</nav>
  )
}

export default Pagination