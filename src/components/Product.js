import React, { useContext } from 'react'

import ProductDetails from './ProductDetails.js';
import EditProduct from './EditProduct.js';
import { ProductsContext } from '../context/ProductsContextProvider.js';



function Product({product,openModal,closeModal}) {


const {deleteProduct}=useContext(ProductsContext)


  return (
    <tr>
        <td>{product.id}</td>
        <td className='col-1 ' ><img className=' w-100 ' src={product.thumbnail}/></td>

    <td>{product.title}</td>
    <td className={product.stock <10 ? 'text-danger' : ''}>{product.stock}</td>
    <td>{product.price}</td>
    <td>{product.category}</td>

        <td className='' > 
          <i class="fa fa-info-circle text-secondary "
          onClick={()=>{openModal("Product Details",<ProductDetails details={{
            brand:product.brand,
            description:product.description,
            rating:product.rating

          } }/>);}} aria-hidden="true"></i>
        <i class="fa fa-edit text-success " onClick={()=>openModal("Edit Product",<EditProduct product={product}/>)}></i>

        <i class="fa fa-trash text-danger" aria-hidden="true" onClick={()=>deleteProduct(product.id)}></i>
        </td>
      </tr>
  )
}

export default Product