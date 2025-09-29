import React, { useContext, useEffect, useState } from 'react'
import { ProductsContext } from '../context/ProductsContextProvider'



function FilterProduct() {

    const [minStock, setMinStock] = useState(null);
    const [maxStock, setMaxStock] = useState(null);
    const [category, setCategory] = useState("ALL");
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);

     const {products,setFilteredProducts}=useContext(ProductsContext)


     var categories = [];
     products.forEach(element => {
       if (!categories.includes(element.category)) {
         categories.push(element.category);
       }
     });
     
     useEffect(() => {
   
          const filteredProducts = products.filter((p) => {
            const isStockInRange =
              (minStock === null || p.stock >= minStock) &&
              (maxStock === null || p.stock <= maxStock);
          
            const isCategoryMatch = p.category === category || category === 'ALL';
          
            const isPriceInRange =
              (minPrice === null || p.price >= minPrice) &&
              (maxPrice === null || p.price <= maxPrice);
          
            return isStockInRange && isCategoryMatch && isPriceInRange;
          });
          
          
    
        setFilteredProducts(filteredProducts);
      }, [minStock, maxStock, category, minPrice, maxPrice]);
    

  return (
    <div class="row mt-3 ">
     <div className='d-flex mb-3 justify-content-between me-5 col-md-6'>
                <div class=" ">
                    <label className='mb-1' for="minStock">Minimum Stock:</label>
                    <input type="number" class="form-control" id="minStock" onChange={(e)=>setMinStock(e.target.value)}
                     name="minStock" placeholder="Minimum Stock"/>
                </div>
                <div class="">
                    <label className='mb-1' for="maxStock">Maximum Stock:</label>
                    <input type="number" class="form-control" id="maxStock" onChange={(e)=>setMaxStock(e.target.value)}
                     name="maxStock" placeholder="Maximum Stock"/>
                </div>
            
          </div>
                <div class="col-6 col-md-3 mb-3 mx-sm-5">
                    <label className='mb-1' for="category">Category:</label>
                    <select class="form-select" id="category" onChange={(e)=>setCategory(e.target.value)}
                     name="category">
                        <option value='ALL'>ALL </option>
                        { categories.map(category =>
                        <option value={category}>{category}</option>
                        )
                        }
                        </select>
              
            </div>
           <div className='d-flex mb-3 justify-content-between me-5 col-md-6'>
                <div class=" mb-3">
                    <label className='mb-1' for="minPrice">Minimum Price:</label>
                    <input type="number" class="form-control" onChange={(e)=>setMinPrice(e.target.value)}
                     id="minPrice" name="minPrice" placeholder="Minimum Price"/>
                </div>
                <div class=" mb-3">
                    <label className='mb-1' for="maxPrice">Maximum Price:</label>
                    <input type="number" class="form-control" onChange={(e)=>setMaxPrice(e.target.value)}
                    id="maxPrice" name="maxPrice" placeholder="Maximum Price"/>
                </div>
            </div>
            </div>
  )
}

export default FilterProduct