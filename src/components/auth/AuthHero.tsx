import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/typography';

/**
 * Compact hero shown inside the auth card — app name + tagline.
 */
const AuthHero: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back 👋</Text>
      <Text style={styles.sub}>Sign in to your account to continue</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
  },
  title: {
    fontFamily: Fonts.spaceGroteskBold,
    fontSize: 20,
    letterSpacing: -0.5,
    color: Colors.black,
    marginBottom: 4,
  },
  sub: {
    fontFamily: Fonts.dmSans,
    fontSize: 12,
    color: Colors.gray,
  },
});

export default AuthHero;
