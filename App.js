import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { useState } from 'react';

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
    <Text style={{ fontSize: 16 }}>{day}</Text>
  </View>
);

const Cell = ({ day }) => (
  <View style={styles.cell}>
    <Text>{day}</Text>
  </View>
);

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
          <Cell key={day} day={day} />
        ))}
      </View>
    </ScrollView>
  );
};

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
    paddingLeft: 2.5,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
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
  },
});