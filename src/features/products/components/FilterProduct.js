import React from 'react';
import Input from '../../../ui/Input';
import Select from '../../../ui/Select';

function FilterProduct(props) {
    const {
        products,
        minStock, setMinStock,
        maxStock, setMaxStock,
        category, setCategory,
        minPrice, setMinPrice,
        maxPrice, setMaxPrice
    } = props;

    const categories = [...new Set(products.map(p => p.category))];
    const categoryOptions = categories.map(cat => ({ value: cat, label: cat }));

    return (
        <div className="flex flex-wrap -mx-3 mt-3 ">
            <div className='w-full md:w-1/2 px-3 mb-3 flex justify-between items-end'>
                <div className=" ">
                    <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor="minStock">Min Stock:</label>
                    <Input type="number" id="minStock" value={minStock} onChange={(e) => setMinStock(e.target.value)}
                        name="minStock" placeholder="Min Stock" />
                </div>
                <div className="">
                    <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor="maxStock">Max Stock:</label>
                    <Input type="number" id="maxStock" value={maxStock} onChange={(e) => setMaxStock(e.target.value)}
                        name="maxStock" placeholder="Max Stock" />
                </div>
            </div>
            <div className="w-full md:w-1/4 px-3 mb-3">
                <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor="category">Category:</label>
                <Select id="category" value={category} onChange={(e) => setCategory(e.target.value)}
                    name="category" defaultOptionLabel="ALL" options={categoryOptions}
                />
            </div>
            <div className='w-full md:w-1/2 px-3 mb-3 flex justify-between items-end'>
                <div className=" mb-3">
                    <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor="minPrice">Min Price:</label>
                    <Input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)}
                        id="minPrice" name="minPrice" placeholder="Min Price" />
                </div>
                <div className=" mb-3">
                    <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor="maxPrice">Max Price:</label>
                    <Input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}
                        id="maxPrice" name="maxPrice" placeholder="Max Price" />
                </div>
            </div>
        </div>
    );
}

export default FilterProduct;