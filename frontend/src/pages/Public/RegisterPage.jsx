import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const RegisterPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', address: '' });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { register } = useContext(AuthContext);
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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            const user = await register(formData);
            toast.success('Account created successfully');
            if (user && user.role) {
                if (user.role === 'ADMIN') navigate('/admin/dashboard');
                else if (user.role === 'OWNER') navigate('/owner/dashboard');
                else navigate('/stores');
            } else {
                navigate('/stores');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#f8f9fb]">
            <div className="w-full max-w-[420px] animate-scale-in">
                <div className="text-center mb-8">
                    <div className="w-12 h-12 rounded-xl bg-primary-600 flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                        S
                    </div>
                    <h1 className="text-xl font-semibold text-gray-900">Create your account</h1>
                    <p className="text-gray-500 text-sm mt-1">Join StoreHub and start rating stores</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-7">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="register-name">Full Name</label>
                            <input id="register-name" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name (min 20 characters)" />
                            {errors.name && <p className="text-danger-500 text-xs mt-1.5">{errors.name}</p>}
                            <p className="text-gray-400 text-xs mt-1">{formData.name.length}/60 characters</p>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="register-email">Email address</label>
                            <input id="register-email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
                            {errors.email && <p className="text-danger-500 text-xs mt-1.5">{errors.email}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="register-password">Password</label>
                            <div className="password-wrapper">
                                <input id="register-password" type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="8-16 chars, uppercase + special" />
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

                        <div className="mb-6">
                            <label htmlFor="register-address">Address <span className="text-gray-400 normal-case font-normal">(optional)</span></label>
                            <textarea id="register-address" name="address" value={formData.address} onChange={handleChange} placeholder="Enter your address" rows="2"></textarea>
                            {errors.address && <p className="text-danger-500 text-xs mt-1.5">{errors.address}</p>}
                        </div>

                        <button type="submit" disabled={loading} className="btn btn-primary btn-lg w-full" id="register-submit-btn">
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="spinner w-4 h-4"></span>
                                    Creating account...
                                </span>
                            ) : 'Create account'}
                        </button>
                    </form>

                    <div className="divider"></div>

                    <p className="text-center text-gray-500 text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium transition-colors">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
