import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { useState } from 'react'

function ChangeMonth(props) {
  const { currMonth, onForward, onBackward } = props;
  return(
    <View style={styles.monthChange}>
      <Pressable onPress={onBackward}>
        <Text style={{fontSize: 30}}>{'<< '}</Text>  
      </Pressable>

      <Text style={{fontSize: 30}}> {currMonth} </Text>

      <Pressable onPress={onForward}>
        <Text style={{fontSize: 30}}>{' >>'}</Text>
      </Pressable>
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
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [currentMonth, setCurrentMonth] = useState(0);
  const calendarCells = [];
  
  if(months[currentMonth] === 'January' || months[currentMonth] === 'March' || months[currentMonth] === 'May' || months[currentMonth] === 'July' || months[currentMonth] === 'August' || months[currentMonth] === 'October' || months[currentMonth] === 'December') {
    for (let i = 1; i <= 31; i++) {
      calendarCells.push(i);
    }
  }
  if(months[currentMonth] === 'April' || months[currentMonth] === 'June' || months[currentMonth] === 'September' || months[currentMonth] === 'November') {
    for (let i = 1; i <= 30; i++) {
      calendarCells.push(i);
    }
  }
  if(months[currentMonth] === 'February') {
    for (let i = 1; i <= 29; i++) {
      calendarCells.push(i);
    }
  }

  const changeForward = () => {
    setCurrentMonth(currentMonth === 11 ? 0 : currentMonth + 1);
  }

  const changeBackward = () => {
    setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1);
  }

  return (
    <ScrollView contentContainerStyle={styles.calendar}>
      <ChangeMonth
      onForward={() => changeForward()}
      onBackward={() => changeBackward()}
      currMonth={months[currentMonth]}
      />
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
    paddingLeft: 2.5
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