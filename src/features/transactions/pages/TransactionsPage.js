import React, { useEffect, useState, useMemo } from 'react';
import useTransactionStore from '../transactionStore.js';
import SearchTransaction from '../components/SearchTransaction'; // Adjusted path
import Pagination from '../../../ui/Pagination';
import FilterTransaction from '../components/FilterTransaction'; // Adjusted path
import Button from '../../../ui/Button';
import Table from '../../../ui/Table.js';
import Dropdown from '../../../ui/Dropdown.js';
import { PencilSquareIcon, TrashIcon, PlusIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export default function TransactionsPage() {
    const { transactions, exportTransactions, deleteTransaction } = useTransactionStore();
    const navigate = useNavigate();

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

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [filteredTransactions]);

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
                    <Button size="sm" variant="warning" onClick={() => navigate(`/transactions/edit/${row.id}`)}> 
                        <PencilSquareIcon className="h-5 w-5" />
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => deleteTransaction(row.id)}>
                        <TrashIcon className="h-5 w-5" />
                    </Button>
                </div>
            )
        }
    ];

    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-3'>
            <div className='flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4'>
                <div className="flex flex-grow gap-4 items-center"> {/* Group Search and Filter dropdown */}
                    <SearchTransaction searchKey={searchKey} setSearchKey={setSearchKey} />
                    <Dropdown
                        trigger={
                            <Button variant="secondary">
                                <FunnelIcon className="h-5 w-5 mr-2" /> Filter
                            </Button>
                        }
                    >
                        {React.cloneElement(
                            <FilterTransaction />,
                            {
                                fromDate: fromDate, setFromDate: setFromDate,
                                toDate: toDate, setToDate: setToDate,
                                type: type, setType: setType
                            }
                        )}
                    </Dropdown>
                </div>
                <Button variant="success" onClick={() => navigate('/transactions/add')}  >
                    Add Transaction  <PlusIcon className="h-5 w-5 ml-1" />
                </Button>
            </div>

            <Table
                data={filteredTransactions.slice(firstItemIndex, lastItemIndex)}
                columns={columns}
            />

            <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />

            <Button variant="primary" onClick={() => exportTransactions()}>Export</Button>

          
        </div>
    );
}
