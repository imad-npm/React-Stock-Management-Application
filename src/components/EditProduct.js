import React, { useState } from 'react'
import { useContext } from 'react';
import { ProductsContext } from '../context/ProductsContextProvider';

function EditProduct({product}) {

    const [title, setTitle] = useState(product.title);
    const [thumbnail,setThumbnail]=useState("")
    const [stock, setStock] = useState(product.stock) ;
    const [price, setPrice] = useState(product.price);
    const [category, setCategory] = useState(product.category);
    const [description, setDescription] = useState(product.description);
    const {updateProduct}=useContext(ProductsContext)

    const handleSave = (e) => {
        e.preventDefault();
        console.log(product.thumbnail);
        const updatedProduct = {
          id: product.id,
          title,
          thumbnail,
          stock,
          price,
          category,
          description,
        };
    updateProduct(updatedProduct)
      };

      const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
      
        reader.onloadend = () => {
          const imageData = reader.result;
          setThumbnail(imageData); // Update the image URL in the component's state
        };
      
        reader.readAsDataURL(file);
      };



  return (
    <form onSubmit={handleSave}>
    <div className="mb-3">
      <label htmlFor="name" className="form-label">Name</label>
      <input type="text" className="form-control" id="name" value={title} onChange={(e) => setTitle(e.target.value)} />
    </div>
    <div className="mb-3">
      <label htmlFor="image" className="form-label">Image</label>
      <input className="form-control"   type="file" id='image' onChange={handleImageUpload} />

    </div>
    <div className="mb-3">
      <label htmlFor="quantity" className="form-label">Stock</label>
      <input type="number" className="form-control" id="quantity" min={0} value={stock} onChange={(e) => setStock(e.target.value)} />
    </div>
    <div className="mb-3">
      <label htmlFor="price" className="form-label">Price</label>
      <input type="number" step="0.01" className="form-control" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
    </div>
    <div className="mb-3">
      <label htmlFor="category" className="form-label">Category</label>
      <input type="text" className="form-control" id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
    </div>
    <div className="mb-3">
      <label htmlFor="description" className="form-label">Description</label>
      <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
    </div>
    <button type="submit" className="btn btn-primary">Save</button>
  </form>
  )
}

export default EditProduct