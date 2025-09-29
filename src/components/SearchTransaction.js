import React, { useContext, useEffect, useState } from 'react'
import { TransactionsContext } from '../context/TransactionsContextProvider';




function SearchTransaction() {


function handleSearch(e) {
    
    var search=e.target.value ;
     setFilteredTransactions(transactions.filter((p)=>p.product.toLowerCase().includes(search)  ) )
     
}


  return (
    <div className='col-sm-6'>
    <input class="form-control  " type="search" placeholder="Search" 
    aria-label="Search" onChange={handleSearch} />
        </div>
  )
}

export default SearchTransaction