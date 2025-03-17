import React from 'react'
import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { globalStyles } from './styles/styles';
import { Link } from 'expo-router';
import { useAuth } from './AuthContext';
import { Redirect } from 'expo-router';


const Landing = () => {
  const { user, loading} = useAuth();

  if (loading) {
    return <Text>Loading...</Text>; // Show a loading indicator
  } 

  if (user) {
    return <Redirect href="./(auth)/home" />; 
  }

    return(
      <LinearGradient
      // Background Linear Gradient
      colors={['rgba(0,0,0,1)', 'transparent']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={globalStyles.background}
    >
<Text style={globalStyles.title_text}>drnklog</Text>
<View style={globalStyles.loginForm}>
<Link href="./login" style={globalStyles.login_button}>log in</Link>
<Link href="./signup" style={globalStyles.signup_button}>sign up</Link>
</View>


</LinearGradient>
  );
};
  
export default Landing;

