import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/typography';

interface AmountInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

/**
 * Amount input with overlaid ₹ prefix symbol.
 * Styled with exact reference frontend styles.
 */
const AmountInput: React.FC<AmountInputProps> = ({ value, onChangeText }) => {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.amountBox}>
      <View style={styles.symbolOverlay} pointerEvents="none">
        <Text style={styles.rupeeSymbol}>₹</Text>
      </View>
      <TextInput
        style={[styles.input, focused && styles.inputFocused]}
        value={value}
        onChangeText={onChangeText}
        placeholder="0"
        placeholderTextColor={Colors.gray}
        keyboardType="numeric"
        returnKeyType="done"
        inputMode="numeric"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  amountBox: {
    position: 'relative',
    width: '100%',
  },
  symbolOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 12,
    justifyContent: 'center',
    zIndex: 1,
  },
  rupeeSymbol: {
    fontFamily: Fonts.dmSansBold,
    fontSize: 18,
    color: Colors.black,
  },
  input: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 31,
    paddingRight: 12,
    borderWidth: 1.5,
    borderColor: Colors.black,
    borderRadius: 12,
    backgroundColor: Colors.white,
    color: Colors.black,
    fontFamily: Fonts.spaceGroteskBold,
    fontSize: 20,
  },
  inputFocused: {
    shadowColor: Colors.lime,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
  },
});

export default AmountInput;
