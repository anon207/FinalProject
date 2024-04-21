import { StyleSheet, ScrollView, } from 'react-native';
import { useState, React } from 'react';
import { HeaderChangeMonthDayRow } from './HeaderChangeMonthDayRow';
import { RenderCalendarGridRowsAndEvents } from './RenderCalendarGridRowsAndEvents';

export const Calendar = ({ filteredEvents, setFilteredEvents, favorites, setFavorites, navigation }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(0);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const formattedMonth = currentMonth + 1 < 10 ? `0${currentMonth + 1}` : `${currentMonth + 1}`;
  const formattedDay = selectedDay < 10 ? `0${selectedDay}` : selectedDay;
  const fullDate = `2024-${formattedMonth}-${formattedDay}`;

  const eventsForDay = filteredEvents.filter(event => event.date === fullDate);

  const toggleEvents = day => setSelectedDay(selectedDay === day ? null : day);

  const toggleFavorite = async (event) => {
    const updatedEvents = filteredEvents.map(e => e.Id === event.Id ? { ...e, favorite: !e.favorite } : e);

    if (event.favorite) {
        setFavorites(prevFavorites => [...prevFavorites, event]);
    } else {
        setFavorites(prevFavorites => prevFavorites.filter(favorite => favorite.Id !== event.Id));
    }

    setFilteredEvents(updatedEvents);
  };

  const changeMonth = (increment) => {
    setCurrentMonth((prevMonth) => (prevMonth + increment + 12) % 12);
  };

  const renderCalendarRows = () => {
    const calendarRows = [];
    let currentRow = [];
    for (let i = 1; i <= daysInMonth(months[currentMonth]); i++) {
      currentRow.push(i);
      if (currentRow.length === 7 || i === daysInMonth(months[currentMonth])) {
        calendarRows.push([...currentRow]);
        currentRow = [];
      }
    }
    return calendarRows;
  };

  const daysInMonth = (month) => {
    if (['January', 'March', 'May', 'July', 'August', 'October', 'December'].includes(month)) return 31;
    if (['April', 'June', 'September', 'November'].includes(month)) return 30;
    return month === 'February' ? 29 : 0;
  };
  
  return (
    <ScrollView contentContainerStyle={CalendarStyles.calendar} testID='calendar-component'>
      <HeaderChangeMonthDayRow
        setFilteredEvents={setFilteredEvents}
        navigation={navigation}
        onForward={() => changeMonth(1)}
        onBackward={() => changeMonth(-1)}
        currMonth={months[currentMonth]}
      />
      <RenderCalendarGridRowsAndEvents 
        renderCalendarRows={renderCalendarRows}
        currentMonth={currentMonth}
        toggleEvents={toggleEvents}
        selectedDay={selectedDay}
        filteredEvents={filteredEvents}
        eventsForDay={eventsForDay}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
    </ScrollView>
  );
};

const CalendarStyles = StyleSheet.create({
    calendar: {
      flexDirection: 'column',
      flexWrap: 'wrap',
      paddingLeft: 2.5,
      alignItems: 'center',
    },
});