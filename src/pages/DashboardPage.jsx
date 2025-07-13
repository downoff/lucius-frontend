import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const backendUrl = 'https://lucius-ai.onrender.com';

function DashboardPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // useEffect is a hook that runs after the component mounts.
    // It's the perfect place to fetch data.
    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                // This case is handled by ProtectedRoute, but as a fallback:
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${backendUrl}/api/users/me`, {
                    headers: { 'x-auth-token': token }
                });
                if (!response.ok) throw new Error('Failed to fetch user data');
                
                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []); // The empty array [] means this runs only once when the page loads

    if (loading) {
        return <article aria-busy="true">Loading your dashboard...</article>;
    }

    if (!user) {
        return <p>Could not load user data. Please <Link to="/login">log in</Link> again.</p>;
    }

    return (
        <article>
            <hgroup>
                <h1>Dashboard</h1>
                <p>Welcome back, <strong>{user.name || user.email}</strong></p>
            </hgroup>

            <div className="grid">
                <div>
                    <h3>Your Plan</h3>
                    <strong id="plan-status" style={{ fontSize: '1.5rem', color: user.isPro ? 'var(--primary-color)' : 'inherit' }}>
                        {user.isPro ? 'Lucius Pro' : 'Basic'}
                    </strong>
                </div>
                <div>
                    <h3>Credits Remaining</h3>
                    <strong id="user-credits" style={{ fontSize: '1.5rem' }}>
                        {user.isPro ? 'Unlimited' : user.credits}
                    </strong>
                </div>
            </div>
            
            {!user.isPro && (
                <footer style={{ marginTop: '2rem' }}>
                    <Link to="/pricing" role="button" className="contrast">Upgrade to Pro Now</Link>
                </footer>
            )}
        </article>
    );
}

export default DashboardPage;