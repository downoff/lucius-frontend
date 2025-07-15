import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthSuccessPage() {
    const navigate = useNavigate();

    useEffect(() => {
        // This code runs as soon as the page loads
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if (token) {
            // If a token is found in the URL, save it to the browser's storage
            console.log("Token found, saving to localStorage...");
            localStorage.setItem('token', token);

            // Redirect the user to their dashboard now that they are logged in
            // We use replace: true so the user can't click the "back" button to this page
            navigate('/dashboard', { replace: true });
            
            // We force a reload to ensure the header component updates correctly
            window.location.reload(); 
        } else {
            console.error("No token found in callback URL.");
            // If something went wrong and there's no token, send them back to the login page
            navigate('/login', { replace: true });
        }
    }, [navigate]);

    return (
        <div className="w-full max-w-md mx-auto py-12 text-center">
            <article>
                <h2 aria-busy="true">Please wait, completing your login...</h2>
            </article>
        </div>
    );
}

export default AuthSuccessPage;