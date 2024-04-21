import { Text, View, Pressable, StyleSheet } from 'react-native';
import React from 'react';

export const FavoriteList = ({ navigation }) => {
  return(
      <Pressable onPress={() => navigation.navigate('Favorited events')}>
        {({ pressed })  => (
          <View style={[FavoriteListStyles.favView, pressed && FavoriteListStyles.clicked]}>
            <Text style={{color: 'white', fontFamily: 'RobotoCondensed-Regular'}}>Favorites</Text>
          </View>
        )}
      </Pressable>
  );
};

  const FavoriteListStyles = StyleSheet.create({
    favView: {
      height: 40,
      width: 80,
      backgroundColor: 'maroon',
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    clicked: {
      backgroundColor: 'rgba(87, 0, 0, 1.0)',
    },  
  });