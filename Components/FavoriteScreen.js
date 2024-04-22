import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import React, { useContext } from 'react';
import { FavoritesContext } from './FavoriteContext';

export const FavoritesScreen = () => {
  const { favorites, setFavorites, filteredEvents, setFilteredEvents } = useContext(FavoritesContext);

  const toggleFavorite = async (event) => {
    const updatedEvents = filteredEvents.map(e => e.Id === event.Id ? { ...e, favorite: false } : e);
    setFavorites(prevFavorites => prevFavorites.filter(favorite => favorite.Id !== event.Id));
    setFilteredEvents(updatedEvents);
  };

  return(
    <ScrollView contentContainerStyle={FavoriteScreenStyles.defualtView}>
      <Pressable onPress={() => setFavorites([])}>
        {({ pressed }) => (
          <View style={[FavoriteScreenStyles.removeAll, pressed && FavoriteScreenStyles.pressedEvt]}>
            <Text style={{color: 'white', fontFamily: 'RobotoCondensed-Regular'}}>Unfavorite all</Text>
          </View>
        )}
      </Pressable>
      {favorites.length === 0 &&
        <View style={FavoriteScreenStyles.noEvents}>
          <Text style={{fontFamily: 'RobotoCondensed-Regular', fontSize: 24}}>
            You have no favorited events!
          </Text>
        </View>
      }
      {favorites.map((event, eventIndex) => (
        <View key={eventIndex} style={[FavoriteScreenStyles.EventDisplay, (eventIndex === 0) && FavoriteScreenStyles.firstEvent]}>
          {event.homeAway === 'Home' &&
            <View style={FavoriteScreenStyles.homeStyle} testID={`event-${eventIndex}-home-marker`}/>
          }
          <Text style={{ fontFamily: 'RobotoCondensed-Bold' }}>{event.name}</Text>
          <Text style={{ fontFamily: 'RobotoCondensed-Bold' }}>{event.time}</Text>
          <Text style={{ fontFamily: 'RobotoCondensed-Bold' }}>{event.location}</Text>
          <View style={FavoriteScreenStyles.bottomBar} />
          <Pressable
            key={event.Id}
            style={( (favorites.some(favorite => favorite.Id === event.Id)) ) ? FavoriteScreenStyles.Remove : FavoriteScreenStyles.favButton}
            onPress={() => toggleFavorite(event)}
            testID={`event-${eventIndex}-fav-button`}
          >
            <Text style={{ color: 'white', fontSize: 10, fontFamily: 'RobotoCondensed-Regular' }}>
              {( (favorites.some(favorite => favorite.Id === event.Id)) ) ? 'Unfavorite' : 'Favorite'}
            </Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
};

const FavoriteScreenStyles = StyleSheet.create({  
  pressedEvt: {
    backgroundColor: 'rgba(87, 0, 0, 1.0)',
  },
  noEvents: {
    width: 385,
    height: 800,
    alignItems: 'center'
  },
  removeAll: {
    width: 100,
    height: 50,
    backgroundColor: 'maroon',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
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
  homeStyle: {
    height: 100,
    width: 5,
    backgroundColor: 'maroon',
    alignSelf: 'flex-start',
    position: 'absolute',
    zIndex: 1,
  },
  favButton: {
    height: 32.5,
    width: 65, 
    backgroundColor: 'maroon',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    position: 'absolute',
    right: 5,
    top: 5,
  },
  Remove: {
    height: 32.5,
    width: 65, 
    backgroundColor: 'rgba(143, 11, 11, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    position: 'absolute',
    right: 5,
    top: 5,
    borderWidth: 1,
    borderColor: 'maroon',
  },    
});