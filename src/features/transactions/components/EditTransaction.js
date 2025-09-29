import React, { useState } from 'react';
import useTransactionStore from '../transactionStore.js';
import useProductStore from '../../products/productStore.js';
import Input from '../../../ui/Input';
import Select from '../../../ui/Select';
import Button from '../../../ui/Button';
import FormGroup from '../../../ui/FormGroup';

function EditTransaction({ transaction }) {
  const { updateTransaction } = useTransactionStore();
  const { products } = useProductStore();

  const [form, setForm] = useState({ ...transaction });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSave(e) {
    e.preventDefault();
    updateTransaction(form);
  }

  const productOptions = products.map(p => ({ value: p.title, label: p.title }));
  const typeOptions = [{ value: 'EXIT', label: 'EXIT' }, { value: 'ENTRY', label: 'ENTRY' }];

  return (
    <div>
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

        <div className="col-md-4 mb-3">
          <label htmlFor="date" className="form-label">Date</label>
          <Input
            type="text"
            id="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" variant="primary">Save</Button>
      </form>
    </div>
  );
}

export default EditTransaction;
