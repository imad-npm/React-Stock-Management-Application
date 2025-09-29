import React, { useState } from 'react';
import useProductStore from '../productStore.js';

function EditProduct({ product }) {
  const { updateProduct } = useProductStore();
  const [formData, setFormData] = useState({
    id: product.id,
    title: product.title || '',
    thumbnail: product.thumbnail || '',
    stock: product.stock || 0,
    price: product.price || 0,
    category: product.category || '',
    description: product.description || '',
  });

  // Gestion des inputs texte / nombre
  const handleChange = (e) => {
    const { id, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'number' ? Number(value) : value,
    }));
  };

  // Gestion de l'image
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
  };

  return (
    <form onSubmit={handleSave}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="thumbnail" className="form-label">Image</label>
        <input
          className="form-control"
          type="file"
          id="thumbnail"
          onChange={handleImageUpload}
        />
        {formData.thumbnail && (
          <img
            src={formData.thumbnail}
            alt="Preview"
            className="mt-2"
            style={{ maxHeight: '120px' }}
          />
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="stock" className="form-label">Stock</label>
        <input
          type="number"
          className="form-control"
          id="stock"
          min={0}
          value={formData.stock}
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
          value={formData.price}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="form-label">Category</label>
        <input
          type="text"
          className="form-control"
          id="category"
          value={formData.category}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          className="form-control"
          id="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  );
}

export default EditProduct;
