import React, { useState } from 'react';
import api from '../../api';
import toast from 'react-hot-toast';

const ChangePasswordPage = () => {
    const [formData, setFormData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [errors, setErrors] = useState({});
    const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) setErrors({ ...errors, [name]: '' });
    };

    const togglePassword = (field) => setShowPasswords({ ...showPasswords, [field]: !showPasswords[field] });

    const EyeIcon = ({ visible }) => visible ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
    ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
    );

    const validateForm = () => {
        const newErrors = {};
        if (!formData.currentPassword) newErrors.currentPassword = 'Current password is required';
        if (!formData.newPassword) newErrors.newPassword = 'New password is required';
        else if (formData.newPassword.length < 8 || formData.newPassword.length > 16) newErrors.newPassword = 'Password must be 8-16 characters';
        else if (!/[A-Z]/.test(formData.newPassword)) newErrors.newPassword = 'Must contain at least one uppercase letter';
        else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.newPassword)) newErrors.newPassword = 'Must contain at least one special character';
        if (formData.newPassword !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        try {
            await api.put('/users/password', { currentPassword: formData.currentPassword, newPassword: formData.newPassword });
            toast.success('Password updated successfully');
            setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update password');
        } finally {
            setLoading(false);
        }
    };

    const passwordField = (id, name, label, field) => (
        <div className="mb-4">
            <label htmlFor={id}>{label}</label>
            <div className="password-wrapper">
                <input id={id} type={showPasswords[field] ? 'text' : 'password'} name={name} value={formData[name]} onChange={handleChange} placeholder={label} />
                <button type="button" className="password-toggle" onClick={() => togglePassword(field)} tabIndex={-1}>
                    <EyeIcon visible={showPasswords[field]} />
                </button>
            </div>
            {errors[name] && <p className="text-danger-500 text-xs mt-1.5">{errors[name]}</p>}
        </div>
    );

    return (
        <div className="animate-fade-in max-w-lg">
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-gray-900">Change Password</h1>
                <p className="text-gray-500 text-sm mt-1">Update your account password</p>
            </div>

            <div className="card">
                <form onSubmit={handleSubmit}>
                    {passwordField('current-password', 'currentPassword', 'Current Password', 'current')}
                    {passwordField('new-password', 'newPassword', 'New Password', 'new')}
                    {passwordField('confirm-password', 'confirmPassword', 'Confirm New Password', 'confirm')}
                    <button type="submit" disabled={loading} className="btn btn-primary w-full mt-2" id="change-password-btn">
                        {loading ? 'Updating...' : 'Update Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordPage;
