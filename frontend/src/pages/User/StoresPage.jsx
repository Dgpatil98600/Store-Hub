import React, { useState, useEffect } from 'react';
import api from '../../api';
import StarRating from '../../components/Common/StarRating';
import SkeletonLoader from '../../components/Common/SkeletonLoader';
import toast from 'react-hot-toast';
import { Search, Store } from 'lucide-react';
import { motion } from 'framer-motion';

const StoresPage = () => {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchName, setSearchName] = useState('');
    const [searchAddress, setSearchAddress] = useState('');

    useEffect(() => { fetchStores(); }, [searchName, searchAddress]);

    const fetchStores = async () => {
        try {
            const params = {};
            if (searchName) params.name = searchName;
            if (searchAddress) params.address = searchAddress;
            const { data } = await api.get('/stores', { params });
            setStores(data);
        } catch (err) {
            toast.error('Failed to load stores');
        } finally {
            setLoading(false);
        }
    };

    const handleRate = async (storeId, rating, existingRating) => {
        try {
            if (existingRating) {
                await api.put(`/ratings/${storeId}`, { rating });
            } else {
                await api.post('/ratings', { storeId, rating });
            }
            toast.success('Rating submitted successfully!');
            fetchStores();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to submit rating');
        }
    };

    if (loading) return <SkeletonLoader type="card" count={6} />;

    return (
        <div className="animate-fade-in">
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-gray-900">Browse Stores</h1>
                <p className="text-gray-500 text-sm mt-1">Discover and rate stores</p>
            </div>

            <div className="card mb-6">
                <div className="flex items-center gap-2 mb-3">
                    <Search className="text-gray-400 w-4 h-4" />
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Search</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input type="text" placeholder="Search by name..." value={searchName} onChange={(e) => setSearchName(e.target.value)} />
                    <input type="text" placeholder="Search by address..." value={searchAddress} onChange={(e) => setSearchAddress(e.target.value)} />
                </div>
            </div>

            {stores.length === 0 ? (
                <div className="card text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4 text-gray-400">
                        <Store size={32} />
                    </div>
                    <p className="text-gray-500 font-medium">No stores found</p>
                    <p className="text-gray-400 text-xs mt-1">Try adjusting your search terms</p>
                </div>
            ) : (
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: { transition: { staggerChildren: 0.1 } }
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                    {stores.map((store) => (
                        <motion.div 
                            variants={{
                                hidden: { opacity: 0, y: 10 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            key={store.id} 
                            className="card-interactive p-5"
                        >
                            <h3 className="font-semibold text-gray-900 text-base mb-1">{store.name}</h3>
                            {store.address && (
                                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{store.address}</p>
                            )}

                            {/* Overall Rating */}
                            <div className="flex items-center gap-2 mb-4">
                                <StarRating rating={Math.round(Number(store.average_rating))} readonly size="sm" />
                                <span className="text-gray-600 text-sm font-medium">
                                    {Number(store.average_rating).toFixed(1)}
                                </span>
                                <span className="text-gray-400 text-xs">overall</span>
                            </div>

                            <div className="divider"></div>

                            {/* User's Rating */}
                            <div className="mt-3">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Your Rating</p>
                                <StarRating
                                    rating={store.user_rating || 0}
                                    onRate={(rating) => handleRate(store.id, rating, store.user_rating)}
                                    size="md"
                                />
                                <p className="text-gray-400 text-xs mt-1.5">
                                    {store.user_rating
                                        ? `You rated ${store.user_rating}/5 — click a star to update`
                                        : 'Click a star to rate or update your rating'
                                    }
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default StoresPage;
