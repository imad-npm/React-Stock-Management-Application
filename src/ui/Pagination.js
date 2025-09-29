import React, { useEffect, useState } from 'react'

function Pagination({totalPages,currentPage,setCurrentPage}) {


    function handleNext() {
        setCurrentPage(currentPage+1)
      }
      function handlePrevious() {
        setCurrentPage(currentPage-1)
      }

    

  return (
           
<nav aria-label="Page navigation example" className="mt-4 shadow-sm">
  <ul className="flex justify-center space-x-1">
    <li className={`px-3 py-2 leading-tight text-secondary bg-white border border-light-gray rounded-l-lg hover:bg-light-gray hover:text-text transition duration-150 ease-in-out ${currentPage==1 ? 'opacity-50 cursor-not-allowed':'' }`} onClick={handlePrevious}>
      Previous
      </li>
   
      {
  Array.from({ length: totalPages }, (_, index) => (
    <li
      key={index} // Add key prop here
      className={`px-3 py-2 leading-tight text-secondary bg-white border border-light-gray hover:bg-light-gray hover:text-text transition duration-150 ease-in-out ${index + 1 === currentPage ? "z-10 bg-primary text-white border-primary hover:bg-indigo-700 hover:text-white" : ""}`}
      onClick={() => setCurrentPage(index + 1)}
    >
      {index + 1}
    </li>
  ))
}

   
    <li className={`px-3 py-2 leading-tight text-secondary bg-white border border-light-gray rounded-r-lg hover:bg-light-gray hover:text-text transition duration-150 ease-in-out ${currentPage==totalPages ? 'opacity-50 cursor-not-allowed':''}`}  onClick={handleNext}>Next</li>
  </ul>
</nav>
  )
}

export default Pagination