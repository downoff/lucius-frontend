// frontend/src/components/ShareButton.jsx
import React, { useState } from 'react';

export default function ShareButton({ onShare }) {
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    try {
      await onShare();
    } catch (err) {
      console.error(err);
      alert(err.message || "Share failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleClick} disabled={loading}
      className="px-4 py-2 bg-blue-600 text-white rounded">
      {loading ? 'Sharing…' : 'Share (Make public)'}
    </button>
  );
}
