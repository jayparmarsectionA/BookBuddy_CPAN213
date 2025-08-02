import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Alert,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { BookContext } from '../context/BookContext';
import BookCard from '../components/BookCard';

const BooksScreen = ({ setGuestMode }) => {
  const { savedBooks } = useContext(BookContext);
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: async () => {
          try {
            if (auth.currentUser) {
              await signOut(auth);
            } else {
              // Guest: turn off guestMode
              setGuestMode(false);
            }

            navigation.reset({
              index: 0,
              routes: [{ name: 'Auth' }],
            });
          } catch (err) {
            Alert.alert('Logout Error', err.message);
          }
        },
      },
    ]);
  };



  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>My Books</Text>
          <Button title="Logout" color="#e63946" onPress={handleLogout} />
          {/* onPress={() => navigation.navigate('Tabs', {
  screen: 'Progress',
  params: { bookId: item.id },
})} */}

        </View>

        {savedBooks.length === 0 ? (
          <Text style={styles.empty}>You haven't saved any books yet.</Text>
        ) : (
          <FlatList
            data={savedBooks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <BookCard book={item} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: { flex: 1, padding: 16 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: { fontSize: 24, fontWeight: 'bold' },
  empty: { marginTop: 50, textAlign: 'center', fontSize: 16, color: 'gray' },
});

export default BooksScreen;
