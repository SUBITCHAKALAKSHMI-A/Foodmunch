import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Login function
  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });
      setCurrentUser(res.data.user);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
  };

  // Check if user is logged in on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/me');
        setCurrentUser(res.data.user);
      } catch (error) {
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);