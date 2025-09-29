import React from 'react'



function ProductDetails({ details }) {
    return (
      <div style={{ fontSize: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ marginRight: '1rem' }}>Brand:</h3>
          <div>{details.brand}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ marginRight: '1rem' }}>Rating:</h3>
          <div>{details.rating}</div>
        </div>
        <div style={{ display: 'flex', marginBottom: '1rem' }}>
          <h3 style={{ marginRight: '1rem' }}>Description:</h3>
          <div>{details.description}</div>
        </div>
      </div>
    );
  }
  
  export default ProductDetails;
  