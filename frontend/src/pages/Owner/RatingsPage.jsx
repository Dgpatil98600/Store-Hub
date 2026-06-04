import React, { useState, useEffect } from 'react';
import api from '../../api';
import DataTable from '../../components/Common/DataTable';
import StarRating from '../../components/Common/StarRating';
import SkeletonLoader from '../../components/Common/SkeletonLoader';
import toast from 'react-hot-toast';

const RatingsPage = () => {
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchRatings(); }, []);

    const fetchRatings = async () => {
        try {
            const { data } = await api.get('/owner/ratings');
            setRatings(data);
        } catch (err) {
            toast.error('Failed to load ratings');
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        { key: 'user_name', label: 'User Name', sortable: true, render: (val) => <span className="font-medium text-gray-900">{val}</span> },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'store_name', label: 'Store' },
        { key: 'rating', label: 'Rating', render: (val) => (
            <div className="flex items-center gap-2">
                <StarRating rating={Number(val)} readonly size="sm" />
                <span className="text-gray-600 text-sm">{val}</span>
            </div>
        )},
    ];

    if (loading) return <SkeletonLoader type="table" />;

    return (
        <div className="animate-fade-in">
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-gray-900">Ratings</h1>
                <p className="text-gray-500 text-sm mt-1">Users who rated your stores</p>
            </div>
            <DataTable columns={columns} data={ratings} emptyMessage="No ratings received yet" />
        </div>
    );
};

export default RatingsPage;
