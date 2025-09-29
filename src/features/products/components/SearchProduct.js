import React from 'react';
import Input from '../../../ui/Input';

function SearchProduct({ searchKey, setSearchKey }) {
    return (
        <div className='w-full md:w-1/2'>
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