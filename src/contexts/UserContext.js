import React, { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/me`, {
            headers: { 'x-auth-token': token }
          });
          if (!res.ok) throw new Error("Session expired.");
          const json = await res.json();
          setUser(json.user);
        } catch (err) { 
          console.error(err);
          localStorage.removeItem('token');
        }
      }
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
        {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
