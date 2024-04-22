import { StyleSheet, View } from 'react-native';
import { useState, React } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import SportsData from '../SportsData.json';

export const EventFilter=({ setFilteredEvents }) => {
  const [value, setValue] = useState(null);

  const data = [
    { label: 'All Games', value: 'all' },
    { label: 'Home', value: 'home' },
    { label: 'Away', value: 'away' },
  ];

  const applyFilter = (filterValue) => {
    let events = SportsData; 

    if (filterValue === 'home') {
      events = SportsData.filter(event => event.homeAway === 'Home');
    } else if (filterValue === 'away') {
      events = SportsData.filter(event => event.homeAway === 'Away');
    }
    setFilteredEvents(events); 
  };

  return (
    <View>
      <Dropdown
        accessibilityLabel="Event Dropdown"
        data={data}
        labelField="label"
        valueField="value"
        placeholder="All Games"
        value={value}
        onChange={item => {
          setValue(item.value);
          applyFilter(item.value);
        }}
        style={EventFilterStyles.dropdown} 
        placeholderStyle={EventFilterStyles.placeholderStyle}
        selectedTextStyle={EventFilterStyles.selectedTextStyle}
        iconStyle={EventFilterStyles.iconStyle}
        containerStyle={EventFilterStyles.containerStyle}
      />
    </View>
  );
};

const EventFilterStyles = StyleSheet.create({
  dropdown: {
    height: 40,
    width: 90,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 13,
    fontFamily: 'RobotoCondensed-Regular',
  },
  selectedTextStyle: {
    fontSize: 13,
    color: 'black',
    fontFamily: 'RobotoCondensed-Regular'
  },
  iconStyle: {
    width: 25,
    height: 45,
  },
  containerStyle: {
    marginBottom: 1,
  },
});