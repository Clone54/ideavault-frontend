import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, googleProvider } from '../lib/firebase';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import api from '../lib/api';



const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const mintToken = async (currentUser) => {
    try {
      const res = await api.post('/jwt', { email: currentUser.email, uid: currentUser.uid, name: currentUser.displayName, photo: currentUser.photoURL });
      localStorage.setItem('access_token', res.data.token);
    } catch (err) {
      console.error('Failed to generate JWT', err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        mintToken(currentUser);
      } else {
        localStorage.removeItem('access_token');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const register = async (email, pass, name, photo) => {
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    await updateProfile(cred.user, { displayName: name, photoURL: photo });
    setUser({ ...cred.user, displayName: name, photoURL: photo });
  };

  const login = async (email, pass) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const updateUserProfile = async (name, photoURL) => {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName: name, photoURL });
      setUser({ ...auth.currentUser, displayName: name, photoURL });
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, register, login, logout, updateUserProfile }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
