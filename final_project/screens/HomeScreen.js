import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { fetchRecentBooks } from '../utils/api';
import BookGridCard from '../components/BookGridCard';

export default function HomeScreen({ navigation }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    const data = await fetchRecentBooks();
    setBooks(data);
  };

  return (
    <View style={{ flex: 1, padding: 5 }}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <BookGridCard
            book={item}
            onPress={() => navigation.navigate('BookDetails', { book: item })}
          />
        )}
      />
    </View>
  );
}
