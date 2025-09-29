import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useTransactionStore from '../transactionStore.js';
import useProductStore from '../../products/productStore.js';
import Input from '../../../ui/Input';
import Select from '../../../ui/Select';
import Button from '../../../ui/Button';
import FormGroup from '../../../ui/FormGroup';

function EditTransactionPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { transactions, updateTransaction } = useTransactionStore();
  const { products } = useProductStore();

  const existingTransaction = transactions.find(t => t.id === parseInt(id));

  const [form, setForm] = useState(existingTransaction ? { ...existingTransaction } : {
    id: null,
    product: '',
    quantity: 0,
    type: 'EXIT',
    date: '',
  });

  useEffect(() => {
    if (!existingTransaction) {
      navigate('/transactions');
    }
  }, [existingTransaction, navigate]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSave(e) {
    e.preventDefault();
    updateTransaction(form);
    navigate('/transactions');
  }

  const productOptions = products.map(p => ({ value: p.title, label: p.title }));
  const typeOptions = [{ value: 'EXIT', label: 'EXIT' }, { value: 'ENTRY', label: 'ENTRY' }];

  if (!existingTransaction) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-bold text-text mb-6">Edit Transaction: {form.product}</h2>
      <form onSubmit={handleSave}>
        <FormGroup label="Product" htmlFor="product">
          <Input
            id="product"
            name="product"
            value={form.product}
            onChange={handleChange}
            list="products"
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
            value={form.quantity}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup label="Type" htmlFor="type">
          <Select
            id="type"
            name="type"
            value={form.type}
            onChange={handleChange}
            options={typeOptions}
          />
        </FormGroup>

        <FormGroup label="Date" htmlFor="date">
          <Input
            type="text"
            id="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
        </FormGroup>

        <Button type="submit" variant="primary">Save Changes</Button>
      </form>
    </div>
  );
}

export default EditTransactionPage;