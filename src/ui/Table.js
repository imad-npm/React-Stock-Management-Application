
import React from 'react';

/**
 * A reusable Table component for displaying tabular data.
 * @param {object} props
 * @param {Array<object>} props.data - An array of objects, where each object represents a row.
 * @param {Array<{header: string, accessor: string, Cell?: (row: object) => React.ReactNode, truncate?: boolean}>} props.columns - An array of column definitions.
 */
function Table({ data, columns }) {
    if (!data || data.length === 0) {
        return <p className="text-center py-4 text-secondary">No data to display.</p>;
    }

    return (
        <div className="shadow-lg border-b border-light-gray sm:rounded-lg">
            <div className="overflow-x-auto"> {/* Added for horizontal scrolling */}
                <table className="min-w-full divide-y divide-light-gray">
                    <thead className="bg-background">
                        <tr>
                            {columns.map((column, index) => (
                                <th
                                    key={column.accessor || index}
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider"
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-light-gray">
                        {data.map((row, rowIndex) => (
                            <tr key={row.id || rowIndex} className="hover:bg-light-gray transition duration-150 ease-in-out">
                                {columns.map((column, colIndex) => (
                                    <td
                                        key={column.accessor || colIndex}
                                        className={`px-6 py-4 whitespace-nowrap text-sm text-text ${column.truncate ? 'truncate max-w-xs' : ''}`}
                                    >
                                        {column.Cell ? column.Cell(row) : row[column.accessor]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;
