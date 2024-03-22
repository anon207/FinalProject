import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

function ChangeMonth() {
  return(
    <View style={styles.monthChange}>
      <Text> Month </Text>
    </View>
  );
}

function DayRow() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return (
    <View style={styles.daysRow}>
        {days.map((day, index) => (
          <Day
            key={index}
            day={day}
          />
        ))}
    </View>
  );
}

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

  return (
    <ScrollView contentContainerStyle={styles.calendar}>
      <ChangeMonth/>
      <DayRow/>
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
    marginTop: 50,
  },
  calendar: {
    flexDirection: 'column', 
    flexWrap: 'wrap',
  },
  daysRow: {
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
    height: 100,
    width: 52,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
  },
  monthChange: {
    alignItems: 'center',
    justifyContent: 'flex',
  },
});