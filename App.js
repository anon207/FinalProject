import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Pressable,Button } from 'react-native';
import { useState } from 'react';
import SportsData from './SportsData.json';

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

const Cell = ({ day, currentMonth, toggleEvents, isSelected }) => {
  currentMonth+=1;
  const fullDate = `2024-${currentMonth > 9 ? currentMonth : '0' + currentMonth}-${day > 9 ? day : '0' + day}`;
  const eventsOfDay = SportsData.filter(event => event.date === fullDate);
  return(
    <Pressable onPress={() => toggleEvents(day)}>
      {({ pressed }) => (
        <View style={[CellStyles.cell, isSelected && CellStyles.selectedCell, pressed && CellStyles.pressedCell]}>
          <View style={CellStyles.cellDay}>
            <Text style={CellStyles.dayText}>{day}</Text>
          </View>
          <View style={CellStyles.eventPosition}>
            {(eventsOfDay.length && !isSelected) > 0 && 
              <Text style={CellStyles.evt}>{eventsOfDay.length} Events</Text>
            }
            {isSelected &&
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

const CalendarRow = ({ days, currentMonth, toggleEvents, selectedDay}) => {
  return (
    <View style={CalendarRowStyles.calendarGrid}>
      {days.map(day => (
        <Cell key={day} day={day} currentMonth={currentMonth} toggleEvents={toggleEvents} isSelected={selectedDay === day}/>
      ))}
    </View>
  );
};

const Calendar = () => {
  const [selectedDay, setSelectedDay] = useState(null);

  const toggleEvents = (day) => {
    setSelectedDay(selectedDay === day ? null : day);
  };

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
      <ChangeMonth
        onForward={() => changeMonth(1)}
        onBackward={() => changeMonth(-1)}
        currMonth={months[currentMonth]}
      />
      <DayRow />
      <View style={CalendarStyles.calendarGrid}>
      {calendarRows.map((days, index) => (
        <View key={index}>
          <CalendarRow key={index} days={days} currentMonth={currentMonth} toggleEvents={toggleEvents} selectedDay={selectedDay}/>
          {calendarRows[index].includes(selectedDay) && (
              <View style={CalendarStyles.eventsContainer}>
                <View style={CalendarStyles.evtView}> 
                  <View style={CalendarStyles.homeCircle}/>
                  <Text>Home</Text>
                </View>
                <View style={CalendarStyles.evtView}> 
                  <View style={CalendarStyles.awayCircle}/>
                  <Text>Away</Text>
                </View>
              </View>
            )}
        </View>
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
    <View style={MakeFilterButtonStyles.popup}>
      <ScrollView contentContainerStyle={MakeFilterButtonStyles.scrollViewContent}>
        {listSports.map((item, index) => (
          <Pressable key={index} onPress={() => console.log(item)}>
            {({ pressed }) => (
              <Text style={[MakeFilterButtonStyles.item, { backgroundColor: pressed ? '#ddd' : 'transparent' }]}>
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
    fontFamily: 'RobotoCondensed-Bold',
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
    fontFamily: 'RobotoCondensed-Bold',
    fontWeight: 'bold',
    fontSize: 18,
  },
  eventPosition: {
    alignItems: 'center',
    paddingBottom: 15,
  },
  evt: {
    fontFamily: 'RobotoCondensed-Bold',
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
  },
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
});
