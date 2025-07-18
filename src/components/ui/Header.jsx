import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

function Header() {
  // We will add logic here later to show/hide buttons based on login status
  return (
    <header className="px-4 py-2 border-b border-slate-800">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="logo">
            <img src="/assets/logo.png" alt="Lucius Logo" className="logo-image" />
            <strong className="text-white">Lucius</strong>
          </Link>
        </div>
        
        <div className="flex items-center gap-2">
            <Link to="/login">
                <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/signup">
                <Button>Sign Up</Button>
            </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;