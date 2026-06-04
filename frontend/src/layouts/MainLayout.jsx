import React, { useContext, useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, Users, Store, Star, Lock } from 'lucide-react';

const MainLayout = () => {
    const { user } = useContext(AuthContext);
    const [mobileOpen, setMobileOpen] = useState(false);

    const getNavLinks = () => {
        if (!user) return [];
        switch (user.role) {
            case 'ADMIN':
                return [
                    { to: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
                    { to: '/admin/users', label: 'Users', icon: <Users size={18} /> },
                    { to: '/admin/stores', label: 'Stores', icon: <Store size={18} /> },
                ];
            case 'OWNER':
                return [
                    { to: '/owner/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
                    { to: '/owner/ratings', label: 'Ratings', icon: <Star size={18} /> },
                    { to: '/owner/change-password', label: 'Change Password', icon: <Lock size={18} /> },
                ];
            case 'USER':
                return [
                    { to: '/stores', label: 'Stores', icon: <Store size={18} /> },
                    { to: '/change-password', label: 'Change Paaword', icon: <Lock size={18} /> },
                ];
            default: return [];
        }
    };

    const navLinks = getNavLinks();

    const sidebarContent = (
        <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
                <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                >
                    {link.icon}
                    <span>{link.label}</span>
                </NavLink>
            ))}
        </nav>
    );

    return (
        <div className="flex flex-col min-h-screen bg-[#f8f9fb]">
            <Header onMenuToggle={() => setMobileOpen(!mobileOpen)} />

            <div className="flex flex-1">
                {user && (
                    <aside className="w-52 border-r border-gray-200 bg-white flex-shrink-0 hidden md:flex flex-col p-4 pt-5">
                        {sidebarContent}
                    </aside>
                )}

                {mobileOpen && (
                    <div className="mobile-menu-overlay open" onClick={() => setMobileOpen(false)} />
                )}

                {user && (
                    <div className={`mobile-sidebar ${mobileOpen ? 'open' : ''}`}>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-7 h-7 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-xs">S</div>
                            <span className="text-base font-semibold text-gray-900">StoreHub</span>
                        </div>
                        {sidebarContent}
                    </div>
                )}

                <main className="flex-1 p-4 sm:p-6 overflow-auto">
                    <div className="max-w-6xl mx-auto page-enter">
                        <Outlet />
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
