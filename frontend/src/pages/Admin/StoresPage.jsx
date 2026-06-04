import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import DataTable from '../../components/Common/DataTable';
import StarRating from '../../components/Common/StarRating';
import SkeletonLoader from '../../components/Common/SkeletonLoader';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';

const StoresPage = () => {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [filters, setFilters] = useState({ name: '', email: '', address: '' });
    const navigate = useNavigate();

    useEffect(() => { fetchStores(); }, [sortBy, sortOrder, filters]);

    const fetchStores = async () => {
        try {
            const params = { sortBy, sortOrder };
            if (filters.name) params.name = filters.name;
            if (filters.email) params.email = filters.email;
            if (filters.address) params.address = filters.address;
            const { data } = await api.get('/admin/stores', { params });
            setStores(data);
        } catch (err) {
            toast.error('Failed to load stores');
        } finally {
            setLoading(false);
        }
    };

    const handleSort = (field, order) => { setSortBy(field); setSortOrder(order); };
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const columns = [
        { key: 'name', label: 'Store Name', sortable: true, render: (val) => <span className="font-medium text-gray-900">{val}</span> },
        { key: 'email', label: 'Email', sortable: true, render: (val) => val || '—' },
        { key: 'address', label: 'Address', render: (val) => <span className="text-gray-400 truncate-text block max-w-[200px]" title={val}>{val || '—'}</span> },
        { key: 'average_rating', label: 'Avg Rating', render: (val) => (
            <div className="flex items-center gap-2">
                <StarRating rating={Math.round(Number(val))} readonly size="sm" />
                <span className="text-gray-600 text-sm">{Number(val).toFixed(1)}</span>
            </div>
        )},
    ];

    if (loading) return <SkeletonLoader type="table" />;

    return (
        <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900">Stores</h1>
                    <p className="text-gray-500 text-sm mt-1">{stores.length} stores found</p>
                </div>
                <button onClick={() => navigate('/admin/stores/add')} className="btn btn-primary" id="add-store-btn">
                    <Plus size={16} strokeWidth={2.5} />
                    Add Store
                </button>
            </div>

            <div className="card mb-5">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Filters</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input type="text" name="name" placeholder="Filter by name..." value={filters.name} onChange={handleFilterChange} />
                    <input type="text" name="email" placeholder="Filter by email..." value={filters.email} onChange={handleFilterChange} />
                    <input type="text" name="address" placeholder="Filter by address..." value={filters.address} onChange={handleFilterChange} />
                </div>
            </div>

            <DataTable columns={columns} data={stores} onSort={handleSort} sortBy={sortBy} sortOrder={sortOrder} emptyMessage="No stores found matching your criteria" />
        </div>
    );
};

export default StoresPage;
