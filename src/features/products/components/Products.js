import React, { useEffect, useState, useMemo } from 'react';
import useProductStore from '../productStore.js';
import SearchProduct from './SearchProduct.js';
import Pagination from '../../../ui/Pagination.js';
import FilterProduct from './FilterProduct.js';
import Button from '../../../ui/Button';
import Table from '../../../ui/Table.js';
import EditProduct from './EditProduct.js';
import ProductDetails from './ProductDetails.js';
import { EyeIcon, PencilSquareIcon, TrashIcon, PlusIcon, FunnelIcon } from '@heroicons/react/24/outline'; // Import FunnelIcon
import Dropdown from '../../../ui/Dropdown.js'; // Import Dropdown
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Products() {
    const { products, deleteProduct } = useProductStore();
    const navigate = useNavigate(); // Initialize useNavigate

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

    // Removed modal states and functions
    // const [showModal, setShowModal] = useState(false);
    // const [modalComponent, setModalComponent] = useState();
    // const [selectedProduct, setSelectedProduct] = useState(null);
    // const [modalTitle, setModalTitle] = useState('');

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [filteredProducts]);

    const itemsPerPage = 10;
    const totalItems = filteredProducts.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    var lastItemIndex = currentPage * itemsPerPage;
    var firstItemIndex = lastItemIndex - itemsPerPage;

    // openModal and closeModal are no longer needed here
    // const openModal = (title, component) => {
    //     setShowModal(true);
    //     setModalTitle(title);
    //     setModalComponent(component);
    // };

    // const closeModal = () => {
    //     setShowModal(false);
    //     setModalComponent(null);
    //     setSelectedProduct(null);
    // };

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
                        <EyeIcon className="h-5 w-5" />
                    </Button>
                    <Button variant="warning" onClick={() => openModal('Edit Product', <EditProduct product={row} closeModal={closeModal} />)}>
                        <PencilSquareIcon className="h-5 w-5" />
                    </Button>
                    <Button variant="danger" onClick={() => deleteProduct(row.id)}>
                        <TrashIcon className="h-5 w-5" />
                    </Button>
                </div>
            )
        }
    ];

    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-3'>
            <div className='flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4'>
                <div className="flex w-[60%] gap-4 items-center"> {/* Group Search and Filter dropdown */}
                    <SearchProduct searchKey={searchKey} setSearchKey={setSearchKey} />
                    <Dropdown
                        trigger={
                            <Button variant="secondary">
                                <FunnelIcon className="h-5 w-5 mr-2" /> Filter
                            </Button>
                        }
                    >
                        {React.cloneElement(
                            <FilterProduct />,
                            {
                                products: products,
                                minStock: minStock, setMinStock: setMinStock,
                                maxStock: maxStock, setMaxStock: setMaxStock,
                                category: category, setCategory: setCategory,
                                minPrice: minPrice, setMinPrice: setMinPrice,
                                maxPrice: maxPrice, setMaxPrice: setMaxPrice
                            }
                        )}
                    </Dropdown>
                </div>
                <Button variant="success" onClick={() => navigate('/products/add')}> {/* Changed to navigate */}
                    Add Product <PlusIcon className="h-5 w-5 ml-1" />
                </Button>
            </div>

            <Table
                data={filteredProducts.slice(firstItemIndex, lastItemIndex)}
                columns={columns}
            />

            <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />

            {/* Removed Modal rendering */}
            {/* {(showModal &&
                <Modal onClose={closeModal} title={modalTitle} component={modalComponent} />
            )} */}
        </div>
    )
}

export default Products;