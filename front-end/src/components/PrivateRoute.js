import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';  // Import js-cookie

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get('token');  // Get token from cookie
      console.log("Token: ", token);  // Log token to check if it exists

      if (token) {
        try {
          const response = await axios.get('http://localhost:8000/api/user', {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log('Authenticated', response.data);  // Log response for debugging
          setIsAuthenticated(true);
        } catch (error) {
          console.log('Error:', error);  // Log the error for debugging
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
