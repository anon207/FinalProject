import { StyleSheet, View } from 'react-native';
import { React } from 'react';
import { EventFilter } from './EventFilter';
import { FavoriteList } from './FavoriteList';

export const CalendarHeader = ({ setFilteredEvents, navigation, favorites }) => {
    return(
      <View style={CalendarHeaderStyles.headerContainer}>
          <EventFilter setFilteredEvents={setFilteredEvents}/>
          <FavoriteList navigation={navigation} favorites={favorites}/>
      </View>
    );
  };

const CalendarHeaderStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%', 
    marginVertical: 25,
  },
});