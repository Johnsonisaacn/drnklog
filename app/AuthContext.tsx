import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '@/firebaseConfig';

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Setting up auth state listener...');
    // Subscribe to authentication state changes
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      console.log('Auth state changed:', user)
      setUser(user);
      setLoading(false); // Ensure loading is set to false after checking auth state
    });

    // Cleanup subscription on unmount
    return () => {
      console.log('Cleaning up auth state listener...');
      unsubscribe();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};