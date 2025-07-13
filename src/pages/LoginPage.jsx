import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// This should be your LIVE backend URL
const backendUrl = 'https://lucius-ai.onrender.com';

function LoginPage() {
    // State for the form inputs and any messages
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // useNavigate is a hook from React Router to redirect users
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const response = await fetch(`${backendUrl}/api/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Login successful! Redirecting...');
                localStorage.setItem('token', data.token);
                // Instead of window.location, we use navigate for SPA routing
                // We also reload the window to force the global.js to re-check the token
                setTimeout(() => {
                    navigate('/');
                    window.location.reload(); 
                }, 1500);
            } else {
                setMessage(`Error: ${data.message}`);
                setIsLoading(false);
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <main className="container" style={{ maxWidth: '500px' }}>
            <article>
                <header style={{ textAlign: 'center' }}>
                    <h2>Login to Your Account</h2>
                </header>

                <a href={`${backendUrl}/auth/google`} role="button" className="contrast" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ width: '18px', height: '18px', marginRight: '0.75rem' }}>
                        {/* Google G logo SVG paths */}
                    </svg>
                    Continue with Google
                </a>

                <div style={{ textAlign: 'center', margin: '1rem 0', color: 'var(--subtle-text-color)' }}>OR</div>

                <form onSubmit={handleLogin}>
                    <label htmlFor="email">Login with Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="you@example.com" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Enter your password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                {message && <p style={{ marginTop: '1rem', color: message.startsWith('Error') ? 'red' : 'green' }}>{message}</p>}
                
                <footer>
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </footer>
            </article>
        </main>
    );
}

export default LoginPage;