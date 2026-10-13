import React, { useState } from 'react';
import {
  TextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/typography';

export interface ModernInputProps extends TextInputProps {}

/**
 * ModernInput — styled TextInput using exact reference frontend styles.
 * 1.5px black border, 12px radius, white bg.
 * Focus state: 2px 2px lime shadow.
 */
export const ModernInput: React.FC<ModernInputProps> = (props) => {
  const [focused, setFocused] = useState(false);

  return (
    <TextInput
      {...props}
      style={[
        styles.input,
        focused && styles.inputFocused,
        props.style,
      ]}
      onFocus={(e) => {
        setFocused(true);
        if (props.onFocus) props.onFocus(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        if (props.onBlur) props.onBlur(e);
      }}
      placeholderTextColor={props.placeholderTextColor ?? Colors.gray}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1.5,
    borderColor: Colors.black,
    borderRadius: 12,
    backgroundColor: Colors.white,
    color: Colors.black,
    fontSize: 13,
    fontFamily: Fonts.dmSans,
  },
  inputFocused: {
    shadowColor: Colors.lime,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
  },
});

