import React, { useEffect, useState } from 'react';
import { Text, FlatList, ActivityIndicator, View, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { globalStyles } from '../styles/styles';
import { Link, Redirect, useLocalSearchParams } from 'expo-router';
import { useAuth } from '../AuthContext';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { firebaseDB } from '@/firebaseConfig';
import { getDocs, collection, query, startAfter, limit, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { RectButton } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import NavigationBar from './navigatorBar';



type ItemData = {
  maker: string;
  name: string;
  id: string;
};

const fetchDrinks = async (beverageType: string, userId: string, lastVisible = null) => {
  try {
    let drinksQuery;
    if (lastVisible) {
      drinksQuery = query(
        collection(firebaseDB, 'users', userId, beverageType),
        orderBy('name'),
        startAfter(lastVisible),
        limit(10)
      );
    } else {
      drinksQuery = query(
        collection(firebaseDB, 'users', userId, beverageType),
        orderBy('name'),
        limit(10)
      );
    }

    const querySnapshot = await getDocs(drinksQuery);
    const drinks: ItemData[] = [];
    querySnapshot.forEach((doc) => {
      drinks.push({ id: doc.id, ...doc.data() } as ItemData);
    });

    return {
      drinks,
      lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1],
    };
  } catch (error) {
    console.error('Error fetching drinks:', error);
    return { drinks: [], lastVisible: null };
  }
};

const MyLog = () => {
  const { user, loading } = useAuth();
  const { type } = useLocalSearchParams<{ type: string }>();
  const [drinks, setDrinks] = useState<ItemData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (!user) {
    return <Redirect href="../login" />;
  }

  useEffect(() => {
    if (user && type) {
      fetchDrinks(type, user.uid).then(({ drinks, lastVisible }) => {
        setDrinks(drinks);
        setLastVisible(lastVisible);
        setIsLoading(false);
      });
    }
  }, [user, type]);

  const loadMoreDrinks = async () => {
    if (isFetchingMore || !lastVisible) return;

    setIsFetchingMore(true);
    const { drinks: newDrinks, lastVisible: newLastVisible } = await fetchDrinks(type, user.uid, lastVisible);
    setDrinks((prevDrinks) => [...prevDrinks, ...newDrinks]);
    setLastVisible(newLastVisible);
    setIsFetchingMore(false);
  };

  const handleDelete = async (drinkId: string) => {
    try {
      const entryDocRef = doc(firebaseDB, 'users', user.uid, type, drinkId);
      await deleteDoc(entryDocRef);
      // Refresh the list after deletion
      const { drinks } = await fetchDrinks(type, user.uid);
      setDrinks(drinks);
    } catch (error) {
      console.error('Error deleting entry:', error);
      Alert.alert('Error', 'Failed to delete entry. Please try again.');
    }
  };

  const renderRightActions = (drinkId: string) => {
    return (
      <RectButton
        style={globalStyles.swipeDeleteButton}
        onPress={() => handleDelete(drinkId)}
      >
        <Text style={globalStyles.swipeDeleteButtonText}>Delete</Text>
      </RectButton>
    );
  };

  const renderItem = ({ item }: { item: ItemData }) => {

    return (
      <Swipeable
        renderRightActions={() => renderRightActions(item.id)}
        rightThreshold={40} // Adjust sensitivity of the swipe
      >
        <View>
          <Link
            href={{
              pathname: './viewEntry',
              params: { type: type, drinkId: item.id },
            }}
            style={[globalStyles.item]}
          ><Text numberOfLines={2} ellipsizeMode='tail'>
          {item.maker} {item.name}</Text>
          </Link>
        </View>
      </Swipeable>
    );
  };

  return (
    <GestureHandlerRootView style={{flex:1}}>
    <LinearGradient
      colors={['rgba(0,0,0,1)', 'transparent']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={globalStyles.background}
    >
      <NavigationBar/>
      <Text style={globalStyles.title_text}>drnklog {"\n"}{type}</Text>
      <SafeAreaProvider style={{ backgroundColor: 'transparent', flex: 3 }}>
        <SafeAreaView style={{ backgroundColor: 'transparent', flex: 4 }}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <FlatList
              data={drinks}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              onEndReached={loadMoreDrinks}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                isFetchingMore ? <ActivityIndicator size="small" color="#0000ff" /> : null
              }
            />
          )}
        </SafeAreaView>
      </SafeAreaProvider> 
      <Link
            style={globalStyles.addButton}
            href={{ pathname: './addEntry', params: { type: type } }}
          >
            <Text>add</Text>
          </Link>
    </LinearGradient>
    </GestureHandlerRootView>
  );
};

export default MyLog;