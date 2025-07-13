import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// This should be your LIVE backend URL
const backendUrl = 'https://lucius-ai.onrender.com';

function SignupPage() {
    // State for the form inputs and any messages
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSignup = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const response = await fetch(`${backendUrl}/api/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Success! Your account has been created. Please proceed to the login page.');
                setMessage(prev => ({ text: 'Success! Your account has been created. Please proceed to the login page.', type: 'success' }));
            } else {
                setMessage(`Error: ${data.message}`);
                setMessage(prev => ({ text: `Error: ${data.message}`, type: 'error' }));
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="container" style={{ maxWidth: '500px' }}>
            <article>
                <header style={{ textAlign: 'center' }}>
                    <h2>Create Your Account</h2>
                </header>

                <a href={`${backendUrl}/auth/google`} role="button" className="contrast" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ width: '18px', height: '18px', marginRight: '0.75rem' }}>
                        {/* Google G logo SVG paths */}
                    </svg>
                    Continue with Google
                </a>

                <div style={{ textAlign: 'center', margin: '1rem 0', color: 'var(--subtle-text-color)' }}>OR</div>

                <form onSubmit={handleSignup}>
                    <label htmlFor="email">Sign up with your Email</label>
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
                        placeholder="Enter a secure password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                {message && <p style={{ marginTop: '1rem', color: message.type === 'error' ? 'red' : 'green' }}>{message.text}</p>}

            </article>
        </main>
    );
}

export default SignupPage;