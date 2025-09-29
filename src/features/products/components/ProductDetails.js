import React from 'react'



function ProductDetails({ details }) {
    return (
      <div className="text-lg">
        <div className="flex items-center mb-4">
          <h3 className="mr-4">Brand:</h3>
          <div>{details.brand}</div>
        </div>
        <div className="flex items-center mb-4">
          <h3 className="mr-4">Rating:</h3>
          <div>{details.rating}</div>
        </div>
        <div className="flex mb-4">
          <h3 className="mr-4">Description:</h3>
          <div>{details.description}</div>
        </div>
      </div>
    );
  }
  
  export default ProductDetails;
  