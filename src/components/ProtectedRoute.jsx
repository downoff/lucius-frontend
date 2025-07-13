import React from 'react';
import { Navigate } from 'react-router-dom';

// This component checks if a user is logged in.
// If they are, it shows the page.
// If not, it redirects them to the login page.
function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;