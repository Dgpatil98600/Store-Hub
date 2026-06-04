import React, { useState, useMemo } from 'react';
import Pagination from './Pagination';
import { SearchX, ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

const DataTable = ({
    columns, data, onSort, sortBy, sortOrder,
    itemsPerPage = 10, onRowClick, emptyMessage = 'No data found'
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return data.slice(start, start + itemsPerPage);
    }, [data, currentPage, itemsPerPage]);

    React.useEffect(() => { setCurrentPage(1); }, [data.length]);

    const handleSort = (field) => {
        if (onSort) {
            const newOrder = sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc';
            onSort(field, newOrder);
        }
    };

    const renderSortIcon = (field) => {
        if (!onSort) return null;
        if (sortBy !== field) return <ArrowUpDown size={12} className="text-gray-300 ml-1" />;
        return sortOrder === 'asc' 
            ? <ArrowUp size={12} className="text-primary-600 ml-1" />
            : <ArrowDown size={12} className="text-primary-600 ml-1" />;
    };

    if (data.length === 0) {
        return (
            <div className="card text-center py-16">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4 text-gray-400">
                    <SearchX size={32} />
                </div>
                <p className="text-gray-500 text-sm font-medium">{emptyMessage}</p>
                <p className="text-gray-400 text-xs mt-1">Try adjusting your filters or search terms</p>
            </div>
        );
    }

    return (
        <div>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="data-table">
                        <thead>
                            <tr>
                                {columns.map((col) => (
                                    <th
                                        key={col.key}
                                        onClick={() => col.sortable && handleSort(col.key)}
                                        className={col.sortable ? 'sortable' : ''}
                                        style={col.width ? { width: col.width } : {}}
                                    >
                                        <span className="flex items-center gap-1">
                                            {col.label}
                                            {col.sortable && renderSortIcon(col.key)}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((row, idx) => (
                                <tr
                                    key={row.id || idx}
                                    onClick={() => onRowClick && onRowClick(row)}
                                    className={onRowClick ? 'cursor-pointer' : ''}
                                >
                                    {columns.map((col) => (
                                        <td key={col.key}>
                                            {col.render ? col.render(row[col.key], row) : row[col.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex items-center justify-between mt-4">
                <p className="text-gray-400 text-xs">
                    Showing {((currentPage - 1) * itemsPerPage) + 1}–{Math.min(currentPage * itemsPerPage, data.length)} of {data.length}
                </p>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
        </div>
    );
};

export default DataTable;
