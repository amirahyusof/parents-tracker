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
  serverTimestamp, 
  addDoc
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
      return childDocId;
    } catch (error){
      console.error("Error adding child document:", error);
      throw error;
    }
  };

  const getChildData = async (userId) => {
    try {
      const q = query(
        collection(db, 'children'), 
        where ('userId', '==', userId)
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

  const createTask = async ( taskData, childId) => {
    try {
      const taskRef = await addDoc(collection(db, 'tasks'), {
        ...taskData, 
        childId: childId,
        status: "undone",
        createdAt: serverTimestamp()
      });
      return taskRef.id;

    } catch (error){
      console.error('Error adding task:', error)
    }
  };

  const getTasks = async (childId) => {
    if (!childId) {
      console.error('No child ID provided');
      return [];
    }
  
    try {
      console.log('Fetching tasks for childId:', childId);
  
      const q = query(
        collection(db, 'tasks'),
        where('childId', '==', childId)
      );
  
      const querySnapshot = await getDocs(q);
  
      // Log the number of documents found
      console.log('Number of tasks found:', querySnapshot.docs.length);
  
      const tasks = querySnapshot.docs.map((doc) => {
        const taskData = doc.data();
        console.log('Individual Task:', {
          id: doc.id,
          ...taskData
        });
        return {
          id: doc.id,
          ...taskData
        };
      });
  
      return tasks;
    } catch (error) {
      console.error('Detailed error fetching tasks:', {
        message: error.message,
        code: error.code,
        stack: error.stack
      });
      throw error;
    }
  };

  const updateTask = async (taskId, updatedData) => {
    try {
      const taskRef = doc(db, 'tasks', taskId);
      await updateDoc(taskRef, {
        ...updatedData,
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  };

  const getTaskById = async (taskId) => {
    try {
      const taskRef = doc(db, 'tasks', taskId);
      const taskSnapshot = await getDoc(taskRef);
  
      if (!taskSnapshot.exists()) {
        throw new Error('Task not found');
      }
  
      return {
        id: taskSnapshot.id,
        ...taskSnapshot.data()
      };
    } catch (error) {
      console.error('Error fetching task by ID:', error);
      throw error;
    }
  };

  const getAllUndoneTask = async (userId) => {
    try{
      const userChildren = await getChildData(userId);

      if(!userChildren || userChildren.length === 0) {
        return []
      }

      const undoneTasks = [];

      //fetch tasks for ecah child
      for (const child of userChildren){
        const q = query(
          collection(db, 'tasks'), 
          where ('childId', '==', child.id),
          where ('status', '==','undone'),
        );

        const querySnapshot = await getDocs(q)
        querySnapshot.docs.forEach((doc) => {
          undoneTasks.push({
            id: doc.id, 
            ...doc.data(),
            childName: child.childName, 
            childAvatar: child.imageUrl
          });
        });
      }

      return undoneTasks;
    } catch(error) {
      console.error("Error fetching undone tasks:", error)
      throw error;
    }
  }

  const deleteTask = async (taskId) => {
    try {
      const taskRef = doc( db, 'tasks', taskId);
      await deteleDoc(taskRef);
      return true
    } catch (error){
      console.error("Error delete task:", error);
      throw error;
    }
  }

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
    getChildData, 
    createTask,
    getTasks, 
    getAllUndoneTask,
    updateTask, 
    getTaskById, 
    deleteTask
  };
};