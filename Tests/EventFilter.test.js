import React from 'react';
import { render, screen,fireEvent } from '@testing-library/react-native';
import { EventFilter } from '../Components/EventFilter'; 
import SportsData from '../SportsData.json'; 


jest.mock('../SportsData.json', () => [
    { id: 1, homeAway: 'Home', game: 'Soccer' },
    { id: 2, homeAway: 'Away', game: 'Basketball' },
    { id: 3, homeAway: 'Home', game: 'Football' },
  ]);
  describe('EventFilter', () => {
    const setFilteredEvents = jest.fn();
  
    it('renders correctly', () => {
        const { getByText } = render(<EventFilter setFilteredEvents={setFilteredEvents} />);
        expect(getByText('All Games')).toBeTruthy();
      });

   

    test('select All Games', () => {
       render(
            <EventFilter
            setFilteredEvents={setFilteredEvents}
      />
            );
           
            const dropdown = screen.getByLabelText('Event Dropdown'); // Access dropdown by its accessibility label
            fireEvent(dropdown, 'onChange', { label: 'All Games', value: 'all' }); // Simulate selecting the "All Games" option
         
        expect(setFilteredEvents).toHaveBeenCalledWith([
            { id: 1, homeAway: 'Home', game: 'Soccer' },
            { id: 2, homeAway: 'Away', game: 'Basketball' },
            { id: 3, homeAway: 'Home', game: 'Football' },
        ]);
      });
        
    test('select Home Games', () => {
        render(
             <EventFilter
             setFilteredEvents={setFilteredEvents}
       />
             );
            
             const dropdown = screen.getByLabelText('Event Dropdown'); // Access dropdown by its accessibility label
             fireEvent(dropdown, 'onChange', { label: 'Home', value: 'home' }); // Simulate selecting the "All Games" option
         
         expect(setFilteredEvents).toHaveBeenCalledWith([
             { id: 1, homeAway: 'Home', game: 'Soccer' },
             { id: 3, homeAway: 'Home', game: 'Football' },
         ]);
       });

       test('select Away Games', () => {
        render(
             <EventFilter
             setFilteredEvents={setFilteredEvents}
       />
             );
            
             const dropdown = screen.getByLabelText('Event Dropdown'); // Access dropdown by its accessibility label
             fireEvent(dropdown, 'onChange', { label: 'Away', value: 'away' }); // Simulate selecting the "All Games" option
         
         expect(setFilteredEvents).toHaveBeenCalledWith([
              { id: 2, homeAway: 'Away', game: 'Basketball' },
           ]);
       });
         
     });