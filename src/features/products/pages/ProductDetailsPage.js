import React from 'react';
import { useParams } from 'react-router-dom';
import useProductStore from '../productStore'; // Correct path relative to src/features/products/pages

function ProductDetailsPage() {
  const { id } = useParams();
  const { products } = useProductStore();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 bg-white shadow-md rounded-lg mt-6 text-red-600">Product not found!</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-bold text-text mb-6">Product Details: {product.title}</h2>
      <div className="text-lg">
        <div className="flex items-center mb-4">
          <h3 className="mr-4 font-semibold">Image:</h3>
          <img src={product.thumbnail} alt={product.title} className="w-24 h-24 object-cover rounded-md" />
        </div>
        <div className="flex items-center mb-4">
          <h3 className="mr-4 font-semibold">Brand:</h3>
          <div>{product.brand}</div>
        </div>
        <div className="flex items-center mb-4">
          <h3 className="mr-4 font-semibold">Rating:</h3>
          <div>{product.rating}</div>
        </div>
        <div className="flex mb-4">
          <h3 className="mr-4 font-semibold">Description:</h3>
          <div>{product.description}</div>
        </div>
        <div className="flex items-center mb-4">
          <h3 className="mr-4 font-semibold">Stock:</h3>
          <div>{product.stock}</div>
        </div>
        <div className="flex items-center mb-4">
          <h3 className="mr-4 font-semibold">Price:</h3>
          <div>${product.price}</div>
        </div>
        <div className="flex items-center mb-4">
          <h3 className="mr-4 font-semibold">Category:</h3>
          <div>{product.category}</div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;