import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';

export const RenderEventsForDay = (eventsForDay, favorites, toggleFavorite) => {
  return eventsForDay.map((event, eventIndex) => (
    <View key={eventIndex} style={RenderEventsForDayStyles.EventDisplay} testID={`event-${eventIndex}`}>
      {event.homeAway === 'Home' &&
        <View style={RenderEventsForDayStyles.homeStyle} />
      }
      <Text style={{ fontFamily: 'RobotoCondensed-Bold' }}>{event.name}</Text>
      <Text style={{ fontFamily: 'RobotoCondensed-Bold' }}>{event.time}</Text>
      <Text style={{ fontFamily: 'RobotoCondensed-Bold' }}>{event.location}</Text>
      <View style={RenderEventsForDayStyles.bottomBar} />
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

const RenderEventsForDayStyles = StyleSheet.create({
  EventDisplay: {
    width: 385,
    height: 100,
    borderWidth: 1,
    borderColor: 'lightgray',
    marginBottom: 20,
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
});