
<img src="https://github.com/user-attachments/assets/cb4d7059-e95b-4bf1-9a6e-a93066ef4f4b" width="500" />

# Currency Rates App

A cross-platform React Native application that fetches and displays live currency conversion rates. The app retrieves data from an external API and updates the displayed rates every 10 seconds, ensuring the latest conversion information is always available.

## Features

- **Real-time Data**: Fetches currency rates from the API on load and refreshes every 10 seconds.
- **Persistent Data**: Optionally stores fetched data locally with AsyncStorage.
- **Search**: Provides a search bar to filter currency rates by country or currency name.
- **Top Currencies**: Highlights the currencies with the highest and lowest conversion rates at the top.

## Technologies Used

- **React Native**: For building the mobile application.
- **Zustand**: For efficient state management.
- **AsyncStorage**: For persisting data locally.
- **Axios**: For making HTTP requests to retrieve currency rates.
- **Expo**: For running and testing the app.


### Steps to Run the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/sahilbakoru/currency-conversion-for-Tribe

2. Install dependencies:
   ```bash
    npm install

3. Start the application:
   ```bash
     npx expo start

4. Open the app:
   
     Use the Expo Go app on your mobile device or an emulator to scan the QR code and run the application.

## Usage
Once the app is running, it will display a list of currency conversion rates, which will update automatically every 10 seconds. You can search for specific currencies, and the highest/lowest conversion rates will always be highlighted at the top.
