import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import ProgressForm from '../components/ProgressForm';
import { BookContext } from '../context/BookContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProgressInput({ route, navigation }) {
  const { bookId } = route.params;
  const { savedBooks, updateProgress } = useContext(BookContext);

  const book = savedBooks.find(b => b.id === bookId);

  if (!book) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <Text>Please add the book first before updating progress.</Text>
      </View>
    );
  }

  const handleSubmit = (progress) => {
    const status = progress > 0 ? 'Reading' : 'To Read';
    updateProgress(bookId, progress, status);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
    <View style={{ flex: 1 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, margin: 20 }}>
        {book.volumeInfo.title}
      </Text>
      <ProgressForm initialProgress={book.progress} onSubmit={handleSubmit} />
    </View>
    </SafeAreaView>
  );
}
