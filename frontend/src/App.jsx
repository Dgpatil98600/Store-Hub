import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './routes/ProtectedRoute';

import Home from './pages/Home';
import LoginPage from './pages/Public/LoginPage';
import RegisterPage from './pages/Public/RegisterPage';

import AdminDashboard from './pages/Admin/DashboardPage';
import AdminUsers from './pages/Admin/UsersPage';
import AddUserPage from './pages/Admin/AddUserPage';
import UserDetailPage from './pages/Admin/UserDetailPage';
import AdminStores from './pages/Admin/StoresPage';
import AddStorePage from './pages/Admin/AddStorePage';

import OwnerDashboard from './pages/Owner/DashboardPage';
import OwnerRatings from './pages/Owner/RatingsPage';
import OwnerChangePassword from './pages/Owner/ChangePasswordPage';

import UserStores from './pages/User/StoresPage';
import UserChangePassword from './pages/User/ChangePasswordPage';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<MainLayout />}>
                <Route element={<ProtectedRoute roles={['ADMIN']} />}>
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/users" element={<AdminUsers />} />
                    <Route path="/admin/users/add" element={<AddUserPage />} />
                    <Route path="/admin/users/:id" element={<UserDetailPage />} />
                    <Route path="/admin/stores" element={<AdminStores />} />
                    <Route path="/admin/stores/add" element={<AddStorePage />} />
                </Route>

                <Route element={<ProtectedRoute roles={['OWNER']} />}>
                    <Route path="/owner/dashboard" element={<OwnerDashboard />} />
                    <Route path="/owner/ratings" element={<OwnerRatings />} />
                    <Route path="/owner/change-password" element={<OwnerChangePassword />} />
                </Route>

                <Route element={<ProtectedRoute roles={['USER']} />}>
                    <Route path="/stores" element={<UserStores />} />
                    <Route path="/change-password" element={<UserChangePassword />} />
                </Route>

            </Route>

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default App;
