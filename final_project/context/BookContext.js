import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [savedBooks, setSavedBooks] = useState([]);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    const jsonValue = await AsyncStorage.getItem('@saved_books');
    if (jsonValue != null) {
      setSavedBooks(JSON.parse(jsonValue));
    }
  };

  const saveBooks = async (books) => {
    setSavedBooks(books);
    await AsyncStorage.setItem('@saved_books', JSON.stringify(books));
  };

  const addBook = (book) => {
    if (!savedBooks.find((b) => b.id === book.id)) {
      const updated = [...savedBooks, { ...book, progress: 0, status: 'To Read' }];
      saveBooks(updated);
    }
  };

  const updateProgress = (bookId, progress, status) => {
    const updated = savedBooks.map((b) =>
      b.id === bookId ? { ...b, progress, status } : b
    );
    saveBooks(updated);
  };

  return (
    <BookContext.Provider value={{ savedBooks, addBook, updateProgress }}>
      {children}
    </BookContext.Provider>
  );
};