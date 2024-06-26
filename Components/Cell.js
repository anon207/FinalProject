import { StyleSheet, Text, View, Pressable } from 'react-native';
import Triangle from 'react-native-triangle';
import React from 'react';

export const Cell = ({ day, toggleEvents, isSelected, filteredEvents, favorites }) => {
  let containsHome = false;
  for(const event of filteredEvents) {
    if(event.homeAway === 'Home') {
      containsHome = true;
    }
  }

  let containsFav = false;
  for(const event of filteredEvents) {
    if(favorites.some(favorite => favorite.Id === event.Id)) {
      containsFav = true;
    }
  }

  return(
    <Pressable onPress={() => toggleEvents(day)} testID={`day-${day}`}>
      {({ pressed }) => (
        <View style={[CellStyles.cell, (filteredEvents.length > 0 && isSelected) && CellStyles.selectedCell, (filteredEvents.length > 0 && pressed) && CellStyles.pressedCell]}>
          {containsFav &&
          <View style={CellStyles.favorited}>
            <Triangle
              width={11}
              height={17}
              color={'maroon'}
              direction={'up-left'}
            />
          </View>
          }
          <View style={CellStyles.cellDay}>
            <Text style={CellStyles.dayText}>{day}</Text>
          </View>
          <View style={CellStyles.eventPosition}>
            {(filteredEvents.length > 0) && (!isSelected) && 
              <Text style={CellStyles.evt}>{filteredEvents.length} Events</Text>
            }
            {(containsHome && !isSelected) &&
              <View style={CellStyles.HomeStyle} testID='home-marker'/>
            }
            {(isSelected && filteredEvents.length > 0) &&
            <View style={CellStyles.Xcontainer}>
              <View style={[CellStyles.line, CellStyles.lineDiagonalLeft]} />
              <View style={[CellStyles.line, CellStyles.lineDiagonalRight]} />
            </View>
            }
          </View>
        </View>
      )}
    </Pressable>
  );
};

const CellStyles = StyleSheet.create({
  favorited: {
    position: 'absolute',
  },
  cell: {
    height: 100,
    width: 55,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  selectedCell: {
    borderBottomColor: 'white'
  },
  pressedCell: {
    backgroundColor: 'rgba(173, 216, 230, 0.5)',
  },
  cellDay: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 15,
  },
  dayText: {
    fontFamily: 'RobotoCondensed-Bold',
    fontWeight: 'bold',
    fontSize: 18,
  },
  eventPosition: {
    alignItems: 'center',
    paddingBottom: 15,
  },
  evt: {
    fontFamily: 'RobotoCondensed-Regular',
    fontWeight: 'bold',
    fontSize: 10,
    color: '#666666'
  },
  Xcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 25,
  },
  line: {
    position: 'absolute',
    backgroundColor: 'black',
  },
  lineDiagonalLeft: {
    width: 5,
    height: 18,
    borderRadius: 1,
    transform: [{ rotate: '45deg' }],
  },
  lineDiagonalRight: {
    width: 5,
    height: 18,
    borderRadius: 1,
    transform: [{ rotate: '-45deg' }],
  },
  HomeStyle: {
    width: 55,
    height: 7.5,
    backgroundColor: 'maroon',
    position: 'absolute',
    bottom: 0,
  }
});