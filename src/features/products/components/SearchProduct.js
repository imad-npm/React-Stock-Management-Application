import React from 'react';
import Input from '../../../ui/Input';

function SearchProduct({ searchKey, setSearchKey }) {
    return (
        <div className='col-6'>
            <Input 
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