import React, { createContext, useEffect, useState } from 'react'


const MyContext=createContext() ;


function ProductsContextProvider({children}) {


const [products, setProducts] = useState([]) ;

useEffect(() => {
  const storedProducts = localStorage.getItem('products');  
  
 
  if (localStorage['products']!='[]' && localStorage['products']) {
      
    const parsedProducts = JSON.parse(storedProducts); 

        setProducts(parsedProducts)
        
  }


  else {
   
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => {
        
        setProducts(data.products);
        localStorage.setItem('products',JSON.stringify( data.products ));
      });
  }
}, []);


const [filteredProducts, setFilteredProducts] = useState([])

useEffect(()=>{
setFilteredProducts(products);
localStorage.setItem('products', JSON.stringify(products));

},[products])


function insertProduct(product) {
  setProducts( [...products, product]);
}

function deleteProduct(id) {
  
  setProducts(
  products.filter(p=>p.id!=id)
  )
}
function updateProduct(updatedProduct){

  const index = products.findIndex((product) => product.id === updatedProduct.id);
  if (index !== -1) {
    // Create a new array with the updated product
    const updatedProducts = [...products];
    updatedProducts[index] = updatedProduct;
    // Update the products state
    setProducts(updatedProducts);
  }
}

function updateStock(product,quantity) {
  
 var id= products.findIndex((p)=>p.title==product)

 if(id!= -1){
setProducts(prevProducts=>{
  prevProducts[id].stock+=quantity*1
  return prevProducts ;
})
}

}
  return (
    <MyContext.Provider value={{products,filteredProducts,
    setFilteredProducts,insertProduct,deleteProduct,
    updateProduct,updateStock}}>
  {children}
    </MyContext.Provider>
  )
}

export default ProductsContextProvider

export { MyContext as ProductsContext } 