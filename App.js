/*
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

function Day(props) {
  const day = props.day;
  return(
    <View>
      <Text style={{fontSize: 5}}>
        {day}
      </Text>
    </View>
  );
}

function Cell() {
  return(
    <View style={styles.cell}/>
  );
}

function Calendar() {
const calendarCells = [];
for (let i = 1; i <= 42; i++) {
  calendarCells.push(i);
}
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return(
    <ScrollView contentContainerStyle={styles.calendar}>
      {days.map((day, index) => (
        <Day 
        key={index}
        day={day}
        />
      ))}
      {calendarCells.map((index) => (
        <Cell 
        key={index}
        />
      ))}  
    </ScrollView>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <Calendar/>
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
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell:{
    height: 100,
    width: 54.02,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
  }
});
*/
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

function Day(props) {
  const day = props.day;
  return (
    <View style={styles.day}>
      <Text style={{ fontSize: 16 }}>{day}</Text>
    </View>
  );
}

function Cell(props) {
  index = props.day;
  return (
    <View style={styles.cell}> 
      <Text>
        {index}
      </Text>
    </View>
  );
}

function Calendar() {
  const calendarCells = [];
  for (let i = 1; i <= 42; i++) {
    calendarCells.push(i);
  }
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <ScrollView contentContainerStyle={styles.calendar}>
      <View style={styles.daysRow}>
        {days.map((day, index) => (
          <Day
            key={index}
            day={day}
          />
        ))}
      </View>
      <View style={styles.calendarGrid}>
        {calendarCells.map((index) => (
          <Cell
            key={index}
            day={index}
          />
        ))}
      </View>
    </ScrollView>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <Calendar />
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
  },
  calendar: {
    flexDirection: 'column', // Changed from 'row' to 'column'
    flexWrap: 'wrap',
  },
  daysRow: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  day: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  cell: {
    height: 70,
    width: 52,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
  },
});