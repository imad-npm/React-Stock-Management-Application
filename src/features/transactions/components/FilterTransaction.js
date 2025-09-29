
import React from 'react';

function FilterTransaction(props) {
    const { fromDate, setFromDate, toDate, setToDate, type, setType } = props;

    return (
        <div className="row mt-4">
            <div className="col-md-4">
                <label htmlFor="fromDate" className="form-label">From Date</label>
                <input type="date" className="form-control" value={fromDate} onChange={(e) => setFromDate(e.target.value)} id="fromDate" />
            </div>
            <div className="col-md-4">
                <label htmlFor="toDate" className="form-label">To Date</label>
                <input type="date" className="form-control" value={toDate} onChange={(e) => setToDate(e.target.value)} id="toDate" />
            </div>
            <div className="col-md-4">
                <label htmlFor="type" className="form-label">Type</label>
                <select id='type' value={type} onChange={(e) => setType(e.target.value)} className='form-select'>
                    <option value='ALL'>ALL</option>
                    <option value='EXIT'>EXIT</option>
                    <option value="ENTRY">ENTRY</option>
                </select>
            </div>
        </div>
    );
}

export default FilterTransaction;
