import './global.css';
import React, { useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_600SemiBold,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';
import {
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from '@expo-google-fonts/space-grotesk';

import AuthScreen from './src/screens/AuthScreen';
import AddTransactionScreen from './src/screens/AddTransactionScreen';
import { Colors } from './src/constants/colors';

/**
 * Simple state-based screen navigator.
 * No external navigation library required.
 * Initial screen: Auth → after successful auth → AddTransaction
 */
export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'auth' | 'add'>('auth');

  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_600SemiBold,
    DMSans_700Bold,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  });

  // Show a paper-colored loading screen while fonts load
  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={Colors.lime} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      {currentScreen !== 'auth' ? (
        <AuthScreen />
      ) : (
        <AddTransactionScreen />
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: Colors.paper,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
