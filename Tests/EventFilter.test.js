import React from 'react';
import { render, screen,fireEvent } from '@testing-library/react-native';
import { EventFilter } from '../Components/EventFilter'; 

jest.mock('../SportsData.json', () => [
  { Id: 0, date: '2024-04-01', homeAway: 'Home', location: 'Stadium', name: "Baseball", time: "14:00" },
  { Id: 1, date: '2024-04-01', homeAway: 'Away', location: 'Park', name: "Basketball", time: "12:00" },
]);

describe('EventFilter', () => {
  const setFilteredEvents = jest.fn();
  
  const selectedTeams = ["Baseball", "Basketball"];

  test('renders correctly', () => {
    const { getByText } = render(<EventFilter setFilteredEvents={setFilteredEvents} />);
    expect(getByText('All Games')).toBeTruthy();
  });



  test('select All Games', () => {
    render(
        <EventFilter
        setFilteredEvents={setFilteredEvents}
        selectedTeams={selectedTeams}
        />
          );
        
    const dropdown = screen.getByLabelText('Event Dropdown'); 
    fireEvent(dropdown, 'onChange', { label: 'All Games', value: 'all' });
      
    expect(setFilteredEvents).toHaveBeenCalledWith([
      { Id: 0, date: '2024-04-01', homeAway: 'Home', location: 'Stadium', name: "Baseball", time: "14:00" },
      { Id: 1, date: '2024-04-01', homeAway: 'Away', location: 'Park', name: "Basketball", time: "12:00" },    
    ]);
  });
  
  test('select Home Games', () => {
    render(
          <EventFilter
          setFilteredEvents={setFilteredEvents}
          selectedTeams={selectedTeams}
          />
          );
        
    const dropdown = screen.getByLabelText('Event Dropdown');
    fireEvent(dropdown, 'onChange', { label: 'Home', value: 'home' });
      
    expect(setFilteredEvents).toHaveBeenCalledWith([
      { Id: 0, date: '2024-04-01', homeAway: 'Home', location: 'Stadium', name: "Baseball", time: "14:00" },
    ]);
  });

  test('select Away Games', () => {
  render(
        <EventFilter
        setFilteredEvents={setFilteredEvents}
        selectedTeams={selectedTeams}
        />
        );
      
  const dropdown = screen.getByLabelText('Event Dropdown');
  fireEvent(dropdown, 'onChange', { label: 'Away', value: 'away' });
    
  expect(setFilteredEvents).toHaveBeenCalledWith([
    { Id: 1, date: '2024-04-01', homeAway: 'Away', location: 'Park', name: "Basketball", time: "12:00" }  
    ]);
  });
    
});