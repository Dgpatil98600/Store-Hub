import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import DataTable from '../../components/Common/DataTable';
import SkeletonLoader from '../../components/Common/SkeletonLoader';
import toast from 'react-hot-toast';
import { UserPlus } from 'lucide-react';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [filters, setFilters] = useState({ name: '', email: '', address: '', role: '' });
    const navigate = useNavigate();

    useEffect(() => { fetchUsers(); }, [sortBy, sortOrder, filters]);

    const fetchUsers = async () => {
        try {
            const params = { sortBy, sortOrder };
            if (filters.name) params.name = filters.name;
            if (filters.email) params.email = filters.email;
            if (filters.address) params.address = filters.address;
            if (filters.role) params.role = filters.role;
            const { data } = await api.get('/admin/users', { params });
            setUsers(data);
        } catch (err) {
            toast.error('Failed to load users');
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
        { key: 'name', label: 'Name', sortable: true, render: (val) => <span className="font-medium text-gray-900">{val}</span> },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'address', label: 'Address', render: (val) => <span className="text-gray-400 truncate-text block max-w-[200px]" title={val}>{val || '—'}</span> },
        { key: 'role', label: 'Role', render: (val) => <span className={`badge ${val === 'ADMIN' ? 'badge-admin' : val === 'OWNER' ? 'badge-owner' : 'badge-user'}`}>{val}</span> },
    ];

    if (loading) return <SkeletonLoader type="table" />;

    return (
        <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900">Users</h1>
                    <p className="text-gray-500 text-sm mt-1">{users.length} users found</p>
                </div>
                <button onClick={() => navigate('/admin/users/add')} className="btn btn-primary" id="add-user-btn">
                    <UserPlus size={16} />
                    Add User
                </button>
            </div>

            <div className="card mb-5">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Filters</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <input type="text" name="name" placeholder="Filter by name..." value={filters.name} onChange={handleFilterChange} />
                    <input type="text" name="email" placeholder="Filter by email..." value={filters.email} onChange={handleFilterChange} />
                    <input type="text" name="address" placeholder="Filter by address..." value={filters.address} onChange={handleFilterChange} />
                    <select name="role" value={filters.role} onChange={handleFilterChange}>
                        <option value="">All Roles</option>
                        <option value="ADMIN">Admin</option>
                        <option value="USER">User</option>
                        <option value="OWNER">Owner</option>
                    </select>
                </div>
            </div>

            <DataTable columns={columns} data={users} onSort={handleSort} sortBy={sortBy} sortOrder={sortOrder}
                onRowClick={(user) => navigate(`/admin/users/${user.id}`)} emptyMessage="No users found matching your criteria" />
        </div>
    );
};

export default UsersPage;
