import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';

export const RenderEventsForDay = (eventsForDay, favorites, toggleFavorite) => {
    return eventsForDay.map((event, eventIndex) => (
      <View key={eventIndex} style={CalendarStyles.EventDisplay}>
        {event.homeAway === 'Home' &&
          <View style={CalendarStyles.homeStyle} />
        }
        <Text style={{ fontFamily: 'RobotoCondensed-Bold' }}>{event.name}</Text>
        <Text style={{ fontFamily: 'RobotoCondensed-Bold' }}>{event.time}</Text>
        <Text style={{ fontFamily: 'RobotoCondensed-Bold' }}>{event.location}</Text>
        <View style={CalendarStyles.bottomBar} />
        <Pressable
          key={event.Id}
          style={( (event.favorite === false) || (favorites.some(favorite => favorite.Id === event.Id)) ) ? CalendarStyles.Remove : CalendarStyles.favButton}
          onPress={() => toggleFavorite(event)}
        >
          <Text style={{ color: 'white', fontSize: 10, fontFamily: 'RobotoCondensed-Regular' }}>
            {( (event.favorite === false) || (favorites.some(favorite => favorite.Id === event.Id)) ) ? 'Unfavorite' : 'Favorite'}
          </Text>
        </Pressable>
      </View>
    ));
};

const CalendarStyles = StyleSheet.create({
    calendarGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
    },
    calendar: {
      flexDirection: 'column',
      flexWrap: 'wrap',
      paddingLeft: 2.5,
      alignItems: 'center',
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
    homeStyle: {
      height: 100,
      width: 5,
      backgroundColor: 'maroon',
      alignSelf: 'flex-start',
      position: 'absolute',
      zIndex: 1,
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
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '100%', 
      marginVertical: 25,
    },
});