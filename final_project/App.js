import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import BookDetailsScreen from './screens/BookDetailsScreen';
import MyBooksScreen from './screens/MyBooksScreen';
import ProgressScreen from './screens/ProgressScreen';
import { BookProvider } from './context/BookContext';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ color, size }) => (<Ionicons name="home" color={color} size={size} />)}} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ tabBarIcon: ({ color, size }) => (<Ionicons name="search" color={color} size={size} />)}} />
      <Tab.Screen name="MyBooks" component={MyBooksScreen} options={{ title: 'My Books', tabBarIcon: ({ color, size }) => (<Ionicons name="book" color={color} size={size} />)}} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <BookProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
          <Stack.Screen name="BookDetails" component={BookDetailsScreen} options={{ title: 'Book Details' }} />
          <Stack.Screen name="Progress" component={ProgressScreen} options={{ title: 'Update Progress' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </BookProvider>
  );
}