
import React from 'react';

/**
 * A reusable Table component for displaying tabular data.
 * @param {object} props
 * @param {Array<object>} props.data - An array of objects, where each object represents a row.
 * @param {Array<{header: string, accessor: string, Cell?: (row: object) => React.ReactNode}>} props.columns - An array of column definitions.
 */
function Table({ data, columns }) {
    if (!data || data.length === 0) {
        return <p>No data to display.</p>;
    }

    return (
        <table className="table custom-table">
            <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th key={column.accessor || index} scope="col">
                            {column.header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={row.id || rowIndex}>
                        {columns.map((column, colIndex) => (
                            <td key={column.accessor || colIndex}>
                                {column.Cell ? column.Cell(row) : row[column.accessor]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;
