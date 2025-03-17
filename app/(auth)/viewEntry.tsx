import React from 'react'
import { Text, Alert,  View, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { globalStyles } from '../styles/styles';
import { Link, Redirect, useRouter, useLocalSearchParams } from 'expo-router';
import { useAuth } from '../AuthContext';
import ViewEntryForm from './viewEntryForm';
import { firebaseDB } from '@/firebaseConfig';
import { deleteDoc, doc } from 'firebase/firestore';
import NavigationBar from './navigatorBar';




const ViewEntry = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { type, drinkId } = useLocalSearchParams<{ type: string; drinkId: string }>();

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (!user) {
    return <Redirect href="../login" />;
  }


  const handleDelete = async (drinkId: string) => {
    try {
      const entryDocRef = doc(firebaseDB, 'users', user.uid, type, drinkId);
      await deleteDoc(entryDocRef);
      // Refresh the list after deletion
      router.replace(`/(auth)/myLog?type=${type}`);
    } catch (error) {
      console.error('Error deleting entry:', error);
      Alert.alert('Error', 'Failed to delete entry. Please try again.');
    }
  }



  return(
    
    <LinearGradient
    // Background Linear Gradient
    colors={['rgba(0,0,0,1)', 'transparent']}
    start={{x: 0, y: 0}}
    end={{x: 1, y: 1}}
    style={globalStyles.background}
    >
      <NavigationBar/>
      
    <Text style={globalStyles.title_text}>drnklog {"\n"} {type} </Text>


 
    <View style={{flex: 3}}>
    <ViewEntryForm beverageType={type} drinkId={drinkId} />
    </View>
    <View style={globalStyles.viewEntryButtonContainer}>
    <TouchableOpacity
      style={globalStyles.deleteButton}
      onPress={() => handleDelete(drinkId)}    
    ><Text style={globalStyles.deleteButtonText}>delete entry</Text></TouchableOpacity>
    <Link
      href={{
        pathname: './editEntry',
        params: { type: type, drinkId: drinkId },
      }}
      style={globalStyles.editButton}
      >
      <Text>edit entry</Text>
    </Link>
    </View>
    
    
    </LinearGradient>
    
  );
 
}
  
export default ViewEntry