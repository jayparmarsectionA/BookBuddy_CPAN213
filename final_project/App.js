import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, View } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import BookDetailsScreen from './screens/BookDetailsScreen';
import BooksScreen from './screens/BooksScreen';
import ProgressScreen from './screens/ProgressScreen';
import AuthStack from './navigation/AuthStack';

import { BookProvider } from './context/BookContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs({ setGuestMode }) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="search" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="MyBooks"
        children={() => <BooksScreen setGuestMode={setGuestMode} />} // ✅ pass prop
        options={{
          title: 'My Books',
          tabBarIcon: ({ color, size }) => <Ionicons name="book" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Progress"
        component={ProgressScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="stats-chart" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [guestMode, setGuestMode] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setChecking(false);
    });
    return unsubscribe;
  }, []);

  // 🧹 Reset guest mode if no real user is logged in
  useEffect(() => {
    if (!user) setGuestMode(false);
  }, [user]);

  const isLoggedIn = user || guestMode;

  if (checking && !guestMode) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <BookProvider isGuest={guestMode}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isLoggedIn ? (
            <>
              <Stack.Screen name="Tabs">
                {(props) => <Tabs {...props} setGuestMode={setGuestMode} />}
              </Stack.Screen>
              <Stack.Screen name="BookDetails" component={BookDetailsScreen} />
            </>
          ) : (
            <Stack.Screen name="Auth">
              {(props) => <AuthStack {...props} setGuestMode={setGuestMode} />}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </BookProvider>
  );
}
