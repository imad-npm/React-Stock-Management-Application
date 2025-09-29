import React from 'react';
import Input from '../../../ui/Input';

function SearchTransaction({ searchKey, setSearchKey }) {
    return (
        <div className='w-full sm:w-1/2'>
            <Input 
                type="search" 
                placeholder="Search by product..." 
                aria-label="Search" 
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)} 
            />
        </div>
    );
}

export default SearchTransaction;