import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Pressable, Image } from 'react-native';
import { useState, useEffect, React } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SportsData from './SportsData.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { Calendar } from './Components/Calendar';
import { FavoritesScreen } from './Components/FavoriteScreen';

const MakeFilterButton = ({onClose,filterTeams,selectedTeams,setSelectedTeams,AllTeams,NoTeams}) =>{
  const listSports = ["Baseball", "Men's Basketball", "Women's Basketball", "Men's Cross Country",
  "Women's Cross Country", "Men's Track & Field", "Women's Track & Field", "Field Hockey",
  "Men's Soccer", "Women's Soccer", "Men's Volleyball", "Women's Volleyball", "Softball", 
  "Men's Lacrosse", "Women's Lacrosse", "Men's Tennis", "Women's Tennis", "Men's Golf", "Men's Swimming",
  "Women's Swimming", "Wrestling", "Cycling"];

  const toggleTeamSelection = (team) => {
    if (!selectedTeams) {
      setSelectedTeams([team]); // Initialize selectedTeams as an array with the first selected team
    } else if (selectedTeams.includes(team)) {
      setSelectedTeams(selectedTeams.filter(selectedTeam => selectedTeam !== team));
    } else {
      setSelectedTeams([...selectedTeams, team]);
    }
  };

  const AllClose = () =>{
    AllTeams();
  }
  
  const ApplyClose = () =>{
    filterTeams();
    onClose();
  }

  const NoneClose = () =>{
    NoTeams();
  }

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
      <Pressable onPress={ApplyClose}> 
      {({ pressed }) => (
        <View style={[MakeFilterButtonStyles.smallButton, pressed && MakeFilterButtonStyles.pressedStyle]}> 
          <Text style={{color: 'white', fontFamily: 'RobotoCondensed-Regular'}}>Apply</Text>
        </View>
      )} 
      </Pressable>
      <Pressable onPress={AllClose}> 
      {({ pressed }) => (
        <View style={[MakeFilterButtonStyles.smallButton, pressed && MakeFilterButtonStyles.pressedStyle]}> 
          <Text style={{color: 'white', fontFamily: 'RobotoCondensed-Regular'}}>Select All</Text>
        </View>
      )} 
      </Pressable>
      <Pressable onPress={NoneClose}> 
      {({ pressed }) => (
        <View style={[MakeFilterButtonStyles.smallButton, pressed && MakeFilterButtonStyles.pressedStyle]}> 
          <Text style={{color: 'white', fontFamily: 'RobotoCondensed-Regular'}}>DeSelect All</Text>
        </View>
      )} 
      </Pressable>
    </View>
  </View>
  );
};


const FilterButton = ({filterTeams,selectedTeams,setSelectedTeams,setFilteredEvents}) =>{
  const [showPopup,setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const NoTeams = () =>{
    const noteams = ([]);
    setFilteredEvents(SportsData);
    setSelectedTeams(noteams);
  }

  const AllTeams = () =>{ 
    const allTeams = (SportsData.map(event => event.name));
    setFilteredEvents(SportsData);
    setSelectedTeams(allTeams);
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={togglePopup}> 
      {({ pressed }) => (
        <View style={[MakeFilterButtonStyles.button, pressed && MakeFilterButtonStyles.pressedStyle]}>
          <Text style={{color: 'white', fontFamily: 'RobotoCondensed-Regular'}}>Filter teams</Text>
        </View>
      )}  
      </Pressable>
      {showPopup && <MakeFilterButton onClose={togglePopup} AllTeams={AllTeams} NoTeams={NoTeams}
      filterTeams={filterTeams} 
      selectedTeams={selectedTeams}
      setSelectedTeams={setSelectedTeams} />}
    </View>
  );
};

const useAsyncStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    const loadStoredValue = async () => {
      try {
        const data = await AsyncStorage.getItem(key);
        if (data !== null) {
          setStoredValue(JSON.parse(data));
        }
      } catch (error) {
        console.error(`Error loading ${key} from AsyncStorage:`, error);
      }
    };

    loadStoredValue();
  }, [key]);

  const saveValue = async (value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      setStoredValue(value);
    } catch (error) {
      console.error(`Error saving ${key} to AsyncStorage:`, error);
    }
  };

  return [storedValue, saveValue];
};

const HomeScreen = ({ navigation, route }) => {
  const [selectedTeams,setSelectedTeams] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState(SportsData);
  const [favorites, setFavorites] = useState([]);

  useAsyncStorage('favorites', favorites);
  useAsyncStorage('filteredEvents', filteredEvents);

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
      <StatusBar style="auto" />
    </ScrollView>
  );
}

export default function App() {
  const [favorites, setFavorites] = useState([]);
  const [fontsLoaded] = useFonts({
    'RobotoCondensed-Bold': require('./assets/fonts/RobotoCondensed-Bold.ttf'),
    'RobotoCondensed-Regular': require('./assets/fonts/RobotoCondensed-Regular.ttf')
  });

  if (!fontsLoaded) {
    return null;
  }

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={navigationStyles}>
        <Stack.Screen name="Composite Calendar" component={HomeScreen}/>
        <Stack.Screen name="Favorited events" component={FavoritesScreen} initialParams={{favorites: favorites}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const navigationStyles = StyleSheet.create({
    headerRight: () => (
      <Image
        source={require('./assets/Icons/maroon.png')}
        style={{ width: 75, height: 75, marginRight: 10, marginTop: 8, }}
        resizeMode="contain"
      />
    ),
    headerStyle: {
      backgroundColor: 'maroon',
    },
    headerTintColor: '#fff', 
    headerTitleStyle: {
      marginBottom: 15,
      fontFamily: 'RobotoCondensed-Bold', 
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
  button: {
    backgroundColor: 'maroon',
    width: 90,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,
  },
  smallButton: {
    backgroundColor: 'maroon',
    width: 80,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },  
  pressedStyle: {
    backgroundColor: 'rgba(87, 0, 0, 1.0)',
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