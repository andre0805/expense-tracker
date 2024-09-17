import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import { auth } from '../firebase.config';

const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const signup = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const logout = () => {
  return signOut(auth);
};

const googleLogin = () => {
  const googleAuthProvider = new GoogleAuthProvider();
  return signInWithPopup(auth, googleAuthProvider);
};

export type AuthContextData = {
  user: User | null;
  isLoading?: boolean;
  login: typeof login;
  signup: typeof signup;
  logout: typeof logout;
  googleLogin: typeof googleLogin;
};

const AuthContext = createContext<AuthContextData>({
  user: null,
  login,
  signup,
  logout,
  googleLogin,
});

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FunctionComponent<IAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const value: AuthContextData = {
    user,
    isLoading,
    login,
    signup,
    logout,
    googleLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
