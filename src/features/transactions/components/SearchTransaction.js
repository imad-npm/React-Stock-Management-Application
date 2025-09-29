
import React from 'react';

function SearchTransaction({ searchKey, setSearchKey }) {
    return (
        <div className='col-sm-6'>
            <input 
                className="form-control" 
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
