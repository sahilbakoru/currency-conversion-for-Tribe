import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import useCurrencyStore from '../components/store';

export default function App() {
  const { currencies, fetchRates } = useCurrencyStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCurrencies, setFilteredCurrencies] = useState([]);
  const [highestCurrency, setHighestCurrency] = useState(null);
  const [lowestCurrency, setLowestCurrency] = useState(null);

  useEffect(() => {
    fetchRates();
    const interval = setInterval(() => {
      fetchRates();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Identify the highest and lowest conversion rates
  useEffect(() => {
    if (currencies.length > 0) {
      const sortedByRate = [...currencies].sort((a, b) => b.rate - a.rate);
      setHighestCurrency(sortedByRate[0]);
      setLowestCurrency(sortedByRate[sortedByRate.length - 1]);
    }
  }, [currencies]);

  // Filter the rest of the currencies based on the search query
  useEffect(() => {
    const result = currencies.filter((currency) =>
      (currency.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        currency.currency.toLowerCase().includes(searchQuery.toLowerCase())) &&
      currency !== highestCurrency && currency !== lowestCurrency
    );
    setFilteredCurrencies(result);
  }, [searchQuery, currencies, highestCurrency, lowestCurrency]);

  // Render the two fixed currencies (highest and lowest) in a compact, side-by-side layout
  const renderTopCurrency = (item) => (
    <View style={styles.compactCard}>
      <Text style={styles.country}>{item.country}</Text>
      <Text style={styles.rate}>{item.rate.toFixed(2)}</Text>
    </View>
  );

  // Render the rest of the currencies in a clean, consistent card
  const renderCurrency = (item) => (
    <View style={styles.regularCard}>
      <View style={styles.row}>
        <Text style={styles.label}>Country:</Text>
        <Text style={styles.value}>{item.country}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Currency:</Text>
        <Text style={styles.value}>{item.currency}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Conversion Rate:</Text>
        <Text style={styles.value}>{item.rate.toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Last Updated:</Text>
        <Text style={styles.value}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency Conversion Rates of USD</Text>

      {/* Search Box (Fixed at the top) */}
      <TextInput
        style={styles.searchBox}
        placeholder="Search by country or currency"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Render the two fixed currencies (Highest and Lowest) */}
      <View style={styles.fixedTopCurrencies}>
        {highestCurrency && renderTopCurrency(highestCurrency)}
        {lowestCurrency && renderTopCurrency(lowestCurrency)}
      </View>

      {/* Render the rest of the currencies based on search */}
      <FlatList
        data={filteredCurrencies}
        keyExtractor={(item) => item.currency}
        renderItem={({ item }) => renderCurrency(item)}
        ListEmptyComponent={
          <Text style={styles.noResults}>No currencies found.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  searchBox: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  fixedTopCurrencies: {
    flexDirection: 'row', // Arrange the two top currencies side by side
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  compactCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  country: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  rate: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  // Style for regular currency cards (search results)
  regularCard: {
    backgroundColor: '#fafafa',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,

  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
    justifyContent:'space-between'
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
    width: 120,
  },
  value: {
    color: '#555',
  },
  noResults: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
});
