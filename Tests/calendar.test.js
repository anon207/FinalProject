import React, { useState } from 'react';
import { render } from '@testing-library/react-native';
import { Calendar } from '../Components/Calendar';
import SportsData from '../SportsData.json';

const navigation = {
    navigate: jest.fn(),
    // Add other methods or properties as needed
};

// Create a wrapper component that uses useState and renders the Calendar component
const TestWrapper = () => {
    const [filteredEvents, setFilteredEvents] = useState(SportsData);
    const [favorites, setFavorites] = useState([]);

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
  
test('renders calendar component', () => {
    const { getByTestId } = render(<TestWrapper />);
    const calendarComponent = getByTestId('calendar-component');
    expect(calendarComponent).toBeDefined();
});