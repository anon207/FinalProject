import { render, fireEvent } from '@testing-library/react-native';
import { RenderEventsForDay } from '../Components/RenderEventsForDay';

describe('RenderEventsForDay', () => {
  test('Renders events for the day correctly', () => {
    const eventsForDay = [
      { Id: 0, date: '2024-04-01', favorite: true, homeAway: 'Home', location: 'Stadium', name: "Baseball", time: "14:00" },
      { Id: 1, date: '2024-04-01', favorite: false, homeAway: 'Away', location: 'Gym', name: "Basketball", time: "12:00" },
    ];
    const favorites = [
      { Id: 0, date: '2024-04-01', favorite: true, homeAway: 'Home', location: 'Stadium', name: "Baseball", time: "14:00" },
    ];
    
    const toggleFavoriteMock = jest.fn();

    const { getByText, getByTestId } = render(
      RenderEventsForDay(eventsForDay, favorites, toggleFavoriteMock)
    );

    expect(getByText('Baseball')).toBeTruthy();
    expect(getByText('14:00')).toBeTruthy();
    expect(getByText('Stadium')).toBeTruthy();
    expect(getByText('Basketball')).toBeTruthy();
    expect(getByText('12:00')).toBeTruthy();
    expect(getByText('Gym')).toBeTruthy();

    expect(getByTestId('event-0-home-marker')).toBeTruthy();

    fireEvent.press(getByTestId('event-0-fav-button'));
    expect(toggleFavoriteMock).toHaveBeenCalledWith(eventsForDay[0]);

    fireEvent.press(getByTestId('event-1-fav-button'));
    expect(toggleFavoriteMock).toHaveBeenCalledWith(eventsForDay[1]);
  });

  test('Favorite button has correct styling', () => {
    const eventsForDay = [
      { Id: 0, date: '2024-04-01', favorite: true, homeAway: 'Home', location: 'Stadium', name: "Baseball", time: "14:00" },
      { Id: 1, date: '2024-04-01', favorite: false, homeAway: 'Away', location: 'Gym', name: "Basketball", time: "12:00" },
      { Id: 2, date: '2024-04-01', favorite: true, homeAway: 'Home', location: 'Arena', name: "wrestling", time: "04:00" },
      { Id: 3, date: '2024-04-01', favorite: false, homeAway: 'Away', location: 'Track', name: "Track", time: "02:00" },      
    ];
    const favorites = [
      { Id: 0, date: '2024-04-01', favorite: true, homeAway: 'Home', location: 'Stadium', name: "Baseball", time: "14:00" },
      { Id: 2, date: '2024-04-01', favorite: true, homeAway: 'Home', location: 'Arena', name: "wrestling", time: "04:00" },
    ];
    const toggleFavoriteMock = jest.fn();
  
    const { getByTestId } = render(
      RenderEventsForDay(eventsForDay, favorites, toggleFavoriteMock)
    );
  
    const favoriteButton0 = getByTestId('event-0-fav-button');
    expect(favoriteButton0).toHaveStyle({ backgroundColor: 'rgba(143, 11, 11, 0.5)' });
  
    const favoriteButton1 = getByTestId('event-1-fav-button');
    expect(favoriteButton1).toHaveStyle({ backgroundColor: 'maroon' });
    
    const favoriteButton2 = getByTestId('event-2-fav-button');
    expect(favoriteButton2).toHaveStyle({ backgroundColor: 'rgba(143, 11, 11, 0.5)' });
    
    const favoriteButton3 = getByTestId('event-3-fav-button');
    expect(favoriteButton3).toHaveStyle({ backgroundColor: 'maroon' });
  });
});