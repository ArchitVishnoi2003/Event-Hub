import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getIdTokenResult
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Get the ID token result to check custom claims
          const idTokenResult = await getIdTokenResult(user);
          const claims = idTokenResult.claims;
          
          // Get user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            // Merge Firestore data with auth user data and claims
            setUser({ 
              ...user, 
              ...userData,
              role: claims.role || userData.role || 'user'
            });
          } else {
            // If no Firestore doc exists, use claims
            setUser({ 
              ...user, 
              role: claims.role || 'user'
            });
          }
        } catch (error) {
          console.error('Error loading user data:', error);
          setUser(user);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email, password, userData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Create user document in Firestore with additional data
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: userData.role || 'user',
        name: userData.name,
        phone: userData.phone,
        location: userData.location,
        bio: userData.bio,
        createdAt: new Date().toISOString()
      });

      // If user is admin, set custom claims
      if (userData.role === 'admin') {
        await setAdminRole(user.uid);
      }

      return user;
    } catch (error) {
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        // Get the ID token result to check custom claims
        const idTokenResult = await getIdTokenResult(user);
        const claims = idTokenResult.claims;
        
        setUser({ 
          ...user, 
          ...userData,
          role: claims.role || userData.role || 'user'
        });
      } else {
        setUser(user);
      }

      return user;
    } catch (error) {
      throw error;
    }
  };

  const setAdminRole = async (userId) => {
    try {
      // Update Firestore document
      await updateDoc(doc(db, 'users', userId), {
        role: 'admin'
      });

      // Set custom claims
      await fetch('https://us-central1-event-hub-c87b7.cloudfunctions.net/setAdminRole', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid: userId })
      });

      // Update local state if it's the current user
      if (user && user.uid === userId) {
        setUser(prev => ({ ...prev, role: 'admin' }));
      }

      // Force token refresh
      await auth.currentUser?.getIdToken(true);
    } catch (error) {
      console.error('Error setting admin role:', error);
      throw error;
    }
  };

  const updateProfile = async (userId, userData) => {
    try {
      await updateDoc(doc(db, 'users', userId), userData);
      
      // Update local state if it's the current user
      if (user && user.uid === userId) {
        setUser(prev => ({ ...prev, ...userData }));
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    isAdmin,
    setAdminRole,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 