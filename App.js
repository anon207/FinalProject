import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Pressable,Button } from 'react-native';
import { useState, useEffect, React } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Dropdown} from 'react-native-element-dropdown';
import SportsData from './SportsData.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangeMonth = ({ currMonth, onForward, onBackward }) => (
  <View style={ChangeMonthStyles.monthChange}>
    <Pressable onPress={onBackward}>
      <Text style={{ fontSize: 30 }}>{'<< '}</Text>
    </Pressable>
    <Text style={{ fontSize: 30 }}> {currMonth} </Text>
    <Pressable onPress={onForward}>
      <Text style={{ fontSize: 30 }}>{' >>'}</Text>
    </Pressable>
  </View>
);

const DayRow = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return (
    <View style={DayRowStyles.daysRow}>
      {days.map((day, index) => (
        <Day key={index} day={day} />
      ))}
    </View>
  );
};

const Day = ({ day }) => (
  <View style={DayStyles.day}>
    <Text style={DayStyles.dayFont}>{day}</Text>
  </View>
);

const Cell = ({ day, toggleEvents, isSelected, filteredEvents }) => {
  let containsHome = false;
  for(const event of filteredEvents) {
    if(event.homeAway === 'Home') {
      containsHome = true;
    }
  }
  return(
    <Pressable onPress={() => toggleEvents(day)}>
      {({ pressed }) => (
        <View style={[CellStyles.cell, (filteredEvents.length > 0 && isSelected) && CellStyles.selectedCell, (filteredEvents.length > 0 && pressed) && CellStyles.pressedCell]}>
          <View style={CellStyles.cellDay}>
            <Text style={CellStyles.dayText}>{day}</Text>
          </View>
          <View style={CellStyles.eventPosition}>
            {(filteredEvents.length > 0) && (!isSelected) && 
              <Text style={CellStyles.evt}>{filteredEvents.length} Events</Text>
            }
            {containsHome &&
              <View style={CellStyles.HomeStyle}/>
            }
            {(isSelected && filteredEvents.length > 0) &&
            <View style={CellStyles.Xcontainer}>
              <View style={[CellStyles.line, CellStyles.lineDiagonalLeft]} />
              <View style={[CellStyles.line, CellStyles.lineDiagonalRight]} />
            </View>
            }
          </View>
        </View>
      )}
    </Pressable>
  );
};


const CalendarRow = ({ days, currentMonth, toggleEvents, selectedDay,filteredEvents}) => {
  return (
    <View style={CalendarRowStyles.calendarGrid}>
      {days.map(day => {
        const formattedMonth = currentMonth + 1 < 10 ? `0${currentMonth + 1}` : `${currentMonth + 1}`;
        const formattedDay = day < 10 ? `0${day}` : day;
        const fullDate = `2024-${formattedMonth}-${formattedDay}`;

        // Filter events for this specific day
        const eventsForDay = filteredEvents.filter(event => event.date === fullDate);

        return (
          <Cell 
            key={day}
            day={day}
            currentMonth={currentMonth}
            toggleEvents={toggleEvents}
            isSelected={selectedDay === day}
            filteredEvents={eventsForDay} // Passing filtered events specific to this day
          />
        );
      })}
    </View>
  );
};

const HomeAwayBox = () => {
  return(
    <View style={HomeAwayBoxStyles.eventsContainer}>
    <View style={HomeAwayBoxStyles.evtView}> 
      <View style={HomeAwayBoxStyles.homeCircle}/>
      <Text>Home</Text>
    </View>
    <View style={HomeAwayBoxStyles.evtView}> 
      <View style={HomeAwayBoxStyles.awayCircle}/>
      <Text>Away</Text>
    </View>
  </View>
  );
};

