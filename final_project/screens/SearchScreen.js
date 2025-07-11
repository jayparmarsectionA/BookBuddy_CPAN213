import React, { useState } from 'react';
import { View, TextInput, FlatList } from 'react-native';
import { searchBooks } from '../utils/api';
import BookCard from '../components/BookCard';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const data = await searchBooks(query);
    setResults(data);
  };

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="Search books by title or author"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
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
