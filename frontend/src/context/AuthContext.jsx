import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const verifyUser = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedUser = JSON.parse(atob(token.split('.')[1]));
                if (decodedUser.exp * 1000 < Date.now()) {
                    localStorage.removeItem('token');
                    setUser(null);
                } else {
                    setUser({ ...decodedUser, token });
                }
            } catch (error) {
                console.error("Invalid token", error);
                localStorage.removeItem('token');
                setUser(null);
            }
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        verifyUser();
    }, [verifyUser]);

    const login = async (email, password, role) => {
        const { data } = await api.post('/auth/login', { email, password, role });
        localStorage.setItem('token', data.token);
        setUser(data.user);
        return data.user;
    };

    const register = async (userData) => {
        const { data } = await api.post('/auth/register', userData);
        if (data.token && data.user) {
            localStorage.setItem('token', data.token);
            setUser(data.user);
            return data.user;
        }
        return data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, register, logout, loading, isLoggedIn: !!user }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
