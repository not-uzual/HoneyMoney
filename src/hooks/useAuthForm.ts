import { useState } from 'react';

export type AuthMode = 'login' | 'signup';

/**
 * Custom hook encapsulating Auth screen state.
 * Mirrors the setAuthMode logic from referenceFrontend/scripts.js.
 */
export const useAuthForm = () => {
  const [mode, setMode] = useState<AuthMode>('login');

  // Login form state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

  const resetLoginForm = () => {
    setLoginUsername('');
    setLoginPassword('');
  };

  const resetSignupForm = () => {
    setSignupName('');
    setSignupUsername('');
    setSignupEmail('');
    setSignupPhone('');
    setSignupPassword('');
    setSignupConfirmPassword('');
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
  };

  return {
    mode,
    switchMode,
    // Login
    loginUsername,
    setLoginUsername,
    loginPassword,
    setLoginPassword,
    resetLoginForm,
    // Signup
    signupName,
    setSignupName,
    signupUsername,
    setSignupUsername,
    signupEmail,
    setSignupEmail,
    signupPhone,
    setSignupPhone,
    signupPassword,
    setSignupPassword,
    signupConfirmPassword,
    setSignupConfirmPassword,
    resetSignupForm,
  };
};
