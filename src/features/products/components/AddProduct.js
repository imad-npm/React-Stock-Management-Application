import React, { useState } from 'react';
import useProductStore from '../productStore.js';

function AddProduct() {
    const { insertProduct, products } = useProductStore();
    const [name, setName] = useState();
    const [imageUrl,setImageUrl]=useState()
    const [quantity, setQuantity] = useState();
    const [price, setPrice] = useState();
    const [category, setCategory] = useState();
    const [description, setDescription] = useState();


const handleImageUpload = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    const imageData = reader.result;
    setImageUrl(imageData); // Update the image URL in the component's state
  };

  reader.readAsDataURL(file);
};


    function handleSave(e) {
      e.preventDefault();
      const newProduct = {
        id: products.length+1,
        thumbnail:imageUrl,
        title:name,
        stock:quantity,
        price,
        category,
        description
      };

      insertProduct(newProduct)
    }

  return (
    <div> 
        <form onSubmit={handleSave}>
    <div className="mb-3">
      <label htmlFor="name" className="form-label">Name</label>
      <input type="text" className="form-control" id="name" onChange={(e) => setName(e.target.value)} />
    </div>
    <div className="mb-3">
      <label htmlFor="quantity" className="form-label">Quantity</label>
      <input type="number" className="form-control" id="quantity" min={0}  onChange={(e) => setQuantity(e.target.value)} />
    </div>
    <div className="mb-3">
      <label htmlFor="price" className="form-label">Price</label>
      <input type="number" step="0.01" className="form-control" id="price"  onChange={(e) => setPrice(e.target.value)} />
    </div>
    <div className="mb-3">
      <label htmlFor="category" className="form-label">Category</label>
      <input type="text" className="form-control" id="category" onChange={(e) => setCategory(e.target.value)} />
    </div>
    <div className="mb-3">
      <label htmlFor="description" className="form-label">Description</label>
      <textarea className="form-control" id="description"  onChange={(e) => setDescription(e.target.value)} />
    </div>
    <div className="mb-3">
      <label htmlFor="image" className="form-label">Image</label>
      <input className="form-control"  type="file" id='image' onChange={handleImageUpload} />

    </div>
    <button type="submit" className="btn btn-primary">Save</button>
  </form>
  
  </div>
  )
}

export default AddProduct