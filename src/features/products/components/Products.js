import React, { useEffect, useState, useMemo } from 'react';
import useProductStore from '../productStore.js';
import Modal from '../../../ui/Modal.js';
import SearchProduct from './SearchProduct.js';
import AddProduct from './AddProduct.js';
import Pagination from '../../../ui/Pagination.js';
import FilterProduct from './FilterProduct.js';
import Button from '../../../ui/Button';
import Table from '../../../ui/Table.js';
import EditProduct from './EditProduct.js';
import ProductDetails from './ProductDetails.js';

function Products() {
    const { products, deleteProduct } = useProductStore();

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

    const columns = [
        { header: '#', accessor: 'id' },
        {
            header: 'Image', accessor: 'thumbnail', Cell: (row) => (
                <img src={row.thumbnail} alt={row.title} width="50" />
            )
        },
        { header: 'Name', accessor: 'title' },
        { header: 'Stock', accessor: 'stock' },
        { header: 'Price', accessor: 'price' },
        { header: 'Category', accessor: 'category' },
        {
            header: 'Action', accessor: 'action', Cell: (row) => (
                <div className='flex space-x-2'>
                    <Button variant="primary" onClick={() => openModal('Product Details', <ProductDetails product={row} />)}>
                        <i className="fa fa-eye"></i>
                    </Button>
                    <Button variant="warning" onClick={() => openModal('Edit Product', <EditProduct product={row} closeModal={closeModal} />)}>
                        <i className="fa fa-edit"></i>
                    </Button>
                    <Button variant="danger" onClick={() => deleteProduct(row.id)}>
                        <i className="fa fa-trash"></i>
                    </Button>
                </div>
            )
        }
    ];

    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-3'>
            <div className='flex flex-wrap items-center justify-between mt-4 mb-5'>
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

            <Table
                data={filteredProducts.slice(firstItemIndex, lastItemIndex)}
                columns={columns}
            />

            <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />

            {(showModal &&
                <Modal onClose={closeModal} title={modalTitle} component={modalComponent} />
            )}
        </div>
    )
}

export default Products;