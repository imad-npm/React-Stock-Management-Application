import React, { useEffect, useState, useMemo } from 'react';
import useTransactionStore from '../transactionStore.js';
import SearchTransaction from './SearchTransaction';
import AddTransaction from './AddTransaction';
import Modal from '../../../ui/Modal';
import Pagination from '../../../ui/Pagination';
import FilterTransaction from './FilterTransaction';
import Button from '../../../ui/Button';
import Table from '../../../ui/Table.js';
import EditTransaction from './EditTransaction.js';

export default function Transactions() {
    const { transactions, exportTransactions, deleteTransaction } = useTransactionStore();

    // State for filters is lifted to this parent component
    const [searchKey, setSearchKey] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [type, setType] = useState('ALL');

    const filteredTransactions = useMemo(() => {
        return transactions.filter(t => {
            const transactionDate = new Date(t.date);
            const fromDateTime = fromDate ? new Date(fromDate).setHours(0, 0, 0, 0) : null;
            const toDateTime = toDate ? new Date(toDate).setHours(23, 59, 59, 999) : null;

            return (
                (searchKey === '' || t.product.toLowerCase().includes(searchKey.toLowerCase())) &&
                (type === 'ALL' || t.type === type) &&
                (!fromDateTime || transactionDate >= fromDateTime) &&
                (!toDateTime || transactionDate <= toDateTime)
            );
        });
    }, [transactions, searchKey, fromDate, toDate, type]);

    const [showModal, setShowModal] = useState(false);
    const [modalComponent, setModalComponent] = useState();
    const [modalTitle, setModalTitle] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const openModal = (title, component) => {
        setShowModal(true);
        setModalTitle(title);
        setModalComponent(component);
    };

    const closeModal = () => {
        setShowModal(false);
        setModalComponent(null);
    };

    const itemsPerPage = 10;
    const totalItems = filteredTransactions.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    var lastItemIndex = currentPage * itemsPerPage;
    var firstItemIndex = lastItemIndex - itemsPerPage;

    const columns = [
        { header: '#', accessor: 'id' },
        { header: 'Product', accessor: 'product' },
        { header: 'Quantity', accessor: 'quantity' },
        { header: 'Type', accessor: 'type' },
        { header: 'Date', accessor: 'date' },
        {
            header: 'Action', accessor: 'action', Cell: (row) => (
                <div className='flex space-x-2'>
                    <Button variant="warning" onClick={() => openModal('Edit Transaction', <EditTransaction transaction={row} closeModal={closeModal} />)}>
                        <i className="fa fa-edit"></i>
                    </Button>
                    <Button variant="danger" onClick={() => deleteTransaction(row.id)}>
                        <i className="fa fa-trash"></i>
                    </Button>
                </div>
            )
        }
    ];

    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-3'>
            <div className='flex flex-wrap items-center justify-between mt-4 mb-5'>
                <SearchTransaction searchKey={searchKey} setSearchKey={setSearchKey} />
                <Button variant="success" onClick={() => openModal('Add Transaction', <AddTransaction />)}  > 
                    Add Transaction  <i className="fa fa-plus-square  m-1   "></i>
                </Button>
                <FilterTransaction 
                    fromDate={fromDate} setFromDate={setFromDate}
                    toDate={toDate} setToDate={setToDate}
                    type={type} setType={setType}
                />
            </div>

            <Table 
                data={filteredTransactions.slice(firstItemIndex, lastItemIndex)}
                columns={columns}
            />

            <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />

            <Button variant="primary" onClick={() => exportTransactions()}>Export</Button>

            {(showModal &&
                <Modal onClose={closeModal} title={modalTitle} component={modalComponent} />
            )}
        </div>
    );
}
