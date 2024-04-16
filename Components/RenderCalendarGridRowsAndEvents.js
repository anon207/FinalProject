import { StyleSheet, View } from 'react-native';
import React from 'react';
import { CalendarRow } from './CalendarRow';
import { RenderHomeAwayBoxAndEvents } from './RenderHomeAwayBoxAndEvents';

export const RenderCalendarGridRowsAndEvents = ({ renderCalendarRows, currentMonth, toggleEvents, selectedDay, filteredEvents, eventsForDay, favorites, toggleFavorite }) => {
  return( 
    <View style={RenderCalendarGridRowsAndEventsStyles.calendarGrid}>
      {renderCalendarRows().map((days, index) => (
        <View key={index}>
          <CalendarRow
            key={index}
            days={days}
            currentMonth={currentMonth}
            toggleEvents={toggleEvents}
            selectedDay={selectedDay}
            filteredEvents={filteredEvents}
          />
          <RenderHomeAwayBoxAndEvents 
            days={days} 
            selectedDay={selectedDay} 
            eventsForDay={eventsForDay} 
            favorites={favorites} 
            toggleFavorite={toggleFavorite}
          />
        </View>
      ))}
    </View>
  );
};

const RenderCalendarGridRowsAndEventsStyles = StyleSheet.create({
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
});