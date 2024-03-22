import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

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
  return(
    <ScrollView contentContainerStyle={styles.calendar}>  
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
