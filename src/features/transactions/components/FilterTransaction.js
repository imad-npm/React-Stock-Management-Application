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
        <div className="row mt-4">
            <div className="col-md-4">
                <label htmlFor="fromDate" className="form-label">From Date</label>
                <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} id="fromDate" />
            </div>
            <div className="col-md-4">
                <label htmlFor="toDate" className="form-label">To Date</label>
                <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} id="toDate" />
            </div>
            <div className="col-md-4">
                <label htmlFor="type" className="form-label">Type</label>
                <Select id='type' value={type} onChange={(e) => setType(e.target.value)} options={typeOptions} />
            </div>
        </div>
    );
}

export default FilterTransaction;