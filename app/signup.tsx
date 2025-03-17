import React, { useState } from 'react'
import { firebaseAuth } from '../firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import AuthForm from './authForm';

const signup = () => {
  const auth = firebaseAuth;
  const router = useRouter();

  const handleSignup = async (email, password) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      router.replace('./(auth)/home')
    }
    catch(error: any) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'sign up Failed',
        text2: error.message,
      });
    }
  }

  return <AuthForm type="signup" onSubmit={handleSignup}/>;
}

export default signup