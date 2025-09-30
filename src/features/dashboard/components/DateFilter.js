import React from 'react';

const DateFilter = ({ onDateChange }) => {
  return (
    <div className="flex justify-end">
      <select
        onChange={(e) => onDateChange(e.target.value)}
        className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="all">All Time</option>
        <option value="7">Last 7 Days</option>
        <option value="30">Last 30 Days</option>
      </select>
    </div>
  );
};

export default DateFilter;
