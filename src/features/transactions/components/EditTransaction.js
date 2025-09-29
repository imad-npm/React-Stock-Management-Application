import React, { useState } from 'react';
import useTransactionStore from '../transactionStore.js';
import useProductStore from '../../products/productStore.js';

function EditTransaction({ transaction }) {
  const { updateTransaction } = useTransactionStore();
  const { products } = useProductStore();

  // Un seul state pour tous les champs
  const [form, setForm] = useState({ ...transaction });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSave(e) {
    e.preventDefault();
    updateTransaction(form);
  }

  return (
    <div>
      <form onSubmit={handleSave}>
        <div className="mb-3">
          <label htmlFor="product" className="form-label">Product</label>
          <input
            className="form-control"
            id="product"
            name="product"
            value={form.product}
            onChange={handleChange}
            list="products"
          />
          <datalist id="products">
            {products.map((option, index) => (
              <option key={index} value={option.title}>
                {option.title}
              </option>
            ))}
          </datalist>
        </div>

        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Quantity</label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            name="quantity"
            min={1}
            value={form.quantity}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="type" className="form-label">Type</label>
          <select
            className="form-select"
            id="type"
            name="type"
            value={form.type}
            onChange={handleChange}
          >
            <option value="EXIT">EXIT</option>
            <option value="ENTRY">ENTRY</option>
          </select>
        </div>

        <div className="col-md-4 mb-3">
          <label htmlFor="date" className="form-label">Date</label>
          <input
            type="text"
            className="form-control"
            id="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
}

export default EditTransaction;
