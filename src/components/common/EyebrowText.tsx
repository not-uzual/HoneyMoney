import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/typography';

interface EyebrowTextProps {
  children: string;
  /** Optional color override — defaults to gray */
  color?: string;
}

/**
 * Small all-caps label with letter-spacing.
 * CSS: .eyebrow { color: var(--gray); font-size: 9px; font-weight: 700; letter-spacing: 1px; }
 */
const EyebrowText: React.FC<EyebrowTextProps> = ({
  children,
  color = Colors.gray,
}) => {
  return (
    <Text style={[styles.eyebrow, { color }]}>{children}</Text>
  );
};

const styles = StyleSheet.create({
  eyebrow: {
    color: Colors.gray,
    fontSize: 11,
    fontFamily: Fonts.dmSansBold,
    letterSpacing: 1,
    textTransform: "uppercase",
    includeFontPadding: false,
  },
});

export default EyebrowText;
