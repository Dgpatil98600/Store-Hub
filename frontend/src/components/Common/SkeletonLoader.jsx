import React from 'react';

const SkeletonLoader = ({ type = 'card', count = 1 }) => {
    const renderSkeleton = () => {
        switch (type) {
            case 'card':
                return (
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="skeleton skeleton-text w-24"></div>
                            <div className="skeleton skeleton-circle"></div>
                        </div>
                        <div className="skeleton h-8 w-16 mb-2"></div>
                        <div className="skeleton skeleton-text-sm w-32"></div>
                    </div>
                );
            case 'table':
                return (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="p-4 border-b border-gray-100">
                            <div className="skeleton h-4 w-32"></div>
                        </div>
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex items-center gap-4 px-4 py-3 border-b border-gray-50">
                                <div className="skeleton h-4 w-1/4"></div>
                                <div className="skeleton h-4 w-1/3"></div>
                                <div className="skeleton h-4 w-1/5"></div>
                                <div className="skeleton h-4 w-16"></div>
                            </div>
                        ))}
                    </div>
                );
            case 'list':
                return (
                    <div className="space-y-3">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
                                <div className="skeleton h-5 w-40 mb-3"></div>
                                <div className="skeleton h-3 w-64 mb-2"></div>
                                <div className="skeleton h-3 w-24"></div>
                            </div>
                        ))}
                    </div>
                );
            default:
                return <div className="skeleton skeleton-card"></div>;
        }
    };

    return (
        <div className="animate-fade-in">
            {count > 1 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(count)].map((_, i) => (
                        <React.Fragment key={i}>{renderSkeleton()}</React.Fragment>
                    ))}
                </div>
            ) : (
                renderSkeleton()
            )}
        </div>
    );
};

export default SkeletonLoader;
