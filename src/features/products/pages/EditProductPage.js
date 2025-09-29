import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useProductStore from '../productStore.js';
import Input from '../../../ui/Input';
import Button from '../../../ui/Button';
import FormGroup from '../../../ui/FormGroup';
import Textarea from '../../../ui/Textarea'; // Import Textarea

function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProduct } = useProductStore();

  const existingProduct = products.find(p => p.id === parseInt(id));

  const [formData, setFormData] = useState(existingProduct ? {
    id: existingProduct.id,
    title: existingProduct.title || '',
    thumbnail: existingProduct.thumbnail || '',
    stock: existingProduct.stock || 0,
    price: existingProduct.price || 0,
    category: existingProduct.category || '',
    description: existingProduct.description || '',
  } : {
    id: null,
    title: '',
    thumbnail: '',
    stock: 0,
    price: 0,
    category: '',
    description: '',
  });

  useEffect(() => {
    if (!existingProduct) {
      navigate('/products');
    }
  }, [existingProduct, navigate]);


  const handleChange = (e) => {
    const { id, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, thumbnail: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProduct(formData);
    navigate('/products');
  };

  if (!existingProduct) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-bold text-text mb-6">Edit Product: {formData.title}</h2>
      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormGroup label="Name" htmlFor="title">
          <Input
            type="text"
            id="title"
            value={formData.title}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup label="Stock" htmlFor="stock">
          <Input
            type="number"
            id="stock"
            min={0}
            value={formData.stock}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup label="Price" htmlFor="price">
          <Input
            type="number"
            step="0.01"
            id="price"
            value={formData.price}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup label="Category" htmlFor="category">
          <Input
            type="text"
            id="category"
            value={formData.category}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup label="Image" htmlFor="thumbnail" className="md:col-span-2">
          <Input
            type="file"
            id="thumbnail"
            onChange={handleImageUpload}
          />
          {formData.thumbnail && (
            <img
              src={formData.thumbnail}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded-md shadow-sm"
            />
          )}
        </FormGroup>

        <FormGroup label="Description" htmlFor="description" className="md:col-span-2">
          <Textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
          />
        </FormGroup>

        <div className="md:col-span-2 flex justify-end">
          <Button type="submit" variant="primary">Save Changes</Button>
        </div>
      </form>
    </div>
  );
}

export default EditProductPage;