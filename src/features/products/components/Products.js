import React, { useEffect, useState, useMemo } from 'react';
import useProductStore from '../productStore.js';
import Modal from '../../../ui/Modal.js';
import SearchProduct from './SearchProduct.js';
import AddProduct from './AddProduct.js';
import Pagination from '../../../ui/Pagination.js';
import Product from './Product.js';
import FilterProduct from './FilterProduct.js';
import Button from '../../../ui/Button';

function Products() {
    const { products } = useProductStore();

    // State for filters is lifted to this parent component
    const [searchKey, setSearchKey] = useState('');
    const [minStock, setMinStock] = useState('');
    const [maxStock, setMaxStock] = useState('');
    const [category, setCategory] = useState('ALL');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            return (
                (searchKey === '' || p.title.toLowerCase().includes(searchKey.toLowerCase())) &&
                (minStock === '' || p.stock >= Number(minStock)) &&
                (maxStock === '' || p.stock <= Number(maxStock)) &&
                (category === 'ALL' || p.category === category) &&
                (minPrice === '' || p.price >= Number(minPrice)) &&
                (maxPrice === '' || p.price <= Number(maxPrice))
            );
        });
    }, [products, searchKey, minStock, maxStock, category, minPrice, maxPrice]);

    const [showModal, setShowModal] = useState(false);
    const [modalComponent, setModalComponent] = useState();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalTitle, setModalTitle] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [filteredProducts]);

    const itemsPerPage = 10;
    const totalItems = filteredProducts.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    var lastItemIndex = currentPage * itemsPerPage;
    var firstItemIndex = lastItemIndex - itemsPerPage;

    const openModal = (title, component) => {
        setShowModal(true);
        setModalTitle(title);
        setModalComponent(component);
    };

    const closeModal = () => {
        setShowModal(false);
        setModalComponent(null);
        setSelectedProduct(null);
    };

    return (
        <div className='container mt-3'>
            <div className=' d-flex flex-wrap justify-content-between  align-items-center mt-4 mb-5  '>
                <SearchProduct searchKey={searchKey} setSearchKey={setSearchKey} />
                <Button variant="success" onClick={() => openModal('Add Product', <AddProduct />)}> 
                    Add Product <i className="fa fa-plus-square  m-1   "></i>
                </Button>
                <FilterProduct 
                    products={products}
                    minStock={minStock} setMinStock={setMinStock}
                    maxStock={maxStock} setMaxStock={setMaxStock}
                    category={category} setCategory={setCategory}
                    minPrice={minPrice} setMinPrice={setMinPrice}
                    maxPrice={maxPrice} setMaxPrice={setMaxPrice}
                />
            </div>

            <table className="table custom-table   ">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Price</th>
                        <th scope="col">Category</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredProducts.slice(firstItemIndex, lastItemIndex)
                            .map((product) => <Product key={product.id} product={product}
                                openModal={openModal} closeModal={closeModal} />)
                    }
                </tbody>
            </table>

            <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />

            {(showModal &&
                <Modal onClose={closeModal} title={modalTitle} component={modalComponent} />
            )}
        </div>
    )
}

export default Products;