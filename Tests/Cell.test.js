import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Cell } from '../Components/Cell';

describe('Cell component', () => {
    test('Cell click toggles events', () => {
        const day = 15;
        const filteredEvents = [
        { Id: 0, date: '2024-04-01', favorite: 'false', homeAway: 'Home', location: 'Stadium', name: "Baseball", time: "14:00" },
        { Id: 1, date: '2024-04-01', favorite: 'false', homeAway: 'Home', location: 'Park', name: "Basketball", time: "12:00" },
        ];
        const toggleEventsMock = jest.fn();
    
        const { getByTestId } = render(
        <Cell
            day={day}
            filteredEvents={filteredEvents}
            toggleEvents={toggleEventsMock}
            isSelected={false}
        />
        );
        const cell = getByTestId(`day-${day}`);
        fireEvent.press(cell);
        expect(toggleEventsMock).toHaveBeenCalledWith(day);
    });

    test('Cell displays correct text for number of events', () => {
        const day = 15;
        const filteredEvents = [
        { Id: 0, date: '2024-04-01', favorite: 'false', homeAway: 'Home', location: 'Stadium', name: "Baseball", time: "14:00" },
        { Id: 1, date: '2024-04-01', favorite: 'false', homeAway: 'Home', location: 'Park', name: "Basketball", time: "12:00" },
        { Id: 2, date: '2024-04-01', favorite: 'true', homeAway: 'Away', location: 'Gym', name: "Wrestling", time: "15:00" },
        { Id: 3, date: '2024-04-01', favorite: 'true', homeAway: 'Away', location: 'Track', name: "Crossfit", time: "11:00" },
        ];
        const { getByText } = render(
          <Cell
            day={day}
            filteredEvents={filteredEvents}
            toggleEvents={jest.fn()}
            isSelected={false}
          />
        );
        expect(getByText('4 Events')).toBeTruthy();
    });

    test('Cell renders home marker when contains a home event', () => {
        const day = 15;
        const filteredEvents = [
          { Id: 1, date: '2024-04-15', title: 'Event 1', homeAway: 'Home' },
          { Id: 2, date: '2024-04-15', title: 'Event 2', homeAway: 'Away' },
        ];
        const { getByTestId } = render(
          <Cell
            day={day}
            filteredEvents={filteredEvents}
            toggleEvents={jest.fn()}
            isSelected={false}
          />
        );
        expect(getByTestId('home-marker')).toBeTruthy();
      });
});