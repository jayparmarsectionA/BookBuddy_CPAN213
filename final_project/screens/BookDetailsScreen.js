import React, { useContext } from 'react';
import { View, Text, Image, Button, ScrollView } from 'react-native';
import { BookContext } from '../context/BookContext';

export default function BookDetailsScreen({ route, navigation }) {
  const { book } = route.params;
  const { addBook } = useContext(BookContext);

  const thumbnail = book.volumeInfo.imageLinks?.thumbnail;

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      {thumbnail && <Image source={{ uri: thumbnail }} style={{ width: 120, height: 180, alignSelf: 'center' }} />}
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 10 }}>{book.volumeInfo.title}</Text>
      <Text style={{ marginBottom: 10 }}>{book.volumeInfo.authors?.join(', ')}</Text>
      <Text>{book.volumeInfo.description}</Text>
      <View style={{ marginVertical: 10 }}>
        <Button title="Star & Start Reading" onPress={() => {
          addBook({ id: book.id, volumeInfo: book.volumeInfo });
          navigation.navigate('Progress', { bookId: book.id });
        }} />
      </View>
    </ScrollView>
  );
}
