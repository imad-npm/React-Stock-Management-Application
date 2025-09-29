import React, { useState } from 'react';
import useProductStore from '../productStore.js';
import Input from '../../../ui/Input';
import Button from '../../../ui/Button';
import FormGroup from '../../../ui/FormGroup';

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
  };

  return (
    <form onSubmit={handleSave}>
      <FormGroup label="Name" htmlFor="title">
        <Input
          type="text"
          id="title"
          value={formData.title}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup label="Image" htmlFor="thumbnail">
        <Input
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

      <FormGroup label="Description" htmlFor="description">
        <textarea
          className="form-control"
          id="description"
          value={formData.description}
          onChange={handleChange}
        />
      </FormGroup>

      <Button type="submit" variant="primary">Save</Button>
    </form>
  );
}

export default EditProduct;
