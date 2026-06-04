import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else if (currentPage <= 3) {
            pages.push(1, 2, 3, 4, '...', totalPages);
        } else if (currentPage >= totalPages - 2) {
            pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        } else {
            pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
        }
        return pages;
    };

    return (
        <div className="flex items-center gap-1">
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="btn btn-secondary btn-sm">
                ‹
            </button>
            {getPageNumbers().map((page, idx) => (
                <button
                    key={idx}
                    onClick={() => typeof page === 'number' && onPageChange(page)}
                    disabled={page === '...'}
                    className={`btn btn-sm min-w-[34px] ${
                        page === currentPage ? 'btn-primary' : page === '...' ? 'bg-transparent border-none text-gray-400 cursor-default' : 'btn-secondary'
                    }`}
                >
                    {page}
                </button>
            ))}
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="btn btn-secondary btn-sm">
                ›
            </button>
        </div>
    );
};

export default Pagination;
