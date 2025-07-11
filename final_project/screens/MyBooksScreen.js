import React, { useContext } from 'react';
import { View, FlatList } from 'react-native';
import { BookContext } from '../context/BookContext';
import BookCard from '../components/BookCard';

export default function MyBooksScreen({ navigation }) {
  const { savedBooks } = useContext(BookContext);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={savedBooks}
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
