import { useState, useEffect } from 'react'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
} from 'firebase/auth';
import { auth, db } from './config';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  serverTimestamp 
} from 'firebase/firestore';
export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [childData, setChildData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          // Fetch user document
          const userDoc = await getUserDocument(user.uid);
          setUserData(userDoc);

          try {
            const childDoc = await getChildData(user.uid);
            setChildData(childDoc);
          } catch (childError){
            console.log("No child document found:", childError)
            setChildData([])
          }
        } catch (error) {
          console.error("Error fetching user", error);
        }
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email, password, name) => {
    return createUserWithEmailAndPassword(auth, email, password, name)
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
      return docSnapshot.exists() ? docSnapshot.data() : null;
    } catch(error){
      console.error("Error getting user document:", error);
      throw error;
    }
  };

  const addChild = async (userId, childData) => {
    try {
      // Ensure we have a valid user ID
      const id = userId?.uid || userId;
    
      if(!id) {
        throw new Error('Invalid user ID')
      }
      
      // Use a unique ID for each child document
      const childDocId = `${id}_${Date.now()}`;
  
      await setDoc(doc(db, 'children', childDocId), {
        ...childData,
        userId: id, // Explicitly store the user ID
        createdAt: serverTimestamp()
      });
    } catch (error){
      console.error("Error adding child document:", error);
      throw error;
    }
  };

  const getChildData = async (userId) => {
    try {
      const q = query(
        collection(db, 'children'), 
        where('userId', '==', userId)
      );
  
      const querySnapshot = await getDocs(q);
  
      // Return an array of child documents
      const children =  querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      console.log('Fetched Children:', children);

      return children
    } catch(error) {
      console.error("Error getting child document:", error);
      return [];
    }
  };

  return { 
    currentUser, 
    userData,
    childData,
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