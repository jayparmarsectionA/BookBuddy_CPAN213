import React, { useContext } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { BookContext } from '../context/BookContext';
import * as Progress from 'react-native-progress';

export default function ProgressScreen() {
  const { savedBooks } = useContext(BookContext);

  // Filter only books that have progress > 0
  const booksWithProgress = savedBooks.filter(
  (b) => typeof b.volumeInfo?.progress === 'number' && b.volumeInfo.progress > 0
);


  if (booksWithProgress.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Select a book to view progress.</Text>
      </View>
    );
  }

  const renderBook = ({ item }) => {
    const { title, authors, imageLinks, pageCount } = item.volumeInfo;
    const totalPages = pageCount || 100; // fallback if pageCount not available
    const progressValue = Math.min(item.volumeInfo.progress / totalPages, 1);

    return (
      <View style={styles.card}>
        <Image
          source={{ uri: imageLinks?.thumbnail }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.author}>{authors?.join(', ')}</Text>
          <View style={styles.progressContainer}>
            <Progress.Bar
              progress={progressValue}
              width={null}
              height={8}
              color="#4cafef"
              unfilledColor="#ccc"
              borderWidth={0}
            />
            <Text style={styles.pageText}>
              {item.volumeInfo.progress} / {totalPages} pages
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={booksWithProgress}
      renderItem={renderBook}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  list: {
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  thumbnail: {
    width: 90,
    height: 130,
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  progressContainer: {
    marginTop: 'auto',
  },
  pageText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});
