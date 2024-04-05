import * as React from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

export function QuestionsBoard({ questions, onSubmit }) {
  const [data, setData] = React.useState({});

  return (
    <ScrollView>
      {questions.map((q, index) => {
        return (
          <View key={q}>
            <Text>{q}</Text>
            <TextInput
              accessibilityLabel="answer input"
              accessibilityHint="input"
              onChangeText={(text) => {
                setData((state) => ({
                  ...state,
                  [index + 1]: { q, a: text },
                }));
              }}
            />
          </View>
        );
      })}
      <Pressable accessibilityRole={'button'} onPress={() => onSubmit(data)}>
        <Text>Submit</Text>
      </Pressable>
    </ScrollView>
  );
}

module.exports = QuestionsBoard;