import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { Menu } from 'lucide-react';

const Header = ({ onMenuToggle }) => {
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
    };

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
            <div className="flex items-center justify-between px-4 sm:px-6 h-14">
                <div className="flex items-center gap-3">
                    {user && (
                        <button
                            onClick={onMenuToggle}
                            className="md:hidden btn-ghost p-1.5 rounded-lg"
                            aria-label="Toggle menu"
                        >
                            <Menu size={20} />
                        </button>
                    )}

                    <Link to="/" className="flex items-center gap-2 no-underline">
                        <div className="w-7 h-7 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-xs">
                            S
                        </div>
                        <span className="text-base font-semibold text-gray-900">
                            StoreHub
                        </span>
                    </Link>
                </div>

                {user && (
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex items-center gap-2">
                            <span className="text-sm text-gray-600 font-medium">{user.name || user.email}</span>
                            <span className={`badge ${
                                user.role === 'ADMIN' ? 'badge-admin' :
                                user.role === 'OWNER' ? 'badge-owner' : 'badge-user'
                            }`}>
                                {user.role}
                            </span>
                        </div>
                        <button onClick={handleLogout} className="btn btn-secondary btn-sm" id="logout-btn">
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
