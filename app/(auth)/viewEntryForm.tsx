import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { firebaseDB } from '@/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../AuthContext';
import { useLocalSearchParams, useRouter, Link } from 'expo-router';
import { globalStyles } from '../styles/styles';
import { beverageConfig  } from './beverageConfig';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

type ViewEntryFormProps = {
    beverageType: string;
    drinkId: string;
  };

const ViewEntryForm = ({ beverageType, drinkId }: ViewEntryFormProps) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  // Get the fields for the selected beverage type
  const fields = beverageConfig[beverageType] || [];

  useEffect(() => {
    const fetchEntry = async () => {
      const entryDocRef = doc(firebaseDB, 'users', user.uid, beverageType, drinkId);
      const entryDocSnap = await getDoc(entryDocRef);

      if (entryDocSnap.exists()) {
        setFormData(entryDocSnap.data() as { [key: string]: string });
      }
    };

    fetchEntry();
  }, [beverageType, drinkId, user]);


  return (
    <ScrollView contentContainerStyle={globalStyles.viewContainer}>
      {fields.map((field) => (
        <View key={field.key}>
          <Text style={globalStyles.viewFields}>{field.placeholder}</Text> 
          <Text style={globalStyles.viewValues}>{formData[field.key] || ' '}</Text>

        </View>
      ))}      
    </ScrollView>
  );
};


export default ViewEntryForm;