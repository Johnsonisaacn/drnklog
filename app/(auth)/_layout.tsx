import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Redirect, Stack } from 'expo-router';
import { onAuthStateChanged, User } from 'firebase/auth';
import { firebaseAuth } from '../../firebaseConfig'; // Adjust the path as needed

export default function AppLayout() {
  const [user, setUser] = useState<User | null>(null); // Track the user's authentication state
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  // Show a loading indicator while checking the authentication state
  if (loading) {
    return <Text>Loading...</Text>;
  }

  // Redirect to the sign-in page if the user is not authenticated
  if (!user) {
    return <Redirect href="/login" />;
  }

  // Render the app's stack navigation if the user is authenticated
  return <Stack screenOptions={{headerShown: false}} />;
}
