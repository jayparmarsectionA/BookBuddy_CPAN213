import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Image, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
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

  const screenWidth = Dimensions.get('window').width;
  const bookWidth = (screenWidth - 40) / 2;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>📚 Start Reading</Text>

      <FlatList
        style={styles.body}
        data={books}
        keyExtractor={(item) => item.id}
        numColumns={2}
        scrollEnabled={false}
        contentContainerStyle={{ gap: 20 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <BookGridCard
            book={item}
            onPress={() => navigation.navigate('BookDetails', { book: item })}
          />
        )}
      />

      <View style={styles.goalCard}>
        <Text style={styles.goalText}>🎯 Daily Goal: 20 pages</Text>
        <Text style={styles.goalSubText}>Keep your streak going!</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 50,
    backgroundColor: '#eaeaecff',
  },
  body:{
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    marginBottom: 20,
  },
  bookCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  bookImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
  },
  goalCard: {
    marginTop: 30,
    paddingBottom: 100,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    alignItems: 'center',
  },
  goalText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  goalSubText: {
    fontSize: 14,
    color: '#000',
    marginTop: 6,
  },
});
