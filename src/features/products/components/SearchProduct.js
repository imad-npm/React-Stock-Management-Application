
import React from 'react';

function SearchProduct({ searchKey, setSearchKey }) {
    return (
        <div className='col-6'>
            <input 
                className="form-control me-1" 
                type="search" 
                placeholder="Search by name..." 
                aria-label="Search" 
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)} 
            />
        </div>
    );
}

export default SearchProduct;
