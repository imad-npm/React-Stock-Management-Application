import React, { useState } from 'react';
import useTransactionStore from '../transactionStore.js';
import useProductStore from '../../products/productStore.js';

function AddTransaction() {
  const { insertTransaction, transactions } = useTransactionStore();
  const { products } = useProductStore();

  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [type, setType] = useState('EXIT');
  const [alert, setAlert] = useState(false);
  const [availableStock, setAvailableStock] = useState(0);

  function handleSave(e) {
    e.preventDefault();

    const selected = products.find((p) => p.title === product);

    if (!selected) {
      setAlert(true);
      setAvailableStock(0);
      return;
    }

    // Vérif stock uniquement pour EXIT
    if (type === 'EXIT') {
      if (selected.stock <= 0 || quantity > selected.stock) {
        setAlert(true);
        setAvailableStock(selected.stock);
        return;
      }
    }

    setAlert(false);

    const now = new Date();
    const newTransaction = {
      id: Date.now(), // id unique (timestamp)
      product: selected.title,
      quantity: Number(quantity),
      type,
      date: now.toLocaleString(),
    };

    insertTransaction(newTransaction);

    // reset formulaire
    setProduct('');
    setQuantity(1);
    setType('EXIT');
  }

  return (
    <div>
      <form onSubmit={handleSave}>
        <div className="mb-3">
          <label htmlFor="product" className="form-label">Product</label>
          <input
            className="form-control"
            id="product"
            type="text"
            list="products"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            required
          />
          <datalist id="products">
            {products.map((option) => (
              <option key={option.id} value={option.title} />
            ))}
          </datalist>
        </div>

        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Quantity</label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="type" className="form-label">Type</label>
          <select
            className="form-select"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="EXIT">EXIT</option>
            <option value="ENTRY">ENTRY</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Save</button>
      </form>

      {alert && (
        <div className="alert alert-warning alert-dismissible fade show mt-3">
          <strong>Warning!</strong> Not enough stock. Available = {availableStock}
          <button
            type="button"
            onClick={() => setAlert(false)}
            className="btn-close"
          ></button>
        </div>
      )}
    </div>
  );
}

export default AddTransaction;
