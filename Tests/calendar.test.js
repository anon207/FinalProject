import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Calendar } from '../Components/Calendar';
import SportsData from '../SportsData.json';

const navigation = {
    navigate: jest.fn(),
};

const TestWrapper = () => {
    const [filteredEvents, setFilteredEvents] = useState(SportsData);
    const [favorites, setFavorites] = useState([{"Id": 0, "date": "2024-04-01", "favorite": "false", "homeAway": "Home", "location": "Stadium", "name": "Baseball", "time": "14:00"}]);

    return (
        <Calendar
            filteredEvents={filteredEvents}
            setFilteredEvents={setFilteredEvents}
            favorites={favorites}
            setFavorites={setFavorites}
            navigation={navigation}
        />
    );
};
  
describe('Calendar component', () => {
    test('renders calendar component', () => {
        const { getByTestId } = render(<TestWrapper />);
        const calendarComponent = getByTestId('calendar-component');
        expect(calendarComponent).toBeDefined();
    });

    describe('Testing month changing', () => {
        test('Clicking forward button works correctly', () => {
            const { getByTestId } = render(<TestWrapper />);
            const forwardButton = getByTestId('next-month');
            fireEvent.press(forwardButton);
            const monthText = getByTestId('current-month');
            expect(monthText.props.children).toStrictEqual([" ", "February", " "]);
            fireEvent.press(forwardButton);
            expect(monthText.props.children).toStrictEqual([" ", "March", " "]);
            fireEvent.press(forwardButton);
            expect(monthText.props.children).toStrictEqual([" ", "April", " "]);
        });

        test('Clicking backward button works correctly', () => {
            const { getByTestId } = render(<TestWrapper />);
            const backwardButton = getByTestId('prev-month');
            fireEvent.press(backwardButton);
            const monthText = getByTestId('current-month');
            expect(monthText.props.children).toStrictEqual([" ", "December", " "]);
            fireEvent.press(backwardButton);
            expect(monthText.props.children).toStrictEqual([" ", "November", " "]);
            fireEvent.press(backwardButton);
            expect(monthText.props.children).toStrictEqual([" ", "October", " "]);
        });
    });
   
});