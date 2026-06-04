import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import toast from 'react-hot-toast';

const AddUserPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', address: '', role: 'USER' });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) setErrors({ ...errors, [name]: '' });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        else if (formData.name.length < 20) newErrors.name = 'Name must be at least 20 characters';
        else if (formData.name.length > 60) newErrors.name = 'Name must be at most 60 characters';

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!emailRegex.test(formData.email)) newErrors.email = 'Please provide a valid email';

        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 8 || formData.password.length > 16) newErrors.password = 'Password must be 8-16 characters';
        else if (!/[A-Z]/.test(formData.password)) newErrors.password = 'Must contain at least one uppercase letter';
        else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password)) newErrors.password = 'Must contain at least one special character';

        if (formData.address && formData.address.length > 400) newErrors.address = 'Address must be at most 400 characters';
        if (!formData.role) newErrors.role = 'Role is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        try {
            await api.post('/admin/users', formData);
            toast.success('User created successfully');
            navigate('/admin/users');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to create user');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-fade-in max-w-lg">
            <div className="mb-6">
                <button onClick={() => navigate('/admin/users')} className="btn btn-ghost btn-sm mb-3 -ml-2">
                    ← Back to Users
                </button>
                <h1 className="text-xl font-semibold text-gray-900">Add User</h1>
                <p className="text-gray-500 text-sm mt-1">Create a new user account</p>
            </div>

            <div className="card">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="add-user-name">Full Name</label>
                        <input id="add-user-name" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Min 20 characters" />
                        {errors.name && <p className="text-danger-500 text-xs mt-1.5">{errors.name}</p>}
                        <p className="text-gray-400 text-xs mt-1">{formData.name.length}/60</p>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="add-user-email">Email</label>
                        <input id="add-user-email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="user@example.com" />
                        {errors.email && <p className="text-danger-500 text-xs mt-1.5">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="add-user-password">Password</label>
                        <div className="password-wrapper">
                            <input id="add-user-password" type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="8-16 chars, uppercase + special" />
                            <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
                                {showPassword ? (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                                ) : (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                )}
                            </button>
                        </div>
                        {errors.password && <p className="text-danger-500 text-xs mt-1.5">{errors.password}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="add-user-address">Address <span className="text-gray-400 normal-case font-normal">(optional)</span></label>
                        <textarea id="add-user-address" name="address" value={formData.address} onChange={handleChange} placeholder="Enter address" rows="2"></textarea>
                        {errors.address && <p className="text-danger-500 text-xs mt-1.5">{errors.address}</p>}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="add-user-role">Role</label>
                        <select id="add-user-role" name="role" value={formData.role} onChange={handleChange}>
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                            <option value="OWNER">Owner</option>
                        </select>
                        {errors.role && <p className="text-danger-500 text-xs mt-1.5">{errors.role}</p>}
                    </div>
                    <div className="flex gap-3">
                        <button type="submit" disabled={loading} className="btn btn-primary flex-1" id="create-user-btn">
                            {loading ? 'Creating...' : 'Create User'}
                        </button>
                        <button type="button" onClick={() => navigate('/admin/users')} className="btn btn-secondary">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUserPage;
