import React, { useState } from 'react';
import useTransactionStore from '../transactionStore.js'; // Correct path relative to src/features/transactions
import useProductStore from '../../products/productStore.js'; // Correct path relative to src/features/transactions/pages
import Input from '../../../ui/Input'; // Correct path relative to src/features/transactions/pages
import Select from '../../../ui/Select'; // Correct path relative to src/features/transactions/pages
import Button from '../../../ui/Button'; // Correct path relative to src/features/transactions/pages
import FormGroup from '../../../ui/FormGroup'; // Correct path relative to src/features/transactions/pages
import Alert from '../../../ui/Alert'; // Correct path relative to src/features/transactions/pages
import { useNavigate } from 'react-router-dom';

function AddTransactionPage() {
  const { insertTransaction } = useTransactionStore();
  const { products } = useProductStore();
  const navigate = useNavigate();

  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [type, setType] = useState('EXIT');
  const [alertMessage, setAlertMessage] = useState('');
  const [availableStock, setAvailableStock] = useState(0);

  function handleSave(e) {
    e.preventDefault();

    const selected = products.find((p) => p.title === product);

    if (!selected) {
      setAlertMessage('Product not found.');
      setAvailableStock(0);
      return;
    }

    if (type === 'EXIT') {
      if (selected.stock <= 0 || quantity > selected.stock) {
        setAlertMessage(`Not enough stock. Available = ${selected.stock}`);
        setAvailableStock(selected.stock);
        return;
      }
    }

    setAlertMessage('');

    const now = new Date();
    const newTransaction = {
      id: Date.now(),
      product: selected.title,
      quantity: Number(quantity),
      type,
      date: now.toLocaleString(),
    };

    insertTransaction(newTransaction);
    navigate('/transactions');

    setProduct('');
    setQuantity(1);
    setType('EXIT');
  }

  const productOptions = products.map(p => ({ value: p.title, label: p.title }));
  const typeOptions = [{ value: 'EXIT', label: 'EXIT' }, { value: 'ENTRY', label: 'ENTRY' }];

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-bold text-text mb-6">Add New Transaction</h2>
      <form onSubmit={handleSave}>
        <FormGroup label="Product" htmlFor="product">
          <Input
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
        </FormGroup>

        <FormGroup label="Quantity" htmlFor="quantity">
          <Input
            type="number"
            id="quantity"
            name="quantity"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          />
        </FormGroup>

        <FormGroup label="Type" htmlFor="type">
          <Select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            options={typeOptions}
          />
        </FormGroup>

        <Button type="submit" variant="primary">Save Transaction</Button>
      </form>

      <Alert message={alertMessage} variant="warning" onClose={() => setAlertMessage('')} />
    </div>
  );
}

export default AddTransactionPage;