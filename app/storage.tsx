import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReactNode } from 'react';

export const storeData = async (value: string): Promise<void> => {
    try {
        await AsyncStorage.setItem('my-key', value);
    } catch (e) {
        console.error("Erro ao salvar dados:", e);
    }
}

export const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('my-key');
      if (value !== null) {
        return value
      }
    } catch (e) {

    }
};


