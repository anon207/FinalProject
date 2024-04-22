import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import React from 'react';

export const MakeFilterButton = ({ onClose, filterTeams, selectedTeams, setSelectedTeams, selectAllTeams, NoTeams }) =>{
    const listSports = ["Baseball", "Men's Basketball", "Women's Basketball", "Men's Cross Country",
    "Women's Cross Country", "Men's Track & Field", "Women's Track & Field", "Field Hockey",
    "Men's Soccer", "Women's Soccer", "Men's Volleyball", "Women's Volleyball", "Softball", 
    "Men's Lacrosse", "Women's Lacrosse", "Men's Tennis", "Women's Tennis", "Men's Golf", "Men's Swimming",
    "Women's Swimming", "Wrestling", "Cycling"];

    const toggleTeamSelection = (team) => {
        if (!selectedTeams) {
        setSelectedTeams([team]); 
        } else if (selectedTeams.includes(team)) {
        setSelectedTeams(selectedTeams.filter(selectedTeam => selectedTeam !== team));
        } else {
        setSelectedTeams([...selectedTeams, team]);
        }
    };

    const All = () =>{
        selectAllTeams();
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
        <Pressable onPress={All}> 
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