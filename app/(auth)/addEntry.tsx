import React from 'react'
import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { globalStyles } from '../styles/styles';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '../AuthContext';
import AddEntryForm from './addEntryForm';
import NavigationBar from './navigatorBar';




const AddEntry = () => {
  const {user, loading} = useAuth();
  const router = useRouter();

  if (loading) {
    return <Text>Loading...</Text>
  }
  if (!user) {
    return <Redirect href="../login"/>;
  }
  const { type } = useLocalSearchParams();
  const handleSuccess = () => {
    // Navigate back to the log page after a successful submission
    router.replace(`/(auth)/myLog?type=${type}`);
  };

  return(
    <LinearGradient
    // Background Linear Gradient
    colors={['rgba(0,0,0,1)', 'transparent']}
    start={{x: 0, y: 0}}
    end={{x: 1, y: 1}}
    style={globalStyles.background}
    >
    <NavigationBar/>
    <Text style={globalStyles.title_text}>drnklog {"\n"} add {type}</Text>

    <View style={{flex: 3}}>
      <AddEntryForm beverageType={type} onSuccess={handleSuccess}/>
    </View> 
    </LinearGradient>  
  );
} 
export default AddEntry