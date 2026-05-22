import React, { createContext, useContext } from 'react';
import { authClient } from '../lib/auth-client';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  // Use Better Auth's standard React hooks to watch session state
  const { data: session, isPending, error } = authClient.useSession();

  const loginWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  const register = async (email, password, name, photo) => {
    await authClient.signUp.email({
      email,
      password,
      name,
      image: photo,
      callbackURL: "/dashboard",
    });
  };

  const login = async (email, password) => {
    await authClient.signIn.email({
      email,
      password,
      callbackURL: "/dashboard",
    });
  };

  const updateUserProfile = async (name, photoURL) => {
    await authClient.user.update({
      name: name,
      image: photoURL,
    });
  };

  const logout = async () => {
    await authClient.signOut({
      callbackURL: "/login"
    });
  };

  // Standardized normalization map so you don't have to rewrite your profile view UI components
  const normalizedUser = session ? {
    email: session.user.email,
    displayName: session.user.name,
    photoURL: session.user.image,
    uid: session.user.id
  } : null;

  return (
    <AuthContext.Provider value={{ 
      user: normalizedUser, 
      loading: isPending, 
      loginWithGoogle, 
      register, 
      login, 
      logout, 
      updateUserProfile 
    }}>
      {!isPending && children}
    </AuthContext.Provider>
  );
};