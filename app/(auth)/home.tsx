import React from 'react'
import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { globalStyles } from '../styles/styles';
import { Link, Redirect, usePathname } from 'expo-router';
import { useAuth } from '../AuthContext';
import NavigationBar from './navigatorBar';
import {FontAwesome, FontAwesome6 } from '@expo/vector-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBeerMugEmpty, faWineGlass, faMugHot } from '@fortawesome/free-solid-svg-icons';




const Home = () => {
  const {user, loading} = useAuth();

  if (loading) {
    return <Text>Loading...</Text>
  }
  if (!user) {
    return <Redirect href="../login"/>;
  }
  
  console.log(usePathname());
  

  return(
    <LinearGradient
    // Background Linear Gradient
    colors={['rgba(0,0,0,1)', 'transparent']}
    start={{x: 0, y: 0}}
    end={{x: 1, y: 1}}
    style={globalStyles.background}
    >
    <NavigationBar/>
    <Text style={globalStyles.title_text}>drnklog</Text>


    <View style={globalStyles.homeContainer}>
    
    <Link href={{pathname: "./myLog", params: {type: 'coffee'}}} style={{margin: 12}} ><LinearGradient
    colors={['rgba(123, 152, 234, 0.865)', 'rgba(202, 83, 119, 0.925)']}
    start={{x: 1, y: 0}}
    end={{x: 0, y: 1}}
    style={globalStyles.home}
    >
      <FontAwesomeIcon icon={faMugHot} size={32} style={{position: 'absolute', left: 20}}/>
      <Text style={globalStyles.homeText}>coffee</Text></LinearGradient></Link>

    <Link href={{pathname: "./myLog", params: {type: 'beer'}}} style={{margin: 12}} ><LinearGradient
    colors={['rgba(123, 152, 234, 0.865)', 'rgba(202, 83, 119, 0.925)']}
    start={{x: 1, y: 0}}
    end={{x: 0, y: 1}}
    style={globalStyles.home}
    >
      <FontAwesomeIcon icon={faBeerMugEmpty} size={32} style={{position: 'absolute', left: 20}}/>    
      <Text style={globalStyles.homeText}>beer</Text></LinearGradient></Link>

  <Link href={{pathname: "./myLog", params: {type: 'wine'}}} style={{margin: 12}} ><LinearGradient
    colors={['rgba(123, 152, 234, 0.865)', 'rgba(202, 83, 119, 0.925)']}
    start={{x: 1, y: 0}}
    end={{x: 0, y: 1}}
    style={globalStyles.home}
    >
      <FontAwesomeIcon icon={faWineGlass} size={32} style={{position: 'absolute', left: 20}}/>    
      <Text style={globalStyles.homeText}>wine</Text></LinearGradient></Link>
  </View>


    </LinearGradient>
  );
 
}
  
export default Home