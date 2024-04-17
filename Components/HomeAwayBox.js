import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export const HomeAwayBox = ({ day }) => {
  return(
    <View style={HomeAwayBoxStyles.eventsContainer}>
      {day === 29 &&
      <View style={HomeAwayBoxStyles.twentynine}/>
      }
      {day === 30 &&
      <View style={HomeAwayBoxStyles.thirty}/>
      }
      {day === 31 &&
      <View style={HomeAwayBoxStyles.thirtyone}/>
      }
      <View style={HomeAwayBoxStyles.evtView}> 
        <View style={HomeAwayBoxStyles.homeCircle}/>
        <Text>Home</Text>
      </View>
      <View style={HomeAwayBoxStyles.evtView}> 
        <View style={HomeAwayBoxStyles.awayCircle}/>
        <Text>Away</Text>
      </View>
    </View>
  );
};

const HomeAwayBoxStyles = StyleSheet.create({
  eventsContainer: {
    height: 66,
    width: 385,
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderTopColor: 'white',
    marginBottom: 20,
  },
  homeCircle: {
    width: 10,
    height: 10,
    backgroundColor: 'maroon',
    borderRadius: 10,
    marginTop: 3,
    marginRight: 8, 
  },
  awayCircle: {
    width: 10,
    height: 10,
    backgroundColor: 'lightgray',
    borderRadius: 10,
    marginTop: 3,
    marginRight: 8,
  },
  evtView: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  thirty: {
    height: 67,
    width: 275,
    position: 'absolute',
    right: 0,
    top: -2,
    borderWidth: 1,
    borderTopColor: 'lightgray',
    borderBottomColor: 'lightgray',
    borderColor: 'white',
  },
  twentynine: {
    height: 67,
    width: 330,
    position: 'absolute',
    right: 0,
    top: -2,
    borderWidth: 1,
    borderTopColor: 'lightgray',
    borderBottomColor: 'lightgray',
    borderColor: 'white',
  },
  thirtyone: {
    height: 67,
    width: 220,
    position: 'absolute',
    right: 0,
    top: -2,
    borderWidth: 1,
    borderTopColor: 'lightgray',
    borderBottomColor: 'lightgray',
    borderColor: 'white',
  },
});