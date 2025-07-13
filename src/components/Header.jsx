import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component

function Header() {
  return (
    <header className="container">
      <nav>
        <ul>
          <li>
            {/* This is now a Link component */}
            <Link to="/" className="logo">
              <img src="/assets/logo.png" alt="Lucius Logo" className="logo-image" />
              <strong>Lucius</strong>
            </Link>
          </li>
          {/* All navigation items are now Link components */}
          <li><Link to="/">Social Studio</Link></li>
          <li><Link to="/image-generator">Image Generator</Link></li>
        </ul>
        {/* We will add login/logout logic back here later */}
        <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup" role="button">Sign Up</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;