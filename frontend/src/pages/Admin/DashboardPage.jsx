import React, { useState, useEffect } from 'react';
import api from '../../api';
import StatCard from '../../components/Common/StatCard';
import SkeletonLoader from '../../components/Common/SkeletonLoader';
import toast from 'react-hot-toast';
import { Users, Store, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const DashboardPage = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchDashboard(); }, []);

    const fetchDashboard = async () => {
        try {
            const { data } = await api.get('/admin/dashboard');
            setStats(data);
        } catch (err) {
            toast.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <SkeletonLoader type="card" count={3} />;

    return (
        <div className="animate-fade-in">
            <div className="mb-8">
                <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
                <p className="text-gray-500 text-sm mt-1">Platform overview and statistics</p>
            </div>

            {stats && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ staggerChildren: 0.1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                    <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                        <StatCard title="Total Users" value={stats.totalUsers} icon={<Users size={20} />} color="primary" subtitle="Registered platform users" />
                    </motion.div>
                    <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                        <StatCard title="Total Stores" value={stats.totalStores} icon={<Store size={20} />} color="success" subtitle="Active stores on platform" />
                    </motion.div>
                    <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                        <StatCard title="Total Ratings" value={stats.totalRatings} icon={<Star size={20} />} color="warning" subtitle="Ratings submitted by users" />
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default DashboardPage;
