import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Day } from './Day';

export const DayRow = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <View style={DayRowStyles.daysRow}>
        {days.map((day, index) => (
          <Day key={index} day={day} />
        ))}
      </View>
    );
  };

  const DayRowStyles = StyleSheet.create({
    daysRow: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginVertical: 10,
    },
  });