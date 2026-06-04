import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';
import SkeletonLoader from '../../components/Common/SkeletonLoader';
import StarRating from '../../components/Common/StarRating';
import toast from 'react-hot-toast';
import { UserSearch } from 'lucide-react';

const UserDetailPage = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => { fetchUser(); }, [id]);

    const fetchUser = async () => {
        try {
            const { data } = await api.get(`/admin/users/${id}`);
            setUser(data);
        } catch (err) {
            toast.error('Failed to load user details');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <SkeletonLoader type="list" />;
    if (!user) return (
        <div className="card text-center py-16">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4 text-gray-400">
                <UserSearch size={32} />
            </div>
            <p className="text-gray-500 font-medium">User not found</p>
            <button onClick={() => navigate('/admin/users')} className="btn btn-secondary mt-4">Back to Users</button>
        </div>
    );

    return (
        <div className="animate-fade-in max-w-2xl">
            <button onClick={() => navigate('/admin/users')} className="btn btn-ghost btn-sm mb-4 -ml-2">← Back to Users</button>

            <div className="card">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h1 className="text-lg font-semibold text-gray-900">{user.name}</h1>
                        <p className="text-gray-500 text-sm mt-0.5">{user.email}</p>
                    </div>
                    <span className={`badge ${user.role === 'ADMIN' ? 'badge-admin' : user.role === 'OWNER' ? 'badge-owner' : 'badge-user'}`}>{user.role}</span>
                </div>

                <div className="divider"></div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                    <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Email</p>
                        <p className="text-gray-700">{user.email}</p>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Role</p>
                        <p className="text-gray-700">{user.role}</p>
                    </div>
                    <div className="sm:col-span-2">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Address</p>
                        <p className="text-gray-700">{user.address || '—'}</p>
                    </div>
                </div>

                {user.role === 'OWNER' && user.stores && (
                    <>
                        <div className="divider"></div>
                        <div className="mt-4">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-base font-semibold text-gray-900">Owned Stores</h2>
                                {user.overallAverageRating != null && (
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-gray-400 text-sm">Overall:</span>
                                        <span className="text-star font-bold">{Number(user.overallAverageRating || 0).toFixed(1)} ★</span>
                                    </div>
                                )}
                            </div>
                            {user.stores.length === 0 ? (
                                <p className="text-gray-400 text-sm">No stores owned yet</p>
                            ) : (
                                <div className="space-y-3">
                                    {user.stores.map((store) => (
                                        <div key={store.id} className="bg-gray-50 rounded-lg p-4 border border-gray-100 flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-gray-800">{store.name}</p>
                                                <p className="text-gray-400 text-xs mt-0.5">{store.total_ratings} ratings</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <StarRating rating={Math.round(store.average_rating)} readonly size="sm" />
                                                <span className="text-gray-600 text-sm font-medium">{Number(store.average_rating).toFixed(1)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default UserDetailPage;
