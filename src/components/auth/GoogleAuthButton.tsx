import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Animated,
  useRef,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/typography';

interface GoogleAuthButtonProps {
  onPress: () => void;
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ onPress }) => {
  const scale = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 30,
    }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <View style={styles.shadow} />
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        {/* Google "G" text logo */}
        
        <Text style={styles.label}>Continue with Google</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black,
    borderRadius: 13,
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: Colors.black,
    gap: 10,
  },
  label: {
    fontFamily: Fonts.dmSansBold,
    fontSize: 14,
    color: Colors.lime,
  },
  shadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: -5,
    bottom: -5,
    borderRadius: 13,
    backgroundColor: Colors.lime,
    zIndex: -1,
  }
});

export default GoogleAuthButton;
