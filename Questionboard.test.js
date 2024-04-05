import * as React from 'react';
const QuestionsBoard = require('./Questionboard.js');
import { render, screen, userEvent } from '@testing-library/react-native';

jest.useFakeTimers();

test('form submits two answers', async () => {
  const questions = ['q1', 'q2'];
  const onSubmit = jest.fn();

  const user = userEvent.setup();
  render(<QuestionsBoard questions={questions} onSubmit={onSubmit} />);

  const answerInputs = screen.getAllByLabelText('answer input');

  // simulates the user focusing on TextInput and typing text one char at a time
  await user.type(answerInputs[0], 'a1');
  await user.type(answerInputs[1], 'a2');

  // simulates the user pressing on any pressable element
  await user.press(screen.getByRole('button', { name: 'Submit' }));

  expect(onSubmit).toHaveBeenCalledWith({
    '1': { q: 'q1', a: 'a1' },
    '2': { q: 'q2', a: 'a2' },
  });
});