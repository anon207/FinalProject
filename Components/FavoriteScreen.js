import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';

export const FavoritesScreen = ({ route }) => {
    const { favorites } = route.params;
    return(
      <ScrollView contentContainerStyle={FavoriteScreenStyles.defualtView}>
        {favorites.map((event, index) => (
          <View key={index} style={[FavoriteScreenStyles.EventDisplay, (index === 0) && FavoriteScreenStyles.firstEvent]}>
            <Text style={{ fontFamily: 'RobotoCondensed-Bold' }}>{event.name}</Text>
            <Text style={{ fontFamily: 'RobotoCondensed-Bold' }}>{event.time}</Text>
            <Text style={{ fontFamily: 'RobotoCondensed-Bold' }}>{event.location}</Text>
            <View style={FavoriteScreenStyles.bottomBar} />
          </View>
        ))}
      </ScrollView>
    );
  };

const FavoriteScreenStyles = StyleSheet.create({
    defualtView: {
      width: 390,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    EventDisplay: {
      width: 385,
      height: 100,
      borderWidth: 1,
      borderColor: 'lightgray',
      marginBottom: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    firstEvent: {
      height: 100,
      borderWidth: 1,
      borderColor: 'lightgray', 
      marginBottom: 20,
      marginTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bottomBar: {
      width: 385,
      height: 10,
      borderBottomColor: 'white',
      borderColor: 'lightgray',
      borderWidth: 1,
      position: 'absolute',
      bottom: 0
    },
});