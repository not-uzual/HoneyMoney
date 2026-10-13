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
import { signUp } from '../../services/api';
import { ModernInput } from '../common/ModernInput';

interface SignupFormProps {
  name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  onNameChange: (text: string) => void;
  onUsernameChange: (text: string) => void;
  onEmailChange: (text: string) => void;
  onPhoneChange: (text: string) => void;
  onPasswordChange: (text: string) => void;
  onConfirmPasswordChange: (text: string) => void;
  onSuccess?: () => void;
}

/**
 * Signup form using ModernInput for all fields.
 */
const SignupForm: React.FC<SignupFormProps> = ({
  name,
  username,
  email,
  phone,
  password,
  confirmPassword,
  onNameChange,
  onUsernameChange,
  onEmailChange,
  onPhoneChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !username.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      Alert.alert('Validation', 'Please fill in all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Validation', 'Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      await signUp({
        name: name.trim(),
        username: username.trim(),
        email: email.trim(),
        phone_no: phone.trim(),
        password,
      });
      Alert.alert('Success', 'Account created!', [{ text: 'OK', onPress: onSuccess }]);
    } finally {
      setLoading(false);
    }
  };

  const field = (
    label: string,
    value: string,
    onChange: (t: string) => void,
    opts?: {
      placeholder?: string;
      secureTextEntry?: boolean;
      keyboardType?: 'default' | 'email-address' | 'phone-pad';
      returnKeyType?: 'next' | 'done';
      autoCapitalize?: 'none' | 'words';
      onSubmitEditing?: () => void;
    }
  ) => (
    <View style={styles.fieldGroup}>
      <Text style={styles.label}>{label}</Text>
      <ModernInput
        value={value}
        onChangeText={onChange}
        placeholder={opts?.placeholder}
        secureTextEntry={opts?.secureTextEntry}
        keyboardType={opts?.keyboardType ?? 'default'}
        returnKeyType={opts?.returnKeyType ?? 'next'}
        autoCapitalize={opts?.autoCapitalize ?? 'none'}
        autoCorrect={false}
        onSubmitEditing={opts?.onSubmitEditing}
      />
    </View>
  );

  return (
    <View style={styles.form}>
      {field('Full Name', name, onNameChange, { placeholder: 'Your name', autoCapitalize: 'words' })}
      {field('Username', username, onUsernameChange, { placeholder: '@username' })}
      {field('Email', email, onEmailChange, { placeholder: 'you@example.com', keyboardType: 'email-address' })}
      {field('Phone', phone, onPhoneChange, { placeholder: '+91 98765 XXXXX', keyboardType: 'phone-pad' })}
      {field('Password', password, onPasswordChange, { placeholder: 'Create password', secureTextEntry: true })}
      {field('Confirm Password', confirmPassword, onConfirmPasswordChange, {
        placeholder: 'Repeat password',
        secureTextEntry: true,
        returnKeyType: 'done',
        onSubmitEditing: handleSubmit,
      })}

      <View>
        <View style={styles.shadow}></View>
        <TouchableOpacity
        style={[styles.saveBtn, loading && styles.saveBtnLoading]}
        onPress={handleSubmit}
        activeOpacity={0.85}
        disabled={loading}
      >
        <Text style={styles.saveBtnText}>{loading ? 'Creating…' : 'Create Account →'}</Text>
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
  }
});

export default SignupForm;
