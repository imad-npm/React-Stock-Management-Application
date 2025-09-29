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
        <div className="p-4"> {/* Inner padding for the dropdown content */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4"> {/* Adjusted grid for dropdown content */}
                <div>
                    <label htmlFor="fromDate" className="block text-sm font-medium text-text mb-1">From Date</label>
                    <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} id="fromDate" />
                </div>
                <div>
                    <label htmlFor="toDate" className="block text-sm font-medium text-text mb-1">To Date</label>
                    <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} id="toDate" />
                </div>
                <div>
                    <label htmlFor="type" className="block text-sm font-medium text-text mb-1">Type</label>
                    <Select id='type' value={type} onChange={(e) => setType(e.target.value)} options={typeOptions} />
                </div>
            </div>
        </div>
    );
}

export default FilterTransaction;