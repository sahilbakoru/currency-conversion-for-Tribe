// store.js
import {create} from 'zustand';
import {AsyncStorage} from '@react-native-async-storage/async-storage';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const useCurrencyStore = create(
  persist(
    (set) => ({
      currencies: [],
      fetchRates: async () => {
        try {
          const response = await axios.get('https://www.floatrates.com/daily/usd.json');
          const rates = Object.values(response.data).map((rate) => ({
            country: rate.name,
            currency: rate.code,
            rate: rate.rate,
            date: new Date(rate.date).toLocaleString(),
          }));
          set({ currencies: rates });
        } catch (error) {
          console.error('Error fetching rates:', error);
        }
      },
    }),
    {
      name: 'currency-storage', // The name of the storage key
      getStorage: () => AsyncStorage,
    }
  )
);

export default useCurrencyStore;
