import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import toast from 'react-hot-toast';

const AddStorePage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', address: '', owner_id: '' });
    const [owners, setOwners] = useState([]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOwners = async () => {
            try {
                const { data } = await api.get('/admin/users', { params: { role: 'OWNER' } });
                setOwners(data);
            } catch (err) { console.error('Failed to fetch owners', err); }
        };
        fetchOwners();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) setErrors({ ...errors, [name]: '' });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Store name is required';
        if (formData.name.length > 100) newErrors.name = 'Store name must be at most 100 characters';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailRegex.test(formData.email)) newErrors.email = 'Please provide a valid email';
        if (formData.address && formData.address.length > 400) newErrors.address = 'Address must be at most 400 characters';
        if (!formData.owner_id) newErrors.owner_id = 'Owner is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        try {
            await api.post('/admin/stores', { ...formData, owner_id: Number(formData.owner_id) });
            toast.success('Store created successfully');
            navigate('/admin/stores');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to create store');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-fade-in max-w-lg">
            <div className="mb-6">
                <button onClick={() => navigate('/admin/stores')} className="btn btn-ghost btn-sm mb-3 -ml-2">← Back to Stores</button>
                <h1 className="text-xl font-semibold text-gray-900">Add Store</h1>
                <p className="text-gray-500 text-sm mt-1">Register a new store on the platform</p>
            </div>

            <div className="card">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="add-store-name">Store Name</label>
                        <input id="add-store-name" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter store name" />
                        {errors.name && <p className="text-danger-500 text-xs mt-1.5">{errors.name}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="add-store-email">Email <span className="text-gray-400 normal-case font-normal">(optional)</span></label>
                        <input id="add-store-email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="store@example.com" />
                        {errors.email && <p className="text-danger-500 text-xs mt-1.5">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="add-store-address">Address <span className="text-gray-400 normal-case font-normal">(optional)</span></label>
                        <textarea id="add-store-address" name="address" value={formData.address} onChange={handleChange} placeholder="Enter store address" rows="2"></textarea>
                        {errors.address && <p className="text-danger-500 text-xs mt-1.5">{errors.address}</p>}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="add-store-owner">Owner</label>
                        <select id="add-store-owner" name="owner_id" value={formData.owner_id} onChange={handleChange}>
                            <option value="">Select an owner</option>
                            {owners.map((o) => <option key={o.id} value={o.id}>{o.name} ({o.email})</option>)}
                        </select>
                        {errors.owner_id && <p className="text-danger-500 text-xs mt-1.5">{errors.owner_id}</p>}
                    </div>
                    <div className="flex gap-3">
                        <button type="submit" disabled={loading} className="btn btn-primary flex-1" id="create-store-btn">{loading ? 'Creating...' : 'Create Store'}</button>
                        <button type="button" onClick={() => navigate('/admin/stores')} className="btn btn-secondary">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddStorePage;
