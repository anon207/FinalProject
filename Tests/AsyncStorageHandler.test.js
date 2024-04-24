import React from 'react';
import { render } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageHandler } from '../Components/AsyncStorageHandler';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('AsyncStorageHandler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('loads data from AsyncStorage', async () => {
    const dataKey = 'testKey';
    const testData = { test: 'data' };
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(testData));

    const setDataMock = jest.fn();
    render(<AsyncStorageHandler dataKey={dataKey} setData={setDataMock} />);

    await AsyncStorage.getItem(dataKey);

    expect(AsyncStorage.getItem).toHaveBeenCalledWith(dataKey);
    expect(setDataMock).toHaveBeenCalledWith(testData);
  });

  test('saves data to AsyncStorage', async () => {
    const dataKey = 'testKey';
    const testData = { test: 'data' };

    const { rerender } = render(
      <AsyncStorageHandler dataKey={dataKey} data={testData} setData={() => {}} />
    );

    rerender(<AsyncStorageHandler dataKey={dataKey} data={testData} setData={() => {}} />);

    await expect(AsyncStorage.setItem).toHaveBeenCalledWith(dataKey, JSON.stringify(testData));
  });

  test('handles errors gracefully when loading data', async () => {
    const dataKey = 'testKey';
    const error = new Error('AsyncStorage error');
    AsyncStorage.getItem.mockRejectedValueOnce(error);

    console.error = jest.fn();

    render(<AsyncStorageHandler dataKey={dataKey} setData={() => {}} />);

    await AsyncStorage.getItem(dataKey);

    expect(console.error).toHaveBeenCalledWith(`Error loading ${dataKey} data:`, error);
  });

  test('handles errors gracefully when saving data', async () => {
    const dataKey = 'testKey';
    const testData = { test: 'data' };
    const error = new Error('AsyncStorage error');
    AsyncStorage.setItem.mockRejectedValueOnce(error);
  
    console.error = jest.fn();
  
    const { rerender } = render(
      <AsyncStorageHandler dataKey={dataKey} data={testData} setData={() => {}} />
    );
  
    rerender(<AsyncStorageHandler dataKey={dataKey} data={testData} setData={() => {}} />);
  
    await new Promise(resolve => setTimeout(resolve, 100));
  
    expect(console.error).toHaveBeenCalledWith(`Error saving ${dataKey} data:`, error);
  });
});