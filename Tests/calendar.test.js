import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Calendar } from '../Components/Calendar';
import SportsData from '../SportsData.json';
import { RenderEventsForDay } from '../Components/RenderEventsForDay';

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
    
    // test('Correct events show up on the selected day', () => {
    //     const { getByTestId } = render(<TestWrapper />);

    //     // Find the Cell component (you may need to adjust the test ID based on your implementation)
    //     const cell = getByTestId('day-1'); // Assuming the test ID is 'day-1'
      
    //     // Render events for the day using your rendering function
    //     const eventsForDay = SportsData.filter(event => event.date === "2024-04-01"); // Example: Filter events for April 1, 2024
    //     const renderedEvents = RenderEventsForDay(eventsForDay, favorites, jest.fn()); // Mock toggleFavorite function
      
    //     // Assert that each event is present in the cell
    //     renderedEvents.forEach(event => {
    //       expect(getByText(event.props.children[1].props.children)).toBeTruthy(); // Assuming the event name is the second child
    //       expect(getByText(event.props.children[2].props.children)).toBeTruthy(); // Assuming the event time is the third child
    //       expect(getByText(event.props.children[3].props.children)).toBeTruthy(); // Assuming the event location is the fourth child
    //     });
    //   });

    // test('Cell click toggles events', () => {
    //     // Mock data
    //     const day = 15;
    //     const filteredEvents = [
    //       { Id: 1, date: '2024-04-15', title: 'Event 1', homeAway: 'Home' },
    //       { Id: 2, date: '2024-04-15', title: 'Event 2', homeAway: 'Away' },
    //     ];
    //     const toggleEventsMock = jest.fn();
      
    //     // Render the Cell component with mock props
    //     const { getByTestId } = render(
    //       <Cell
    //         day={day}
    //         filteredEvents={filteredEvents}
    //         toggleEvents={toggleEventsMock}
    //         isSelected={false}
    //       />
    //     );
      
    //     // Simulate clicking on the cell
    //     const cell = getByTestId(`day-${day}`);
    //     fireEvent.press(cell);
      
    //     // Check if toggleEvents function is called with the correct day
    //     expect(toggleEventsMock).toHaveBeenCalledWith(day);
    //   });

});