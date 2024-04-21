import { React } from 'react';
import { CalendarHeader } from './CalendarHeader';
import { ChangeMonth } from './ChangeMonth';
import { DayRow } from './DayRow';

export const HeaderChangeMonthDayRow = ({ setFilteredEvents, navigation, onForward, onBackward, currMonth }) => {
  return(
    <>
      <CalendarHeader 
        setFilteredEvents={setFilteredEvents}
        navigation={navigation}
      />
      <ChangeMonth
        onForward={onForward}
        onBackward={onBackward}
        currMonth={currMonth}
      />
      <DayRow />
    </>
  );
};