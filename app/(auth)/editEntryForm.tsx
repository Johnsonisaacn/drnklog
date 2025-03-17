import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import { firebaseDB } from '@/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../AuthContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { globalStyles } from '../styles/styles';
import { beverageConfig } from './beverageConfig';



type EditEntryFormProps = {
  beverageType: string;
  drinkId: string;
  onSuccess: () => void;
};

const EditEntryForm = ({ beverageType, drinkId, onSuccess }: EditEntryFormProps) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    // Validate required fields
    for (const field of fields) {
      if (field.label == 'Maker' && !formData[field.key]) {
        Alert.alert('Error', `Please fill in the ${field.label} field.`);
        return;
      }
      if (field.label == 'Name' && !formData[field.key]) {
        Alert.alert('Error', `Please fill in the ${field.label} field.`);
        return;
      }
    }

    setIsSubmitting(true);

    try {
      // Update the entry in Firestore
      const entryDocRef = doc(firebaseDB, 'users', user.uid, beverageType, drinkId);
      await updateDoc(entryDocRef, formData);

      // Notify the parent component of success
      onSuccess();
    } catch (error) {
      console.error('Error updating entry:', error);
      Alert.alert('Error', 'Failed to update entry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={globalStyles.inputContainer}>
      {fields.map((field) => (
        <View key={field.key}>
          <TextInput
            style={globalStyles.entryFields}
            placeholder={field.placeholder}
            placeholderTextColor='rgb(140, 140, 140)'
            value={formData[field.key] || ''}
            onChangeText={(text) => handleChange(field.key, text)}
            keyboardType={field.type === 'number' ? 'numeric' : 'default'}
          />
        </View>
      ))}
      <Button
        title={isSubmitting ? 'Updating...' : 'Update Entry'}
        onPress={handleSubmit}
        disabled={isSubmitting}
      />
    </ScrollView>
  );
};


export default EditEntryForm;