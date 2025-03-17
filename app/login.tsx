import React, { useState } from 'react'
import { firebaseAuth } from '../firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import AuthForm from './authForm';


const login = () => {
  const auth = firebaseAuth;
  const router = useRouter();
  
  const handleLogin = async (email, password) => {
    try{
      const user = await signInWithEmailAndPassword(auth, email, password);
      router.replace('./(auth)/home')
    } catch (error: any) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'log in failed',
        text2: error.message,
      })
    } 
    }
  
  return <AuthForm type="login" onSubmit={handleLogin}/>;
}

export default login;