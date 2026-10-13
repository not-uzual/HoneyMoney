import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/typography';
import { login } from '../../services/api';
import { ModernInput } from '../common/ModernInput';

interface LoginFormProps {
  username: string;
  password: string;
  onUsernameChange: (text: string) => void;
  onPasswordChange: (text: string) => void;
  onSuccess?: () => void;
}

/**
 * Login form using ModernInput for styled inputs.
 */
const LoginForm: React.FC<LoginFormProps> = ({
  username,
  password,
  onUsernameChange,
  onPasswordChange,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Validation', 'Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      await login({ username: username.trim(), password });
      Alert.alert('Success', 'Logged in successfully!', [
        { text: 'OK', onPress: onSuccess },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.form}>
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Username</Text>
        <ModernInput
          value={username}
          onChangeText={onUsernameChange}
          placeholder="@username"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Password</Text>
        <ModernInput
          value={password}
          onChangeText={onPasswordChange}
          placeholder="Enter password"
          secureTextEntry
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />
      </View>

      <View>
        <View style={styles.shadow}></View>
        <TouchableOpacity
        style={[styles.saveBtn, loading && styles.saveBtnLoading]}
        onPress={handleSubmit}
        activeOpacity={0.85}
        disabled={loading}
      >
        <Text style={styles.saveBtnText}>{loading ? 'Signing in…' : 'Login →'}</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: { gap: 12 },
  fieldGroup: { gap: 5 },
  label: {
    fontFamily: Fonts.dmSansBold,
    fontSize: 11,
    color: Colors.black,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  saveBtn: {
    width: '100%',
    paddingVertical: 14,
    borderWidth: 2,
    borderColor: Colors.black,
    borderRadius: 13,
    backgroundColor: Colors.lime,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  saveBtnLoading: {
    opacity: 0.6,
  },
  saveBtnText: {
    fontFamily: Fonts.dmSansBold,
    fontSize: 14,
    color: Colors.black,
  },
  shadow: {
    position: 'absolute',
    top: 5,
    left: 0,
    right: -4,
    bottom: -5,
    borderRadius: 15,
    backgroundColor: Colors.black,
    zIndex: -1,
  },
});

export default LoginForm;
