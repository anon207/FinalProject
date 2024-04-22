import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import { FavoritesScreen } from './Components/FavoriteScreen';
import { HomeScreen } from './Components/HomeScreen';
import { FavoritesContext } from './Components/FavoriteContext';
import SportsData from './SportsData.json';

export default function App() {
  const [favorites, setFavorites] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState(SportsData);

  const [fontsLoaded] = useFonts({
    'RobotoCondensed-Bold': require('./assets/fonts/RobotoCondensed-Bold.ttf'),
    'RobotoCondensed-Regular': require('./assets/fonts/RobotoCondensed-Regular.ttf')
  });

  if (!fontsLoaded) {
    return null;
  }

  const Stack = createStackNavigator();

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites, filteredEvents, setFilteredEvents }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={navigationStyles}>
          <Stack.Screen name="Composite Calendar" component={HomeScreen}/>
          <Stack.Screen name="Favorited events" component={FavoritesScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesContext.Provider>
  );
}

const navigationStyles = StyleSheet.create({
    headerRight: () => (
      <Image
        source={require('./assets/Icons/maroon.png')}
        style={{ width: 75, height: 75, marginRight: 10, marginTop: 8, }}
        resizeMode="contain"
      />
    ),
    headerStyle: {
      backgroundColor: 'maroon',
    },
    headerTintColor: '#fff', 
    headerTitleStyle: {
      marginBottom: 15,
      fontFamily: 'RobotoCondensed-Bold', 
    },
});