import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token');

    if (!token) {
        // If no token, redirect to the login page
        return <Navigate to="/login" replace />;
    }

    return children; // If token exists, show the requested page
}

export default ProtectedRoute;