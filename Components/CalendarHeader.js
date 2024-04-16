import { StyleSheet, View } from 'react-native';
import { React } from 'react';
import { EventFilter } from './EventFilter';
import { FavoriteList } from './FavoriteList';

export const CalendarHeader = ({ setFilteredEvents, navigation, favorites }) => {
    return(
      <View style={CalendarStyles.headerContainer}>
          <EventFilter setFilteredEvents={setFilteredEvents}/>
          <FavoriteList navigation={navigation} favorites={favorites}/>
      </View>
    );
  };

  export const CalendarStyles = StyleSheet.create({
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