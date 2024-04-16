import { StyleSheet, Text, View } from 'react-native';
import React from 'react';


export const Day = ({ day }) => {
    return(
      <View style={DayStyles.day}>
        <Text style={DayStyles.dayFont}>{day}</Text>
      </View>
    );
};

const DayStyles = StyleSheet.create({
    day: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 10,
    },
    dayFont: {
      fontFamily: 'RobotoCondensed-Bold',
      fontWeight: 'bold',
      fontSize: 18, 
      color: '#666666'
    },
});