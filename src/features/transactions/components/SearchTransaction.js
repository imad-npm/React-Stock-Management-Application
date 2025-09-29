import React from 'react';
import Input from '../../../ui/Input';

function SearchTransaction({ searchKey, setSearchKey }) {
    return (
        <div className='col-sm-6'>
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