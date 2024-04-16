import { React } from 'react';
import { HomeAwayBox } from './HomeAwayBox';
import { RenderEventsForDay } from './RenderEventsForDay';

export const RenderHomeAwayBoxAndEvents = ({days, selectedDay, eventsForDay, favorites, toggleFavorite}) => {
  return(
    days.includes(selectedDay) && (
      <>
        <HomeAwayBox />
        {RenderEventsForDay(eventsForDay, favorites, toggleFavorite)}
      </>
    )
  );
}