import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function BookGridCard({ book, onPress }) {
  const thumbnail = book.volumeInfo.imageLinks?.thumbnail;
  const title = book.volumeInfo.title;
  const authors = book.volumeInfo.authors?.join(', ') || 'Unknown Author';
  const publishedDate = book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate.substring(0, 4) : 'N/A';
  const averageRating = book.volumeInfo.averageRating || 'N/A';

  return (
    <TouchableOpacity onPress={onPress} style={{ flex: 1, margin: 5 }}>
      {thumbnail && <Image source={{ uri: thumbnail }} style={{ width: '100%', height: 150 }} />}
      <View style={{ flexDirection: 'row', marginTop: 5 }}>
        <View style={{ flex: 3 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{title}</Text>
          <Text style={{ fontSize: 12 }}>{authors}</Text>
          <Text style={{ fontSize: 12 }}>Year: {publishedDate}</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 12 }}>⭐ {averageRating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
