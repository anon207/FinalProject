import { React } from 'react';
import { HomeAwayBox } from './HomeAwayBox';
import { RenderEventsForDay } from './RenderEventsForDay';

export const RenderHomeAwayBoxAndEvents = ({days, selectedDay, eventsForDay, favorites, toggleFavorite}) => {
  return(
    (days.includes(selectedDay) && eventsForDay.length > 0) && (
      <>
        <HomeAwayBox day={selectedDay}/>
        {RenderEventsForDay(eventsForDay, favorites, toggleFavorite)}
      </>
    )
  );
}