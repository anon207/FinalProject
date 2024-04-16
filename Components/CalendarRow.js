import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Cell } from './Cell';

export const CalendarRow = ({ days, currentMonth, toggleEvents, selectedDay, filteredEvents}) => {
    return (
      <View style={CalendarRowStyles.calendarGrid}>
        {days.map(day => {
          const formattedMonth = currentMonth + 1 < 10 ? `0${currentMonth + 1}` : `${currentMonth + 1}`;
          const formattedDay = day < 10 ? `0${day}` : day;
          const fullDate = `2024-${formattedMonth}-${formattedDay}`;
  
          // Filter events for this specific day
          const eventsForDay = filteredEvents.filter(event => event.date === fullDate);
  
          return (
            <Cell 
              key={day}
              day={day}
              currentMonth={currentMonth}
              toggleEvents={toggleEvents}
              isSelected={selectedDay === day}
              filteredEvents={eventsForDay} // Passing filtered events specific to this day
            />
          );
        })}
      </View>
    );
};

const CalendarRowStyles = StyleSheet.create({
    calendarGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
    },
});