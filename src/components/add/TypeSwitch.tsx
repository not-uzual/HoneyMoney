import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/typography';
import { TransactionType } from '../../constants/categories';

interface TypeSwitchProps {
  selected: TransactionType;
  onSelect: (type: TransactionType) => void;
}

const TYPES: { key: TransactionType; label: string; emoji: string }[] = [
  { key: 'DEBIT', label: 'Debit', emoji: '↑' },
  { key: 'CREDIT', label: 'Credit', emoji: '↓' },
];

/**
 * Debit / Credit toggle.
 * Debit active → lime. Credit active → mint. Both use black hard shadow.
 */
const TypeSwitch: React.FC<TypeSwitchProps> = ({ selected, onSelect }) => {
  return (
    <View style={styles.container}>
      {TYPES.map((type) => {
        const isActive = type.key === selected;
        const activeBg = Colors.lime;
        return (
          <TouchableOpacity
            key={type.key}
            style={[styles.btn, isActive && { backgroundColor: activeBg }]}
            onPress={() => onSelect(type.key)}
            activeOpacity={0.8}
          >
            <Text style={[styles.emoji, isActive && styles.emojiActive]}>
              {type.emoji}
            </Text>
            <Text style={[styles.btnText, isActive && styles.btnTextActive]}>
              {type.label}
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
    borderWidth: 1.5,
    borderColor: Colors.black,
    borderRadius: 16,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    gap: 6,
  },
  btn: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  emoji: {
    fontSize: 14,
    color: Colors.gray,
  },
  emojiActive: {
    color: Colors.black,
  },
  btnText: {
    fontFamily: Fonts.dmSansBold,
    fontSize: 13,
    color: Colors.gray,
  },
  btnTextActive: {
    color: Colors.black,
  },
});

export default TypeSwitch;
