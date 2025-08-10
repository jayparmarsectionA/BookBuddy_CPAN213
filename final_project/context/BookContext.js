import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, setDoc, getDocs, updateDoc, query } from 'firebase/firestore';
import { auth, db } from '../firebase';



export const BookContext = createContext();

export const BookProvider = ({ children, isGuest = false }) => {
  const [savedBooks, setSavedBooks] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isGuest) {
      setSavedBooks([]); // local only
    } else {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        if (currentUser) {
          loadBooks(currentUser.uid);
        } else {
          setSavedBooks([]);
        }
      });
      return unsubscribe;
    }
  }, [isGuest]);


  const loadBooks = async (uid) => {
  try {
    const q = query(collection(db, 'users', uid, 'books'));
    const snapshot = await getDocs(q);
    const books = snapshot.docs.map(doc => ({
      id: doc.id,
      volumeInfo: doc.data().volumeInfo
    }));
    setSavedBooks(books);
  } catch (err) {
    console.error("Error loading books:", err);
  }
};

const addBook = async (book) => {
  if (isGuest) {
    setSavedBooks((prevBooks) => {
      const exists = prevBooks.some((b) => b.id === book.id);
      return exists ? prevBooks : [...prevBooks, book];
    });
    return true; // success
  }

  if (!user) return false;

  try {
    const bookRef = doc(db, 'users', user.uid, 'books', book.id);
    await setDoc(bookRef, {
      id: book.id,
      volumeInfo: book.volumeInfo,
    });
    await loadBooks(user.uid);
    return true; // success
  } catch (error) {
    console.error("Error adding book:", error);
    return false;
  }
};

 
const updateProgress = async (bookId, progress, status) => {
  if (isGuest) {
    setSavedBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === bookId
          ? {
              ...book,
              volumeInfo: {
                ...book.volumeInfo,
                progress,
                status,
              },
            }
          : book
      )
    );
    return;
  }

  if (!user) return;

  try {
    const bookRef = doc(db, 'users', user.uid, 'books', bookId);
    await updateDoc(bookRef, {
      [`volumeInfo.progress`]: progress,
      [`volumeInfo.status`]: status,
    });
    await loadBooks(user.uid);
  } catch (err) {
    console.error('Error updating progress:', err);
  }
};



  return (
    <BookContext.Provider value={{ savedBooks, addBook, updateProgress }}>
      {children}
    </BookContext.Provider>
  );
};
