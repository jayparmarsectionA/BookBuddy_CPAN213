// Updated BookDetailsScreen.js
import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, Linking, ScrollView, SafeAreaView, Button} from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { BookContext } from '../context/BookContext';


export default function BookDetailsScreen({ route }) {
  const { book } = route.params;
  const navigation = useNavigation();
  const { addBook } = useContext(BookContext);

  const {
    title,
    subtitle,
    authors,
    publishedDate,
    description,
    pageCount,
    imageLinks,
  } = book.volumeInfo || {};

  const sampleLink = book.accessInfo?.epub?.acsTokenLink;
  const buyLink = book.saleInfo?.buyLink;

  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#a85600', paddingTop: 10}}>
    <LinearGradient colors={['#a85600', '#4a2600']} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>

        {/* Top Action Row */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={28} color="orange" style={{ backgroundColor: '#fff', borderRadius: 20, padding: 4 }} />
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity onPress={() => addBook(book)}>
              <Ionicons name="add" size={24} color="orange" style={{ backgroundColor: '#fff', borderRadius: 20, padding: 4 }} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Entypo name="dots-three-horizontal" size={24} color="orange" style={{ backgroundColor: '#fff', borderRadius: 20, padding: 4 }} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Book Cover */}
        <Image
          source={{ uri: imageLinks?.thumbnail }}
          style={{ width: 200, height: 300, alignSelf: 'center', borderRadius: 8, marginVertical: 20 }}
          resizeMode="cover"
        />

        {/* Title, Author */}
        <Text style={{ textAlign: 'center', color: '#fff', fontSize: 12, letterSpacing: 1 }}>{authors?.[0]?.toUpperCase()}</Text>
        <Text style={{ textAlign: 'center', color: '#fff', fontSize: 22, fontWeight: 'bold', marginTop: 4 }}>{title}</Text>
        {subtitle && <Text style={{ textAlign: 'center', color: '#ddd', fontSize: 16 }}>{subtitle}</Text>}

        {/* Metadata */}
        <Text style={{ color: '#fff', marginTop: 8, textAlign: 'center' }}>Book • {publishedDate} • {pageCount} Pages</Text>

        {/* Sample / Get Buttons */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 20 }}>
          <TouchableOpacity
            style={{ backgroundColor: '#fff', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20 }}
            onPress={() => sampleLink && Linking.openURL(sampleLink)}>
            <Text style={{ color: '#000' }}>Sample</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ backgroundColor: '#000', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 20 }}
            onPress={() => buyLink && Linking.openURL(buyLink)}>
            <Text style={{ color: '#fff' }}>Get</Text>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>From the Publisher</Text>
          <Text style={{ color: '#ddd', lineHeight: 20 }}>{description}</Text>
        </View>
         <View style={{ marginVertical: 10 }}>
        <Button
  title="Start Reading"
  onPress={() => navigation.navigate('ProgressInput', { bookId: book.id })}
/>

      </View>
      </ScrollView>
    </LinearGradient>
    </SafeAreaView>
  );
}
