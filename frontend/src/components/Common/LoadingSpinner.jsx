import React from 'react';

const LoadingSpinner = ({ size = 'md', message = 'Loading...' }) => {
    const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };

    return (
        <div className="flex flex-col items-center justify-center py-16 gap-4 animate-fade-in">
            <div className={`spinner ${sizes[size]}`}></div>
            {message && (
                <p className="text-gray-400 text-sm font-medium">{message}</p>
            )}
        </div>
    );
};

export default LoadingSpinner;
