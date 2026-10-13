import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/typography';
import { AuthMode } from '../../hooks/useAuthForm';

interface AuthSwitchProps {
  mode: AuthMode;
  onSwitch: (mode: AuthMode) => void;
}

const MODES: { key: AuthMode; label: string }[] = [
  { key: 'login', label: 'Login' },
  { key: 'signup', label: 'Sign Up' },
];

/**
 * Pill-style Login / Sign-Up toggle with lime active state and soft border.
 */
const AuthSwitch: React.FC<AuthSwitchProps> = ({ mode, onSwitch }) => {
  return (
    <View style={styles.container}>
      {MODES.map((m) => {
        const isActive = m.key === mode;
        return (
          <TouchableOpacity
            key={m.key}
            style={[styles.btn, isActive && styles.btnActive]}
            onPress={() => onSwitch(m.key)}
            activeOpacity={0.75}
          >
            <Text style={[styles.btnText, isActive && styles.btnTextActive]}>
              {m.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
    borderWidth: 2,
    borderColor: Colors.black,
    borderRadius: 14,
    backgroundColor: Colors.lightBg,
    flexDirection: 'row',
    gap: 4,
  },
  btn: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnActive: {
    backgroundColor: Colors.lime,
  },
  btnText: {
    fontFamily: Fonts.dmSansBold,
    fontSize: 12,
    color: Colors.gray,
  },
  btnTextActive: {
    color: Colors.black,
  },
});

export default AuthSwitch;
