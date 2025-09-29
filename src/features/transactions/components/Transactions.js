import React, { useEffect, useState, useMemo } from 'react';
import useTransactionStore from '../transactionStore.js';
import SearchTransaction from './SearchTransaction';
import AddTransaction from './AddTransaction';
import Modal from '../../../ui/Modal';
import Pagination from '../../../ui/Pagination';
import Transaction from './Transaction';
import FilterTransaction from './FilterTransaction';
import Button from '../../../ui/Button';

export default function Transactions() {
    const { transactions, exportTransactions } = useTransactionStore();

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

    return (
        <div className='container mt-3'>
            <div className=' d-flex flex-wrap  justify-content-between  align-items-center mt-4 mb-5  '>
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

            <table className="table custom-table ">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Product</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Type</th>
                        <th scope="col">Date</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredTransactions.slice(firstItemIndex, lastItemIndex).map(
                            (transaction) => <Transaction key={transaction.id} transaction={transaction} openModal={openModal} />
                        )
                    }
                </tbody>
            </table>

            <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />

            <Button variant="primary" onClick={() => exportTransactions()}>Export</Button>

            {(showModal &&
                <Modal onClose={closeModal} title={modalTitle} component={modalComponent} />
            )}
        </div>
    );
}
