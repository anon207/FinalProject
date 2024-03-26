import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Pressable, Button } from 'react-native';
import { useState } from 'react';
import SportsData from './SportsData.json';


const ChangeMonth = ({ currMonth, onForward, onBackward }) => (
  <View style={styles.monthChange}>
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
    <View style={styles.daysRow}>
      {days.map((day, index) => (
        <Day key={index} day={day} />
      ))}
    </View>
  );
};

const Day = ({ day }) => (
  <View style={styles.day}>
    <Text style={styles.dayFont}>{day}</Text>
  </View>
);

const Cell = ({ day, currentMonth }) => {
  currentMonth+=1;
  const fullDate = `2024-${currentMonth > 9 ? currentMonth : '0' + currentMonth}-${day > 9 ? day : '0' + day}`;
  const eventsOfDay = SportsData.filter(event => event.date === fullDate);

  // const showEvents = () => {

  // };

  return(
    <Pressable>
      {({ pressed }) => (
        <View style={[styles.cell, pressed && styles.pressedCell]}>
          <View style={styles.cellDay}>
            <Text style={styles.dayText}>{day}</Text>
          </View>
          <View style={styles.eventPosition}>
            {eventsOfDay.length > 0 && 
              <Text style={styles.evt}>{eventsOfDay.length} Events</Text>
            }
          </View>
        </View>
      )}
    </Pressable>
  );
};

{/* {eventsOfDay.map((event, index) => (
          <View key={index}> 
            <Text>{event.name}</Text>
            <Text>{event.time}</Text>
            <Text>{event.location}</Text>
          </View>
        ))} */}

const Calendar = () => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [currentMonth, setCurrentMonth] = useState(0);

  const daysInMonth = (month) => {
    if (['January', 'March', 'May', 'July', 'August', 'October', 'December'].includes(month)) return 31;
    if (['April', 'June', 'September', 'November'].includes(month)) return 30;
    if (month === 'February') return 29;
    return 0;
  };

  const calendarCells = [];
  for(let i = 1; i < daysInMonth(months[currentMonth])+1; i++) {
    calendarCells.push(i);
  }

  const changeMonth = (increment) => {
    setCurrentMonth((prevMonth) => (prevMonth + increment + 12) % 12);
  };

  return (
    <ScrollView contentContainerStyle={styles.calendar}>
      <ChangeMonth
        onForward={() => changeMonth(1)}
        onBackward={() => changeMonth(-1)}
        currMonth={months[currentMonth]}
      />
      <DayRow />
      <View style={styles.calendarGrid}>
        {calendarCells.map((day) => (
          <Cell key={day} day={day} currentMonth={currentMonth} />
        ))}
      </View>
    </ScrollView>
  );
};

const MakeFilterButton = ({onClose}) =>{
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

  return (
    <View style={styles.popup}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {listSports.map((item, index) => (
          <Pressable key={index} onPress={() => console.log(item)}>
            {({ pressed }) => (
              <Text style={[styles.item, { backgroundColor: pressed ? '#ddd' : 'transparent' }]}>
                {item}
              </Text>
            )}
          </Pressable>
        ))}
      </ScrollView>
      <Button title="Close" onPress={onClose} />
    </View>
  );
};

const FilterButton = () =>{
const [showPopup,setShowPopup] = useState(false);

const togglePopup = () => {
  setShowPopup(!showPopup);
};

return (
  <View style={styles.container}>
    <Button title="Show List" onPress={togglePopup} />
    {showPopup && <MakeFilterButton onClose={togglePopup} />}
  </View>
);
};
export default function App() {
  return (
    <View style={styles.container}>
      <Calendar />
      <FilterButton/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  calendar: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    paddingLeft: 2.5,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  day: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  cell: {
    height: 100,
    width: 55,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
  },
  monthChange: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingBottom: 10,
  },
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
  cellDay: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 15,
  },
  dayText: {
    fontFamily: 'RobotoCondensed-Bold',
    fontWeight: 'bold',
    fontSize: 18,
  },
  evt: {
    fontFamily: 'RobotoCondensed-Bold',
    fontWeight: 'bold',
    fontSize: 10,
    color: '#666666'
  },
  eventPosition: {
    alignItems: 'center',
    paddingBottom: 15,
  },
  dayFont: {
    fontFamily: 'RobotoCondensed-Bold',
    fontWeight: 'bold',
    fontSize: 18, 
    color: '#666666'
  },
  pressedCell: {
    backgroundColor: 'rgba(173, 216, 230, 0.5)',
  },
});
