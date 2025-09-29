import React, { useContext } from 'react'
import { useActionData } from 'react-router-dom'
import { ProductsContext } from '../context/ProductsContextProvider'

function SearchProduct() {

const {products,filteredProducts,setFilteredProducts}=useContext(ProductsContext) ;

function handleSearch(e) {
    
   
    var search=e.target.value ;
     setFilteredProducts(products.filter((p)=>p.title.toLowerCase().includes(search)  ) )

     
}
  return (
    <div className='col-6'>
<input class="form-control  me-1" type="search" placeholder="Search" 
aria-label="Search" onChange={handleSearch} />

    </div>
  )
}

export default SearchProduct