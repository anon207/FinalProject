import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

export const AsyncStorageHandler = ({ dataKey, data, setData }) => {
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(dataKey);
        if (storedData !== null) {
          setData(JSON.parse(storedData));
        }
      } catch (error) {
        console.error(`Error loading ${dataKey} data:`, error);
      }
    };

    loadData();
  }, [dataKey, setData]);

  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem(dataKey, JSON.stringify(data));
      } catch (error) {
        console.error(`Error saving ${dataKey} data:`, error);
      }
    };

    saveData();
  }, [dataKey, data]);

  return null; 
};