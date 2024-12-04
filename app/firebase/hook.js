import { useState, useEffect } from 'react'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
} from 'firebase/auth';
import { auth } from './config';
import { db } from './config';
import { setDoc, getDoc } from 'firebase/firestore';

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  };

  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const createUserDocument = async (userId, userData) => {
    try {
      await setDoc(doc(db, 'users', userId), userData);
    } catch(error){
      console.error("Error creating user document:", error)
      throw error;
    }
  };

  const getUserDocument = async (userId) => {
    try {
      const docRef = doc(db, 'users', userId);
      const docSnapshot = await getDoc(docRef);
      if(docSnapshot.exists()){
        return docSnapshot.data()
      } else {
        return null
      }
    } catch(error){
      console.error("Error getting user document:", error);
      throw error;
    }
  };

  const addChild = async(userId, childData) => {
    try {
      await setDoc(doc(db,'children', userId), childData);
    } catch (error){
      console.error("Error adding child document:", error);
      throw error;
    }
  };

  const getChildData = async(userId, childData) => {
    try {
      const docRef = doc(db, 'children', userId);
      const docSnapshot = await (getDoc(docRef), childData);
      if(docSnapshot.exists()){
        return docSnapshot.data()
      } else {
        return null
      }
    } catch(error){
      console.error("Error getting user document:", error);
      throw error;
    }
  };

  return { 
    currentUser, 
    loading, 
    signup, 
    login, 
    logout, 
    createUserDocument, 
    getUserDocument, 
    addChild,
    getChildData
  };
};