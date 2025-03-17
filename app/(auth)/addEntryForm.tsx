import React, { useState } from 'react';
import { View, TextInput, Button, Alert, ScrollView } from 'react-native';
import { firebaseDB } from '@/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../AuthContext';
import { globalStyles } from '../styles/styles';
import { beverageConfig } from './beverageConfig';

type AddEntryFormProps = {
  beverageType: string;
  onSuccess: () => void; // Callback to notify the parent component of success
};

const AddEntryForm = ({ beverageType, onSuccess }: AddEntryFormProps) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get the fields for the selected beverage type
  const fields = beverageConfig[beverageType] || [];

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
      // Add the new entry to Firestore
      const entriesCollectionRef = collection(firebaseDB, 'users', user.uid, beverageType);
      await addDoc(entriesCollectionRef, {
        ...formData,
        createdAt: new Date(), // Optional: Add a timestamp
      });

      // Clear the form and notify the parent component
      setFormData({});
      onSuccess();
    } catch (error) {
      console.error('Error adding entry:', error);
      Alert.alert('Error', 'Failed to add entry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={globalStyles.inputContainer}>
      {fields.map((field) => (
        <View key={field.key} >

          <TextInput
            style={globalStyles.entryFields}
            placeholder={field.placeholder}
            placeholderTextColor='rgb(140,140,140)'
            value={formData[field.key] || ''}
            onChangeText={(text) => handleChange(field.key, text)}
            keyboardType={field.type === 'number' ? 'numeric' : 'default'}
          />
        </View>
      ))}
      <Button
        color="rgb(50, 150, 40)"
        title={isSubmitting ? 'Submitting...' : 'Add Entry'}
        onPress={handleSubmit}
        disabled={isSubmitting}
      />
    </ScrollView>
  );
};



export default AddEntryForm;