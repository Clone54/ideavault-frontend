import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const token = await firebaseUser.getIdToken();
          
          setUser({
            ...firebaseUser,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            email: firebaseUser.email,
            uid: firebaseUser.uid,
            token
          });
        } else {
          setUser(null);
        }
      } catch (e) {
        console.error("Failed to fetch session", e);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const register = async (email, pass, name, photo) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(userCredential.user, {
        displayName: name || "Anonymous",
        photoURL: photo || ""
      });
      setUser({
        ...userCredential.user,
        displayName: name || "Anonymous",
        photoURL: photo || "",
        uid: userCredential.user.uid
      });
    } catch (error) {
       throw error;
    }
  };

  const login = async (email, pass) => {
    return await signInWithEmailAndPassword(auth, email, pass);
  };

  const updateUserProfile = async (name, photoURL) => {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL
      });
      setUser({
        ...user,
        displayName: name,
        photoURL: photoURL
      });
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, register, login, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
