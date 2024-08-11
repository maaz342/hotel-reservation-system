import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, database } from '../firebase-config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { ref, get } from 'firebase/database';

interface AuthContextType {
  currentUser: any;
  userRole: string | null;
  logout: () => Promise<void>;

}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        const userRef = ref(database, `users/${user.uid}/role`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setUserRole(snapshot.val());
        } else {
          setUserRole(null);
        }
      } else {
        setCurrentUser(null);
        setUserRole(null);
      }
    });

    return () => unsubscribe();
  }, []);
  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setUserRole('');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  return (
    <AuthContext.Provider value={{ currentUser, userRole,logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};
