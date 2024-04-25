import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { FavoritesScreen } from '../Components/FavoriteScreen';
import { FavoritesContext } from '../Components/FavoriteContext';

describe('FavoritesScreen', () => {
  test('renders correctly', () => {
    const { toJSON } = render(
      <FavoritesContext.Provider value={{
        favorites: [],
        setFavorites: jest.fn(),
      }}>
        <FavoritesScreen favorites={[{
        name: "Test Event",
        time: "12:00",
        location: "Test Location",
        homeAway: "Home",
        Id: 0,
        date: "2024-04-01"
      }]}/>
      </FavoritesContext.Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  test('unfavoriting all events', () => {
    const { getByText, queryByText } = render(
      <FavoritesContext.Provider value={{
        favorites: [],
        setFavorites: jest.fn(),
      }}>
        <FavoritesScreen favorites={[{
        name: "Test Event",
        time: "12:00",
        location: "Test Location",
        homeAway: "Home",
        Id: 0,
        date: "2024-04-01"
      }]}/>
      </FavoritesContext.Provider>
    );
    fireEvent.press(getByText('Unfavorite all'));
    expect(queryByText('You have no favorited events!')).toBeTruthy();
  });

  test('toggling individual event favoriting/unfavoriting', () => {
    const mockFavorites = [
      {
        name: "Test Event",
        time: "12:00",
        location: "Test Location",
        homeAway: "Home",
        Id: 0,
        date: "2024-04-01"
      }
    ];
    const { getByText, queryByTestId } = render(
      <FavoritesContext.Provider value={{
        favorites: mockFavorites,
        setFavorites: jest.fn(),
      }}>
        <FavoritesScreen favorites={mockFavorites} />
      </FavoritesContext.Provider>
    );
    const favoriteButton = getByText('Unfavorite');
    fireEvent.press(favoriteButton);
    expect(queryByTestId('event-0-fav-button')).toBeTruthy();
  });
});