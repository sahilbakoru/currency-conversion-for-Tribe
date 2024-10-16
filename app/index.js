import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import {create} from 'zustand';
import {AsyncStorage} from '@react-native-async-storage/async-storage';

// Define Zustand store
const useStore = create((set) => ({
  rates: [],
  setRates: async (newRates) => {
    await AsyncStorage.setItem('currencyRates', JSON.stringify(newRates));
    set({ rates: newRates });
  },
  fetchRates: async () => {
    const response = await fetch('https://www.floatrates.com/daily/usd.json');
    const data = await response.json();
    const ratesArray = Object.keys(data).map(key => ({
      country: data[key].name,
      currency: data[key].code,
      rate: data[key].rate,
      lastUpdate: data[key].date,
    }));
    ratesArray.sort((a, b) => a.rate - b.rate); // Sort by conversion rate
    set({ rates: ratesArray });
    await AsyncStorage.setItem('currencyRates', JSON.stringify(ratesArray));
  },
  loadStoredRates: async () => {
    const storedRates = await AsyncStorage.getItem('currencyRates');
    if (storedRates) {
      set({ rates: JSON.parse(storedRates) });
    }
  },
}));

const App = () => {
  const { rates, fetchRates, loadStoredRates } = useStore();

  useEffect(() => {
    const fetchData = async () => {
      await loadStoredRates();
      await fetchRates();
    };

    fetchData();

    const interval = setInterval(fetchRates, 10000); // Fetch every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={rates}
        keyExtractor={(item) => item.currency}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.text}>{item.country} ({item.currency})</Text>
            <Text style={styles.text}>Rate: {item.rate}</Text>
            <Text style={styles.text}>Last Updated: {item.lastUpdate}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 16,
  },
});

export default App;