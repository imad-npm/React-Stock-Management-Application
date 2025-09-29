import React, { useContext } from 'react'

import EditTransaction from './EditTransaction';
import { TransactionsContext } from '../context/TransactionsContextProvider';


function Transaction({transaction,openModal}) {

  const {deleteTransaction}=useContext(TransactionsContext)

  return (
    <tr>
    <td>{transaction.id}</td>
    <td>{transaction.product}</td>
    <td>{transaction.quantity}</td>
   <td>{transaction.type}</td> 
   <td>{transaction.date}</td>
    
 <td>
    <i class="fa fa-edit text-success " onClick={()=>openModal("Edit Product",<EditTransaction transaction={transaction}/>)}></i>
    <i class="fa fa-trash text-danger" aria-hidden="true" onClick={()=>deleteTransaction(transaction)}></i>

    </td>

  </tr>
  )
}

export default Transaction