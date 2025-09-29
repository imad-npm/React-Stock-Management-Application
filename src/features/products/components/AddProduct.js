import React, { useState } from 'react';
import useProductStore from '../productStore.js';

function AddProduct() {
  const { insertProduct, products } = useProductStore();

  // Un seul state pour tout le formulaire
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
      id: products[products.length-1].id + 1,
      thumbnail: form.imageUrl,
      title: form.name,
      stock: Number(form.quantity),
      price: Number(form.price),
      category: form.category,
      description: form.description
    };

    insertProduct(newProduct);
  };

  return (
    <div>
      <form onSubmit={handleSave}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Quantity</label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            name="quantity"
            min={0}
            value={form.quantity}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            id="price"
            name="price"
            value={form.price}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image</label>
          <input
            className="form-control"
            type="file"
            id="image"
            onChange={handleImageUpload}
          />
        </div>

        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
}

export default AddProduct;
