import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // Fetch user data if needed
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:3001/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            setUser(response.data.user);
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await axios.post('http://localhost:3001/auth/register', { name, email, password });
            localStorage.setItem('token', response.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            setUser(response.data.user);
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        axios.defaults.headers.common['Authorization'] = '';
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
