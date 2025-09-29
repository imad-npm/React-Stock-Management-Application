import React, { useContext, useEffect, useState } from 'react'
import {ProductsContext} from '../context/ProductsContextProvider.js'
import Modal from './Modal.js';
import SearchProduct from './SearchProduct.js';
import AddProduct from './AddProduct.js';
import Pagination from './Pagination.js';
import Product from './Product.js';
import FilterProduct from './FilterProduct.js';


function Products() {

    const {filteredProducts,setFilteredProducts,products}=useContext(ProductsContext)

 const [showModal, setShowModal] = useState(false);
  const [modalComponent, setModalComponent] = useState();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
const[currentPage,setCurrentPage]= useState(1) ;

  useEffect(() => {
    
  
    setCurrentPage(1)
  }, [filteredProducts])
   
 const itemsPerPage=10 ;
 const totalItems=filteredProducts.length;
 const totalPages=Math.ceil(totalItems/itemsPerPage) ;

var lastItemIndex=currentPage*itemsPerPage ;
var firstItemIndex=lastItemIndex-itemsPerPage ; 


  const openModal = (title,component) => {
    setShowModal(true);
    setModalTitle(title)
    setModalComponent(component);
  };
  

  const closeModal = () => {
    setShowModal(false);
    setModalComponent(null);
    setSelectedProduct(null);
  };




  return (
    <div className='container mt-3'>

      <div className=' d-flex flex-wrap justify-content-between  align-items-center mt-4 mb-5  '> 
        <SearchProduct />
        <button type="button" class="btn  btn-success  "  onClick={()=>openModal('Add Product',<AddProduct />)}> 
          Add Product <i class="fa fa-plus-square  m-1   "></i>
            </button>
            <FilterProduct />

</div>
     
<table class="table custom-table   ">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Image</th>
      <th scope="col">Name</th>
      <th scope="col">Stock</th>
      <th scope="col">Price</th>
      <th scope="col">Category</th>
      <th scope="col">Action</th>

    </tr>
  </thead>
  <tbody>
  
  {
    filteredProducts.slice(firstItemIndex,lastItemIndex)
    .map((product) => <Product product={product}
    openModal={openModal} closeModal={closeModal} />) 
  }
  </tbody>
</table>

<Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />


{/* Render modal conditionally */}
{(showModal &&
    <Modal onClose={closeModal} title={modalTitle} component={modalComponent}/>
      )}
    </div>
  )
}

export default Products