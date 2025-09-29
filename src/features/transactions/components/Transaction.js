import React from 'react';
import useTransactionStore from '../transactionStore.js';
import EditTransaction from './EditTransaction';

function Transaction({ transaction, openModal }) {
    const { deleteTransaction } = useTransactionStore();

  return (
    <tr>
    <td>{transaction.id}</td>
    <td>{transaction.product}</td>
    <td>{transaction.quantity}</td>
   <td>{transaction.type}</td> 
   <td>{transaction.date}</td>
    
 <td>
    <i className="fa fa-edit text-success " onClick={()=>openModal("Edit Product",<EditTransaction transaction={transaction}/>)}></i>
    <i className="fa fa-trash text-danger" aria-hidden="true" onClick={()=>deleteTransaction(transaction)}></i>

    </td>

  </tr>
  )
}

export default Transaction