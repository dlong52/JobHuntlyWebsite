import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];

    if (totalPages <= 4) {
        // Show all pages if total pages <= 4
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
    } else {
        // Show dynamic pages for more than 4 pages
        if (currentPage > 3) {
            pageNumbers.push(1, '...');
        } else {
            pageNumbers.push(1, 2, 3);
        }

        if (currentPage > 3 && currentPage < totalPages - 2) {
            pageNumbers.push(currentPage - 1, currentPage, currentPage + 1);
        }

        if (currentPage >= totalPages - 2) {
            pageNumbers.push(totalPages - 2, totalPages - 1);
        }

        if (currentPage < totalPages - 2) {
            pageNumbers.push('...', totalPages);
        }
    }

    return (
        <nav className="flex justify-center mt-8">
            <ul className="pagination flex items-center gap-2 font-semibold">
                {/* Previous button */}
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                        className="page-link px-3 py-1 rounded-md hover:bg-gray-300"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeftIcon className="w-6" />
                    </button>
                </li>

                {/* Page numbers */}
                {pageNumbers.map((page, index) => (
                    <li key={index} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                        {page === '...' ? (
                            <span className="page-link px-3 py-1">...</span>
                        ) : (
                            <button
                                className={`page-link px-3 py-1 rounded-md ${currentPage === page ? 'bg-blue-700 text-white' : 'text-neutrals-80 hover:bg-gray-300'}`}
                                onClick={() => onPageChange(page)}
                            >
                                {page}
                            </button>
                        )}
                    </li>
                ))}

                {/* Next button */}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                        className="page-link px-3 py-1 rounded-md hover:bg-gray-300"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRightIcon className="w-6" />
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
