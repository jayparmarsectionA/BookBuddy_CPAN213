import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function BookCard({ book, onPress }) {
  const thumbnail = book.volumeInfo.imageLinks?.thumbnail;
  return (
    <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', margin: 10 }}>
      {thumbnail && <Image source={{ uri: thumbnail }} style={{ width: 60, height: 90 }} />}
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={{ fontWeight: 'bold' }}>{book.volumeInfo.title}</Text>
        <Text>{book.volumeInfo.authors?.join(', ')}</Text>
      </View>
    </TouchableOpacity>
  );
}