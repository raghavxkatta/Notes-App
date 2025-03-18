import  { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config/apiConfig';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Checks if the user has logged in before
  useEffect(() => {
    const getUser = async () => {
      if (token) {
        try {
          setIsLoading(true);
        //   response mein saara user ka data daaldo
          const response = await axios.get(`${API_BASE_URL}/user/profile`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          /* Aur fir woh data User state var mein daaldo */
          setUser(response.data.user);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching user profile:', error);
          logout();
          setIsLoading(false);
        }
      }
    };
    getUser();
  }, [token]);

  // Login function
  const login = async (username, password) => {
    try {
      setIsLoading(true);
      setError(null);
      /* Collects username and password and sends it to backend server */
      const response = await axios.post(`${API_BASE_URL}/user/login`, {
        username,
        password
      });
      
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      setIsLoading(false);
      
      return true;
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
      setIsLoading(false);
      return false;
    }
  };

  // Register function
  const register = async (username, password) => {
    try {
      setIsLoading(true);
      setError(null);
      await axios.post(`${API_BASE_URL}/user/register`, {
        username,
        password
      });
      
      setIsLoading(false);
      return true;
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
      setIsLoading(false);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        token, 
        isLoading, 
        error, 
        login, 
        register, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};