import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const PrivateRoute = ({ children, requiredRole }) => {
 const { isAuthenticated, role } = useAuth();

 if (!isAuthenticated) {
 return <Navigate to={`/login/${requiredRole}`} />;
 }

 if (requiredRole && role !== requiredRole) {
 return <Navigate to="/" />;
 }

 return children;
};
