import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { createContext } from 'react';
import { ProductsContext } from './ProductsContextProvider';
import * as XLSX from 'xlsx';
import generateTransactions from '../generateTransactions'

const MyContext=createContext() ;


function TransactionsContextProvider({children}) {

    const [transactions,setTransactions]=useState(generateTransactions(10)) 

    const {updateStock}=useContext(ProductsContext)

const[filteredTransactions,setFilteredTransactions]=useState([])

useEffect(()=>{
setFilteredTransactions(transactions)

},[transactions]
)


 function insertTransaction(transaction) {
      setTransactions( [...transactions, transaction]);

   if (transaction.type=='ENTRY') 
                updateStock(transaction.product,transaction.quantity)
       else 
        updateStock(transaction.product,transaction.quantity*(-1))

       
    
 }
 function deleteTransaction(transaction) {
  var id=transaction.id ;

  setTransactions(transactions.filter(t=>t.id!=id))

  if (transaction.type=='EXIT') 
  updateStock(transaction.product,transaction.quantity)
else 
updateStock(transaction.product,transaction.quantity*(-1))


}


function updateTransaction(updatedTransaction) {
  
  var index=transactions.findIndex(t=>t.id===updatedTransaction.id)


  if(index!=-1){

    var prevQuantity,
    newQuantity=updatedTransaction.quantity ;

    setTransactions((prevTransactions)=>{
          

      prevQuantity=prevTransactions[index].quantity

      if(prevTransactions[index].type=='ENTRY')
      updateStock(updatedTransaction.product,prevQuantity*(-1))

      else
      updateStock(updatedTransaction.product,prevQuantity)


      if(updatedTransaction.type=='ENTRY')
     updateStock(updatedTransaction.product,newQuantity)
      
      else
      updateStock(updatedTransaction.product,newQuantity*(-1))


      const updatedTransactions = [...prevTransactions]; // Create a copy of the previous transactions array
      updatedTransactions[index] = updatedTransaction; // Update the specific transaction with the new data
      return updatedTransactions; // Return the updated array
    
     
     
    })

  }
}
 

function exportTransactions() {
  
  const worksheet = XLSX.utils.json_to_sheet(transactions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `transactions.xlsx`);

}


    return (
        <MyContext.Provider value={{transactions,filteredTransactions,setFilteredTransactions,
        deleteTransaction,insertTransaction,updateTransaction,exportTransactions}}>
      {children}
        </MyContext.Provider>
      )
    
    
}

export default TransactionsContextProvider

export { MyContext as TransactionsContext } 