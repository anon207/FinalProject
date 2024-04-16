import { StyleSheet, Text, View, Pressable, } from 'react-native';
import React from 'react';

export const ChangeMonth = ({ currMonth, onForward, onBackward }) => {
    return(
       <View style={ChangeMonthStyles.monthChange}>
         <Pressable onPress={onBackward}>
           <Text style={{ fontSize: 30, fontFamily: 'RobotoCondensed-Regular' }}>{'<< '}</Text>
         </Pressable>
         <Text style={{ fontSize: 30, fontFamily: 'RobotoCondensed-Regular' }}> {currMonth} </Text>
         <Pressable onPress={onForward}>
           <Text style={{ fontSize: 30, fontFamily: 'RobotoCondensed-Regular' }}>{' >>'}</Text>
         </Pressable>
       </View>
     );
   };

   const ChangeMonthStyles = StyleSheet.create({
    monthChange: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      paddingBottom: 10,
    },
  });