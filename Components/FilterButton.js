import { Text, View, Pressable, StyleSheet } from 'react-native';
import { useState, React } from 'react';
import SportsData from '../SportsData.json';
import { MakeFilterButton } from './MakeFilterButton';

export const FilterButton = ({filterTeams,selectedTeams,setSelectedTeams,setFilteredEvents}) =>{
  const [showPopup,setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const NoTeams = () =>{
    const noteams = ([]);
    setFilteredEvents(SportsData);
    setSelectedTeams(noteams);
  }

  const selectAllTeams = () =>{ 
    const allTeams = (SportsData.map(event => event.name));
    setFilteredEvents(SportsData);
    setSelectedTeams(allTeams);
  }

  return (
    <View style={FilterButtonStyles.container}>
      <Pressable onPress={togglePopup}>
      {({ pressed }) => (
        <View style={[FilterButtonStyles.button, pressed && FilterButtonStyles.pressedStyle]}>
          <Text style={{color: 'white', fontFamily: 'RobotoCondensed-Regular'}}>Filter teams</Text>
        </View>
      )}  
      </Pressable>
      {showPopup && <MakeFilterButton onClose={togglePopup} selectAllTeams={selectAllTeams} NoTeams={NoTeams}
      filterTeams={filterTeams} 
      selectedTeams={selectedTeams}
      setSelectedTeams={setSelectedTeams} />}
    </View>
  );
};

const FilterButtonStyles = StyleSheet.create({
  button: {
      backgroundColor: 'maroon',
      width: 90,
      height: 45,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      marginVertical: 10,
  },
  pressedStyle: {
      backgroundColor: 'rgba(87, 0, 0, 1.0)',
  },
  container: {
      width: 390,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 100,
  },
});