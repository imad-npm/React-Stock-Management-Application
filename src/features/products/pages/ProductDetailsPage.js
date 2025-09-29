import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import useProductStore from '../productStore';
import Button from '../../../ui/Button'; // Import Button
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'; // Import icons

function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const { products, deleteProduct } = useProductStore();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 bg-white shadow-md rounded-lg mt-6 text-red-600">
        Product not found!
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${product.title}?`)) {
      deleteProduct(product.id);
      navigate('/products'); // Redirect to products list after deletion
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-white shadow-md rounded-lg mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-text">Product Details: {product.title}</h2>
        <div className="flex space-x-2">
          <Button variant="warning" onClick={() => navigate(`/products/edit/${product.id}`)}>
            <PencilSquareIcon className="h-5 w-5 mr-1" /> Edit
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            <TrashIcon className="h-5 w-5 mr-1" /> Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="md:col-span-1 flex justify-center items-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full max-w-sm h-auto object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Details Section */}
        <div className="md:col-span-1 space-y-4">
          <div className="bg-background p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold text-secondary mb-2">General Information</h3>
            <p className="text-text"><span className="font-medium">Brand:</span> {product.brand}</p>
            <p className="text-text"><span className="font-medium">Category:</span> {product.category}</p>
            <p className="text-text"><span className="font-medium">Rating:</span> {product.rating}</p>
          </div>

          <div className="bg-background p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold text-secondary mb-2">Pricing & Stock</h3>
            <p className="text-text"><span className="font-medium">Price:</span> ${product.price}</p>
            <p className="text-text"><span className="font-medium">Stock:</span> {product.stock}</p>
          </div>

          <div className="bg-background p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold text-secondary mb-2">Description</h3>
            <p className="text-text">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;