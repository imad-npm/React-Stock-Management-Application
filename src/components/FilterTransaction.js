import React, { useContext, useEffect, useState } from 'react'
import { TransactionsContext } from '../context/TransactionsContextProvider';

function FilterTransaction() {


    const [fromDate,setFromDate]=useState() ;
    const [toDate,setToDate]=useState() ;
    const {setFilteredTransactions,transactions}=useContext(TransactionsContext) ;
    const [type, setType] = useState("ALL")
  

    useEffect(() => {
        const filteredTransactions = transactions.filter(t => {
          const transactionDate = new Date(t.date);
          const fromDateTime = fromDate ? new Date(fromDate).setHours(0, 0, 0, 0) : null;
          const toDateTime = toDate ? new Date(toDate).setHours(23, 59, 59, 999) : null;
          const isTypeMatch = type === 'ALL' || t.type === type;
      console.log(transactionDate,fromDateTime);
          if (fromDate && toDate) {
            return isTypeMatch && transactionDate >= fromDateTime && transactionDate <= toDateTime;
          } else if (fromDate) {
            return isTypeMatch && transactionDate >= fromDateTime;
          } else if (toDate) {
            return isTypeMatch && transactionDate <= toDateTime;
          } else {
            return isTypeMatch;
          }
        });
      
        setFilteredTransactions(filteredTransactions);
      }, [fromDate, toDate, type]);
      
      
    


  return (
    <div class="row mt-4">
    <div class="col-md-4">
      <label for="fromDate" class="form-label">From Date</label>
      <input type="date" class="form-control" onChange={(e)=>setFromDate(e.target.value)} id="fromDate"/>
    </div>
    <div class="col-md-4">
      <label for="toDate" class="form-label">To Date</label>
      <input type="date" class="form-control" onChange={(e)=>setToDate(e.target.value)}
       id="toDate"/>
    </div>
    <div class="col-md-4">
      <label for="type" class="form-label">Type</label>
      <select id='type' onChange={(e)=>setType(e.target.value)} className='form-select'>
      <option value='ALL'>ALL</option>
        <option value='EXIT'>EXIT</option>
        <option value="ENTRY">ENTRY</option>
      </select>
    </div>

  </div>
  )
}

export default FilterTransaction