import React from 'react';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { globalStyles } from '../styles/styles';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '../AuthContext';
import { Redirect } from 'expo-router';
import EditEntryForm from './editEntryForm';
import NavigationBar from './navigatorBar';

const EditEntry = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { type, drinkId } = useLocalSearchParams<{ type: string; drinkId: string }>();

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (!user) {
    return <Redirect href="../login" />;
  }

  const handleSuccess = () => {
    router.replace(`/(auth)/myLog?type=${type}`);
  };

  return (
    <LinearGradient
      colors={['rgba(0,0,0,1)', 'transparent']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={globalStyles.background}
    >
      <NavigationBar/>
      <Text style={globalStyles.title_text}>drnklog {"\n"} {type}</Text>

      <View style={{ flex: 3 }}>
        <EditEntryForm beverageType={type} drinkId={drinkId} onSuccess={handleSuccess} />
      </View>
    </LinearGradient>
  );
};

export default EditEntry;