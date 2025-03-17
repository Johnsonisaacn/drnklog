import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { getAuth, signOut } from 'firebase/auth';
import Svg, { Path } from 'react-native-svg';
import { globalStyles } from '../styles/styles';

const NavigationBar = () => {
  const router = useRouter();
  const auth = getAuth();
  const currentRoute = usePathname();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.replace('/landing'); // Redirect to login screen after sign-out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  const handleBack = async () => {
    if (currentRoute != '/home') {
      router.back()
    }
  }
  const handleHome = async () => {
    if (currentRoute != '/home') {
      router.replace('/home')
    }
  }

  return (
    <View style={globalStyles.navigatorBarContainer}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => handleBack()} style={globalStyles.navigatorBarButton}>
        <Svg width="24" height="24" viewBox="0 0 24 24">
          <Path
            d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
            fill="black"
          />
        </Svg>
      </TouchableOpacity>

      {/* Home Button */}
      <TouchableOpacity onPress={() => handleHome()} style={globalStyles.navigatorBarButton}>
        <Svg width="24" height="24" viewBox="0 0 24 24">
          <Path
            d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z"
            fill="black"
          />
        </Svg>
      </TouchableOpacity>

      {/* Sign Out Button */}
      <TouchableOpacity onPress={handleSignOut} style={globalStyles.navigatorBarButton}>
        <Svg width="24" height="24" viewBox="0 0 24 24">
          <Path
            d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"
            fill="black"
          />
        </Svg>
      </TouchableOpacity>
    </View>
  );
};


export default NavigationBar;