EventFilter=({applyFilter})=>{
  const [value, setValue] = useState(null);

  const data = [
    { label: 'All Games', value: 'all' },
    { label: 'Home', value: 'home' },
    { label: 'Away', value: 'away' },
  ];

  return (
    <View style={EventFilterStyles.dropdownContainer}>
    <Dropdown
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
  

const FavoriteList = ({ navigation, favorites }) => {
return(
  <Pressable 
    style={FavoriteListStyles.favView} 
    onPress={() => navigation.navigate('Favorited events', { favorites })}
  >
    <Text style={{color: 'white'}}>Favorites</Text>
  </Pressable>
);
};

const Calendar = ({ filteredEvents, setFilteredEvents, navigation}) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [showHomeEventsOnly, setShowHomeEventsOnly] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData(favorites);
  }, [favorites]);

  const saveData = async (data) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const loadData = async () => {
    try {
      const data = await AsyncStorage.getItem('favorites');
      if (data !== null) {
        setFavorites(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error loading data:', error);
      // Alert.alert("Error saving data");
    }
  };

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const formattedMonth = currentMonth + 1 < 10 ? `0${currentMonth + 1}` : `${currentMonth + 1}`;
  const formattedDay = selectedDay < 10 ? `0${selectedDay}` : selectedDay;
  const fullDate = `2024-${formattedMonth}-${formattedDay}`;

  const eventsForDay = filteredEvents.filter(event => event.date === fullDate);

  const applyFilter = (filterValue) => {
    let events = SportsData; 

    if (filterValue === 'home') {
      events = SportsData.filter(event => event.homeAway === 'Home');
    } else if (filterValue === 'away') {
      events = SportsData.filter(event => event.homeAway === 'Away');
    }
    setFilteredEvents(events); 
  };

  const toggleEvents = day => setSelectedDay(selectedDay === day ? null : day);

  const toggleFavorite = async (event) => {
    const updatedEvents = filteredEvents.map(e => e.Id === event.Id ? { ...e, favorite: !e.favorite } : e);

    if (event.favorite) {
        setFavorites(prevFavorites => [...prevFavorites, event]);
    } else {
        setFavorites(prevFavorites => prevFavorites.filter(favorite => favorite.Id !== event.Id));
    }

    setFilteredEvents(updatedEvents);
};

  const daysInMonth = (month) => {
    if (['January', 'March', 'May', 'July', 'August', 'October', 'December'].includes(month)) return 31;
    if (['April', 'June', 'September', 'November'].includes(month)) return 30;
    return month === 'February' ? 29 : 0;
  };

  const changeMonth = (increment) => {
    setCurrentMonth((prevMonth) => (prevMonth + increment + 12) % 12);
  };

  const calendarRows = [];
  let currentRow = [];
  for (let i = 1; i <= daysInMonth(months[currentMonth]); i++) {
    currentRow.push(i);
    if (currentRow.length === 7 || i === daysInMonth(months[currentMonth])) {
      calendarRows.push([...currentRow]);
      currentRow = [];
    }
  }

  return (
    <ScrollView contentContainerStyle={CalendarStyles.calendar}>
      <View style={CalendarStyles.headerContainer}>
      <EventFilter applyFilter={applyFilter} />
      <FavoriteList navigation={navigation} favorites={favorites}/>
      </View>
      <ChangeMonth
        onForward={() => changeMonth(1)}
        onBackward={() => changeMonth(-1)}
        currMonth={months[currentMonth]}
      />
      <DayRow />
      <View style={CalendarStyles.calendarGrid}>
        {calendarRows.map((days, index) => (
          <View key={index}>
            <CalendarRow
              key={index}
              days={days}
              currentMonth={currentMonth}
              toggleEvents={toggleEvents}
              selectedDay={selectedDay}
              filteredEvents={filteredEvents}
            />
            {calendarRows[index].includes(selectedDay) && eventsForDay.length > 0 && (
              <HomeAwayBox />
            )}
            {calendarRows[index].includes(selectedDay) && eventsForDay.map((event, eventIndex) => (
              <View key={eventIndex} style={CalendarStyles.EventDisplay}>
                {event.homeAway === 'Home' &&
                  <View style={CalendarStyles.homeStyle} />
                }
                <Text>{event.name}</Text>
                <Text>{event.time}</Text>
                <Text>{event.location}</Text>
                <View style={CalendarStyles.bottomBar} />
                <Pressable
                  key={event.Id}
                  style={event.favorite === false ? CalendarStyles.Remove : CalendarStyles.favButton}
                  onPress={() => toggleFavorite(event)}
                >
                  <Text style={{ color: 'white', fontSize: 10 }}>
                    {event.favorite === false ? 'Unfavorite' : 'Favorite'}
                  </Text>
                </Pressable>
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const MakeFilterButton = ({onClose,filterTeams,selectedTeams,setSelectedTeams}) =>{
  const listSports = ["Baseball",
  "Men's Basketball",
  "Women's Basketball",
  "Men's Cross Country",
  "Women's Cross Country",
  "Men's Track & Field",
  "Women's Track & Field",
  "Field Hockey",
  "Men's Soccer",
  "Women's Soccer",
  "Men's Volleyball",
  "Women's Volleyball",
  "Softball",
  "Men's Lacrosse",
  "Women's Lacrosse",
  "Men's Tennis",
  "Women's Tennis",
  "Men's Golf",
  "Men's Swimming",
  "Women's Swimming",
  "Wrestling",
  "Cycling"];

  const toggleTeamSelection = (team) => {
    if (!selectedTeams) {
      setSelectedTeams([team]); // Initialize selectedTeams as an array with the first selected team
    } else if (selectedTeams.includes(team)) {
      setSelectedTeams(selectedTeams.filter(selectedTeam => selectedTeam !== team));
    } else {
      setSelectedTeams([...selectedTeams, team]);
    }
  };

  return (
    <View style={MakeFilterButtonStyles.popup}>
  <ScrollView contentContainerStyle={MakeFilterButtonStyles.scrollViewContent}>
    {listSports.map((item, index) => (
      <Pressable key={index} onPress={() => toggleTeamSelection(item)}>
        {({ pressed }) => (
          <Text style={[MakeFilterButtonStyles.item, { backgroundColor: selectedTeams.includes(item) ? '#ccc' : pressed ? '#ddd' : 'transparent' }]}>
            {item}
          </Text>
        )}
      </Pressable>
    ))}
  </ScrollView>
  <View style={MakeFilterButtonStyles.buttonContainer}>
    <Button title="Apply" onPress={filterTeams} />
    <Button title="Close" onPress={onClose} />
  </View>
</View>
);
};


const FilterButton = ({filterTeams,selectedTeams,setSelectedTeams}) =>{
const [showPopup,setShowPopup] = useState(false);

const togglePopup = () => {
  setShowPopup(!showPopup);
};

return (
  <View style={styles.container}>
    <Button title="Show List" onPress={togglePopup} />
    {showPopup && <MakeFilterButton onClose={togglePopup}
    filterTeams={filterTeams} 
    selectedTeams={selectedTeams}
    setSelectedTeams={setSelectedTeams} />}
  </View>
);
};

const FavoritesScreen = ({ route }) => {
  const { favorites } = route.params;
return(
  <ScrollView contentContainerStyle={FavoriteScreenStyles.defualtView}>
    {favorites.map((event, index) => (
      <View key={index} style={CalendarStyles.EventDisplay}>
        <Text>{event.name}</Text>
        <Text>{event.time}</Text>
        <Text>{event.location}</Text>
        <View style={CalendarStyles.bottomBar} />
      </View>
    ))}
  </ScrollView>
);
};

const HomeScreen = ({ navigation, route }) => {
  const [selectedTeams,setSelectedTeams] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState(SportsData);

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    saveEvents(filteredEvents);
  }, [filteredEvents]);

  const saveEvents = async (data) => {
    try {
      await AsyncStorage.setItem('filteredEvents', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const loadEvents = async () => {
    try {
      const data = await AsyncStorage.getItem('filteredEvents');
      if (data !== null) {
        setFilteredEvents(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error loading data:', error);
      // Alert.alert("Error saving data");
    }
  };

  // const clearAsyncStorage = async () => {
  //   try {
  //     await AsyncStorage.clear();
  //     console.log('AsyncStorage cleared successfully.');
  //   } catch (error) {
  //     console.error('Error clearing AsyncStorage:', error);
  //   }
  // };
  
  // // Call the function when needed
  // clearAsyncStorage();

  const changeEvents = (selectedTeams) => {
    const filteredEvents = SportsData.filter(event => selectedTeams.includes(event.name));
    return filteredEvents;
};

  const filterTeams = () => {
    const events = changeEvents(selectedTeams);
    setFilteredEvents(events);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Calendar filteredEvents={filteredEvents} setFilteredEvents={setFilteredEvents} navigation={navigation}/>
      <FilterButton filterTeams={filterTeams} selectedTeams={selectedTeams} setSelectedTeams={setSelectedTeams}/>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

export default function App() {
  const [favorites, setFavorites] = useState([]);
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Roanoke Composite Calendar" component={HomeScreen}/>
        <Stack.Screen name="Favorited events" component={FavoritesScreen} initialParams={{favorites: favorites}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const FavoriteScreenStyles = StyleSheet.create({
  defualtView: {
    width: 390,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const HomeButtonStyles = StyleSheet.create({
 
    homeButton: {
      padding: 10,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
      width: 100,
      backgroundColor: 'maroon',

  },
  homeButtontext: {
    color: 'white',
    fontSize: 13.2,
    textAlign: 'center',
  },
  active: {
    backgroundColor: 'grey',
  },
  inactive: {
    backgroundColor: 'maroon',
  },
  
});


const FavoriteListStyles = StyleSheet.create({
  favView: {
    height: 40,
    width: 80,
    backgroundColor: 'maroon',
    marginBottom: 30,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20, 
  },
});

const ChangeMonthStyles = StyleSheet.create({
  monthChange: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingBottom: 10,
  },
});

const DayRowStyles = StyleSheet.create({
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
});

const DayStyles = StyleSheet.create({
  day: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  dayFont: {
    //fontFamily: 'RobotoCondensed-Bold',
    fontWeight: 'bold',
    fontSize: 18, 
    color: '#666666'
  },
});

const CellStyles = StyleSheet.create({
  cell: {
    height: 100,
    width: 55,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  selectedCell: {
    borderBottomColor: 'white'
  },
  pressedCell: {
    backgroundColor: 'rgba(173, 216, 230, 0.5)',
  },
  cellDay: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 15,
  },
  dayText: {
    //fontFamily: 'RobotoCondensed-Bold',
    fontWeight: 'bold',
    fontSize: 18,
  },
  eventPosition: {
    alignItems: 'center',
    paddingBottom: 15,
  },
  evt: {
    //fontFamily: 'RobotoCondensed-Bold',
    fontWeight: 'bold',
    fontSize: 10,
    color: '#666666'
  },
  Xcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 25,
  },
  line: {
    position: 'absolute',
    backgroundColor: 'black',
  },
  lineDiagonalLeft: {
    width: 5,
    height: 18,
    borderRadius: 1,
    transform: [{ rotate: '45deg' }],
  },
  lineDiagonalRight: {
    width: 5,
    height: 18,
    borderRadius: 1,
    transform: [{ rotate: '-45deg' }],
  },
  HomeStyle: {
    width: 55,
    height: 7.5,
    backgroundColor: 'maroon',
    position: 'absolute',
    bottom: 0,
  }
});

const CalendarRowStyles = StyleSheet.create({
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
});

const CalendarStyles = StyleSheet.create({
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  calendar: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    paddingLeft: 2.5,
    alignItems: 'center',
  },
  EventDisplay: {
    width: 385,
    height: 100,
    borderWidth: 1,
    borderColor: 'lightgray',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeStyle: {
    height: 100,
    width: 5,
    backgroundColor: 'maroon',
    alignSelf: 'flex-start',
    position: 'absolute',
    zIndex: 1,
  },
  bottomBar: {
    width: 385,
    height: 10,
    borderBottomColor: 'white',
    borderColor: 'lightgray',
    borderWidth: 1,
    position: 'absolute',
    bottom: 0
  },
  favButton: {
    height: 32.5,
    width: 65, 
    backgroundColor: 'maroon',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    position: 'absolute',
    right: 5,
    top: 5,
  },
  Remove: {
    height: 32.5,
    width: 65, 
    backgroundColor: 'rgba(143, 11, 11, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    position: 'absolute',
    right: 5,
    top: 5,
    borderWidth: 1,
    borderColor: 'maroon',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%', 
    paddingHorizontal: 50, 
  },
});

const MakeFilterButtonStyles = StyleSheet.create({
popup: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    position: 'absolute',
    transform: [{ translateX: 0 }, { translateY: -290 }],
  },
  scrollViewContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    padding: 10,
    fontSize: 18,
  },
});

const HomeAwayBoxStyles = StyleSheet.create({
  eventsContainer: {
    height: 66,
    width: 385,
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderTopColor: 'white',
    marginBottom: 20,
  },
  homeCircle: {
    width: 10,
    height: 10,
    backgroundColor: 'maroon',
    borderRadius: 10,
    marginTop: 3,
    marginRight: 8, 
  },
  awayCircle: {
    width: 10,
    height: 10,
    backgroundColor: 'lightgray',
    borderRadius: 10,
    marginTop: 3,
    marginRight: 8,
  },
  evtView: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
});

const styles = StyleSheet.create({
  container: {
    width: 390,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
  },
});
const EventFilterStyles = StyleSheet.create({
  dropdownContainer: {
    paddingHorizontal: 12,
    paddingVertical: 0,
  },
  dropdown: {
    height: 50,
    width: 120,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 13,
  },
  selectedTextStyle: {
    fontSize: 13,
    color: 'grey',
  },
  iconStyle: {
    width: 62,
    height: 25,
  },
  containerStyle: {
    marginBottom: 1,
  },
});