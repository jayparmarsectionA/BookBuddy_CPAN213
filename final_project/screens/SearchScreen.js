import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList } from 'react-native';
import BookCard from '../components/BookCard';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=20`
        );
        const json = await response.json();
        setResults(json.items || []);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="Search books by title or author"
        value={query}
        onChangeText={setQuery}
        style={{ padding: 10, borderWidth: 1, margin: 10 }}
      />
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BookCard
            book={item}
            onPress={() => navigation.navigate('BookDetails', { book: item })}
          />
        )}
      />
    </View>
  );
}
