import React, { useState, useEffect } from 'react';
import api from '../../api';
import StatCard from '../../components/Common/StatCard';
import StarRating from '../../components/Common/StarRating';
import SkeletonLoader from '../../components/Common/SkeletonLoader';
import toast from 'react-hot-toast';
import { Store, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const DashboardPage = () => {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchDashboard(); }, []);

    const fetchDashboard = async () => {
        try {
            const { data } = await api.get('/owner/dashboard');
            setDashboard(data);
        } catch (err) {
            toast.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div>
            <SkeletonLoader type="card" count={2} />
            <div className="mt-6"><SkeletonLoader type="list" /></div>
        </div>
    );

    return (
        <div className="animate-fade-in">
            <div className="mb-8">
                <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
                <p className="text-gray-500 text-sm mt-1">Your stores performance overview</p>
            </div>

            {dashboard && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8 stagger-children">
                        <StatCard title="Your Stores" value={dashboard.stores?.length || 0} icon={<Store size={20} />} color="primary" subtitle="Stores you own" />
                        <StatCard title="Total Ratings" value={dashboard.totalRatings || 0} icon={<Star size={20} />} color="warning" subtitle="Total ratings received" />
                    </div>

                    <h2 className="text-base font-semibold text-gray-900 mb-4">Your Stores</h2>

                    {dashboard.stores?.length === 0 ? (
                        <div className="card text-center py-12">
                            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4 text-gray-400">
                                <Store size={32} />
                            </div>
                            <p className="text-gray-500 font-medium">No stores yet</p>
                            <p className="text-gray-400 text-xs mt-1">Stores assigned to you will appear here</p>
                        </div>
                    ) : (
                        <motion.div 
                            initial="hidden"
                            animate="visible"
                            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            {dashboard.stores?.map((store) => (
                                <motion.div 
                                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                                    key={store.id} 
                                    className="card-interactive p-5"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{store.name}</h3>
                                            {store.email && <p className="text-gray-400 text-xs mt-0.5">{store.email}</p>}
                                        </div>
                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{store.total_ratings} ratings</span>
                                    </div>
                                    {store.address && <p className="text-gray-500 text-sm mb-3">{store.address}</p>}
                                    <div className="flex items-center gap-2">
                                        <StarRating rating={Math.round(Number(store.average_rating))} readonly size="sm" />
                                        <span className="text-star font-bold text-sm">{Number(store.average_rating).toFixed(1)}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </>
            )}
        </div>
    );
};

export default DashboardPage;
