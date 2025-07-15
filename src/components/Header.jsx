import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  // We will re-add the global.js logic here later to show/hide links
  return (
    <header className="container mx-auto px-4">
      <nav className="flex items-center justify-between py-3 border-b border-slate-800">
        <div className="flex items-center gap-6">
          <Link to="/" className="logo">
            <img src="/assets/logo.png" alt="Lucius Logo" className="logo-image" />
            <strong>Lucius</strong>
          </Link>
          <Link to="/" className="text-slate-300 hover:text-white transition-colors text-sm">Social Studio</Link>
          <Link to="/image-generator" className="text-slate-300 hover:text-white transition-colors text-sm">Image Generator</Link>
          <Link to="/scheduler" className="text-slate-300 hover:text-white transition-colors text-sm">Scheduler</Link>
        </div>
        
        <div className="flex items-center gap-4">
            <Link to="/login" className="text-slate-300 hover:text-white transition-colors text-sm">Login</Link>
            <Link to="/signup" role="button" className="bg-white text-slate-900 font-semibold px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-colors text-sm">Sign Up</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;