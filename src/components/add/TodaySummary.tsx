import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/typography';
import { formatCurrency } from '../../utils/currency';

interface TodaySummaryProps {
  todaySpent: number;
}

/**
 * Today's spending summary card — mint border, modern palette.
 */
const TodaySummary: React.FC<TodaySummaryProps> = ({ todaySpent }) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.label}>TODAY&apos;S SPENDING</Text>
        <Text style={styles.amount}>{formatCurrency(todaySpent)}</Text>
        <Text style={styles.hint}>Keep your expenses in check ✦</Text>
      </View>
      {/* <View style={styles.badge}>
        <Text style={styles.badgeEmoji}>📤</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 2,
    borderColor: Colors.black,
    borderRadius: 18,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
  },
  label: {
    fontFamily: Fonts.dmSansBold,
    fontSize: 11,
    color: "#a0a099",
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
    fontWeight: 700
  },
  amount: {
    fontFamily: Fonts.spaceGroteskBold,
    fontSize: 26,
    color: Colors.black,
    letterSpacing: -1,
    marginBottom: 2,
  },
  hint: {
    fontFamily: Fonts.dmSans,
    fontSize: 10,
    color: Colors.gray,
  },
  badge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.lightBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
  },
  badgeEmoji: {
    fontSize: 22,
  },
});

export default TodaySummary;
