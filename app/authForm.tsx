import React, { useState } from 'react'
import { Text, Pressable, TextInput } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { globalStyles } from './styles/styles';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';


const AuthForm = ({ type, onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    return (
      <LinearGradient
        colors={['rgba(0,0,0,1)', 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={globalStyles.background}
      >
        <Text style={globalStyles.title_text}>drnklog</Text>
        <SafeAreaProvider style={globalStyles.loginForm}>
          <SafeAreaView>
            <TextInput
              value={email}
              style={globalStyles.input}
              placeholder="email"
              autoCapitalize="none"
              onChangeText={setEmail}
            />
            <TextInput
              secureTextEntry
              value={password}
              style={globalStyles.input}
              placeholder="password"
              autoCapitalize="none"
              onChangeText={setPassword}
            />
            <Pressable style={globalStyles.login_button} onPress={() => onSubmit(email, password)}>
              <Text style={globalStyles.button_text}>{type === 'login' ? 'log in' : 'sign up'}</Text>
            </Pressable>
            <Pressable style={globalStyles.backButton} onPress={() => router.replace('/landing')}>
                <Text style={globalStyles.button_text}>back</Text>
            </Pressable>
          </SafeAreaView>
        </SafeAreaProvider>
      </LinearGradient>
    );
  };
  
export default AuthForm;