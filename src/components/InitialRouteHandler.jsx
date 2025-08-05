import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout'; // We will show the main app if onboarding is complete

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function InitialRouteHandler() {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkOnboardingStatus = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login'); // Should be handled by ProtectedRoute, but as a fallback
                return;
            }

            try {
                const response = await fetch(`${backendUrl}/api/users/me`, {
                    headers: { 'x-auth-token': token }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user data.');
                }
                const userData = await response.json();
                setUser(userData);

                // This is the core logic of the component
                if (userData.hasOnboarded) {
                    // If they've onboarded, we don't need to do anything.
                    // The component will just render the main AppLayout.
                } else {
                    // If they have NOT onboarded, redirect them immediately.
                    navigate('/onboarding', { replace: true });
                }
            } catch (error) {
                console.error("Error checking onboarding status:", error);
                localStorage.removeItem('token');
                navigate('/login');
            } finally {
                setIsLoading(false);
            }
        };

        checkOnboardingStatus();
    }, [navigate]);

    // While we are checking, show a simple loading state
    if (isLoading) {
        return <div className="w-full h-screen bg-slate-900 flex justify-center items-center text-white">Loading Your Workspace...</div>;
    }

    // If the user has onboarded, show them the main application
    if (user && user.hasOnboarded) {
        return <AppLayout />;
    }

    // This is a fallback state, in most cases the user will be redirected before this renders
    return null;
}