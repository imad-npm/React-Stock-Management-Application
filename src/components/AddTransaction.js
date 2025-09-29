import React, { useRef } from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import {  TransactionsContext }  from '../context/TransactionsContextProvider';
import {  ProductsContext } from '../context/ProductsContextProvider';


function AddTransaction() {


    const [product, setProduct] = useState();
    const [quantity, setQuantity] = useState();
    const [date, setDate] = useState();
    const [type, setType] = useState('EXIT');
    const [alert, setAlert] = useState(false)
    const [stock, setStock] = useState()
    const {insertTransaction,transactions}=useContext(TransactionsContext)
const {products,updateStock}=useContext(ProductsContext)


  
    function handleSave(e) {
        e.preventDefault(); 

        if(type=="EXIT"){
          var stock=products.find((p)=>p.title==product).stock
          setStock(stock)
           if(stock<=0 || quantity>stock){
            setAlert(true)     
                 console.log('enter');

            return
          }
          else
          setAlert(false)
          
        }
        

         const now = new Date();
        const currentDate = now.toLocaleDateString(); // Get the current date
    const currentTime = now.toLocaleTimeString(); // Get the current time
    
    
        const newTransaction = {
          id: transactions.length+1,
         product,
         quantity,
         type,
         date:currentDate+" "+currentTime
        }
        insertTransaction(newTransaction)

      
      }

  return (
    <div>
         <form onSubmit={handleSave}>
    <div className="mb-3">
      <label htmlFor="name" className="form-label">Product</label>
      <input className='form-control' onChange={(e)=> setProduct(e.target.value)
} id='name'type='text' list='products' />
      <datalist id='products'   >
        {products.map((option, index) => (
          <option key={index} value={option.title}>
           {option.title}
          </option>
        ))}
     </datalist>
    </div>
    <div className="mb-3">
      <label htmlFor="quantity" className="form-label">Quantity</label>
      <input type="number" className="form-control"  id="quantity" min={1}  onChange={(e) => setQuantity(e.target.value)} />
    </div>
    <div className="mb-3">
      <label htmlFor="type" className="form-label">Type</label>
      <select  className="form-select" id="type" 
      onChange={(e)=>setType(e.target.value)
} >
        <option value='EXIT'>EXIT</option>
        <option value='ENTRY'>ENTRY</option>
        </select>
    </div>
    <button type="submit" className="btn btn-primary">Save</button>
 
    </form>

{
  alert && 
  <div class="alert alert-warning alert-dismissible fade show">
      <strong>Warning!</strong> Not enough stock. stock={stock}
      <button type="button" onClick={()=>setAlert(false)} class="btn-close" ></button>
  </div>
}

    </div> 
  )
}

export default AddTransaction