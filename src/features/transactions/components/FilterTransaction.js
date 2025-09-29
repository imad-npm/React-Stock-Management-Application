import React from 'react';
import Input from '../../../ui/Input';
import Select from '../../../ui/Select';

function FilterTransaction(props) {
    const { fromDate, setFromDate, toDate, setToDate, type, setType } = props;

    const typeOptions = [
        { value: 'ALL', label: 'ALL' },
        { value: 'EXIT', label: 'EXIT' },
        { value: 'ENTRY', label: 'ENTRY' }
    ];

    return (
        <div className="flex flex-wrap -mx-3 mt-4">
            <div className="w-full md:w-1/3 px-3 mb-4">
                <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700">From Date</label>
                <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} id="fromDate" />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-4">
                <label htmlFor="toDate" className="block text-sm font-medium text-gray-700">To Date</label>
                <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} id="toDate" />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-4">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                <Select id='type' value={type} onChange={(e) => setType(e.target.value)} options={typeOptions} />
            </div>
        </div>
    );
}

export default FilterTransaction;