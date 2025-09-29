import React, { useState } from 'react';
import useTransactionStore from '../transactionStore.js';
import useProductStore from '../../products/productStore.js';

function EditTransaction({ transaction }) {
    const { updateTransaction } = useTransactionStore();
    const { products } = useProductStore();

    // Local state for form fields, initialized from the transaction prop
    const [id, setId] = useState(transaction.id);
    const [product, setProduct] = useState(transaction.product);
    const [quantity, setQuantity] = useState(transaction.quantity);
    const [date, setDate] = useState(transaction.date);
    const [type, setType] = useState(transaction.type);


function handleSave(e) {
    e.preventDefault(); 
    

const updatedTransaction={
id,
product,
quantity,
date,
type
}

updateTransaction(updatedTransaction)

}



  return (
    

<div>
         <form onSubmit={handleSave} >
    <div className="mb-3">
      <label htmlFor="name" className="form-label">Product</label>
      <input className='form-control' value={product} onChange={(e)=> setProduct(e.target.value)
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
      <input type="number" className="form-control" 
       value={quantity} id="quantity" min={1}
         onChange={(e) => setQuantity(e.target.value)} />
    </div>
    <div className="mb-3">
      <label htmlFor="type" className="form-label">Type</label>
      <select  className="form-select" id="type" value={type}
      onChange={(e)=>setType(e.target.value)
} >
        <option value='EXIT'>EXIT</option>
        <option value='ENTRY'>ENTRY</option>
        </select>
    </div>
    
    <div className="col-md-4 mb-3">
      <label for="Date" className="form-label"> Date</label>
      <input type="text" className="form-control" value={date}
      onChange={(e)=>setDate(e.target.value)} id="Date"/>
    </div>
    <button type="submit" className="btn btn-primary">Save</button>
 
    </form>

    </div>
  )
}

export default EditTransaction