import React, { useState } from 'react';
import useProductStore from '../productStore.js'; // Correct path relative to src/features/products
import Input from '../../../ui/Input'; // Correct path relative to src/features/products/pages
import Button from '../../../ui/Button'; // Correct path relative to src/features/products/pages
import FormGroup from '../../../ui/FormGroup'; // Correct path relative to src/features/products/pages
import { useNavigate } from 'react-router-dom';

function AddProductPage() {
  const { insertProduct, products } = useProductStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    quantity: 0,
    price: 0,
    category: "",
    description: "",
    imageUrl: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, imageUrl: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();

    const newProduct = {
      id: products.length > 0 ? products[products.length-1].id + 1 : 1,
      thumbnail: form.imageUrl,
      title: form.name,
      stock: Number(form.quantity),
      price: Number(form.price),
      category: form.category,
      description: form.description
    };

    insertProduct(newProduct);
    navigate('/products');
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-bold text-text mb-6">Add New Product</h2>
      <form onSubmit={handleSave}>
        <FormGroup label="Name" htmlFor="name">
          <Input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup label="Quantity" htmlFor="quantity">
          <Input
            type="number"
            id="quantity"
            name="quantity"
            min={0}
            value={form.quantity}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup label="Price" htmlFor="price">
          <Input
            type="number"
            step="0.01"
            id="price"
            name="price"
            value={form.price}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup label="Category" htmlFor="category">
          <Input
            type="text"
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup label="Description" htmlFor="description">
          <textarea
            className="flex h-10 w-full rounded-md border border-light-gray bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition duration-150 ease-in-out"
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup label="Image" htmlFor="image">
          <Input
            type="file"
            id="image"
            onChange={handleImageUpload}
          />
        </FormGroup>

        <Button type="submit" variant="primary">Save Product</Button>
      </form>
    </div>
  );
}

export default AddProductPage;