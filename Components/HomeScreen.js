import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView } from 'react-native';
import { useState, React, useContext } from 'react';
import SportsData from '../SportsData.json';
import { FavoritesContext } from './FavoriteContext';
import { Calendar } from './Calendar';
import { FilterButton } from './FilterButton';
import { AsyncStorageHandler } from './AsyncStorageHandler';

export const HomeScreen = ({ navigation }) => {
    const [selectedTeams,setSelectedTeams] = useState([]);
    const { favorites, setFavorites, filteredEvents, setFilteredEvents } = useContext(FavoritesContext);
  
    const changeEvents = (selectedTeams) => {
      const changedEvents = SportsData.filter(event => selectedTeams.includes(event.name));
      return changedEvents;
  };
  
    const filterTeams = () => {
      const events = changeEvents(selectedTeams);
      setFilteredEvents(events);
    };
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Calendar selectedTeams={selectedTeams}filteredEvents={filteredEvents} setFilteredEvents={setFilteredEvents} favorites={favorites} setFavorites={setFavorites} navigation={navigation}/>
        <FilterButton filterTeams={filterTeams} selectedTeams={selectedTeams} setSelectedTeams={setSelectedTeams}setFilteredEvents={setFilteredEvents}/>
        <AsyncStorageHandler dataKey="favorites" data={favorites} setData={setFavorites} />
        <AsyncStorageHandler dataKey="filteredEvents" data={filteredEvents} setData={setFilteredEvents} />
        <StatusBar style="auto" />
      </ScrollView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      width: 390,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 100,
    },
  });