import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Animated,
  StatusBar
} from 'react-native';
import { Colors } from '../constants/colors';
import { Fonts } from '../constants/typography';
import { useAuthForm } from '../hooks/useAuthForm';
import AuthSwitch from '../components/auth/AuthSwitch';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import GoogleAuthButton from '../components/auth/GoogleAuthButton';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * Modern, luxurious Auth screen.
 *
 * Layout:
 *  - Black status bar (untouched)
 *  - Soft slate (#f1f5f9) background with decorative colour blobs
 *  - Brand hero section (top ~35% of screen)
 *  - White form card slides up from below with lime hard-shadow
 *  - ModernInput boxes, Login/Signup toggle, Google OAuth button
 */
const AuthScreen: React.FC = () => {
  const authForm = useAuthForm();

  // Slide-up animation for the form card
  const cardAnim = useRef(new Animated.Value(80)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const heroOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Hero fades in first
    Animated.timing(heroOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Card slides up with spring feel
    Animated.parallel([
      Animated.spring(cardAnim, {
        toValue: 0,
        damping: 18,
        stiffness: 120,
        useNativeDriver: true,
      }),
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 400,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLoginSuccess = () => authForm.resetLoginForm();
  const handleSignupSuccess = () => {
    authForm.resetSignupForm();
    authForm.switchMode('login');
  };
  const handleGoogleSignIn = () => {
    // TODO: integrate expo-auth-session Google OAuth
    console.log('Google sign-in pressed');
  };

  return (
    <>
    <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <View style={styles.container}>
            {/* ── Decorative blobs ── */}
            <View style={[styles.blob, styles.blobMint]} />
            <View style={[styles.blob, styles.blobPink]} />
            <View style={[styles.blob, styles.blobLime]} />

            {/* ── Hero section ── */}
            <Animated.View style={[styles.hero, { opacity: heroOpacity }]}>
              <Text style={styles.heroTitle}>HONEY{'\n'}MONEY</Text>
              <View style={styles.badgeRow}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>No more financial surprises ✦</Text>
                </View>
              </View>
            </Animated.View>

            {/* ── Animated form card ── */}
            <Animated.View
              style={[
                styles.cardWrapper,
                {
                  opacity: cardOpacity,
                  transform: [{ translateY: cardAnim }],
                },
              ]}
            >
              <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                <View style={styles.card}>
                  {/* Tab switcher */}
                  <AuthSwitch mode={authForm.mode} onSwitch={authForm.switchMode} />

                  {/* Active form */}
                  {authForm.mode === 'login' ? (
                    <LoginForm
                      username={authForm.loginUsername}
                      password={authForm.loginPassword}
                      onUsernameChange={authForm.setLoginUsername}
                      onPasswordChange={authForm.setLoginPassword}
                      onSuccess={handleLoginSuccess}
                    />
                  ) : (
                    <SignupForm
                      name={authForm.signupName}
                      username={authForm.signupUsername}
                      email={authForm.signupEmail}
                      phone={authForm.signupPhone}
                      password={authForm.signupPassword}
                      confirmPassword={authForm.signupConfirmPassword}
                      onNameChange={authForm.setSignupName}
                      onUsernameChange={authForm.setSignupUsername}
                      onEmailChange={authForm.setSignupEmail}
                      onPhoneChange={authForm.setSignupPhone}
                      onPasswordChange={authForm.setSignupPassword}
                      onConfirmPasswordChange={authForm.setSignupConfirmPassword}
                      onSuccess={handleSignupSuccess}
                    />
                  )}

                  {/* ── Divider ── */}
                  <View style={styles.dividerRow}>
                    <View style={styles.dividerLine} />
                  </View>

                  {/* ── Google OAuth ── */}
                  <GoogleAuthButton onPress={handleGoogleSignIn} />
                </View>
              </ScrollView>
            </Animated.View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.lightBg,
    overflow: 'hidden',
  },

  // ── Decorative blobs ──
  blob: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.55,
  },
  blobMint: {
    width: 200,
    height: 200,
    backgroundColor: "black",
    top: -60,
    right: -50,
  },
  blobPink: {
    width: 140,
    height: 140,
    backgroundColor: "yellowgreen",
    top: 100,
    left: -40,
  },
  blobLime: {
    width: 110,
    height: 110,
    backgroundColor: "black",
    top: 105,
    right: 150,
  },

  // ── Hero ──
  hero: {
    paddingHorizontal: 28,
    paddingTop: 36,
    paddingBottom: 24,
  },
  badgeRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  badge: {
    backgroundColor: Colors.black,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  badgeText: {
    color: Colors.lime,
    fontFamily: Fonts.dmSansBold,
    fontSize: 11,
    letterSpacing: 1,
  },
  heroTitle: {
    fontFamily: Fonts.spaceGroteskBold,
    fontSize: 54,
    letterSpacing: -3,
    color: Colors.black,
    lineHeight: 52,
    marginBottom: 10,
  },

  // ── Form card (slides up) ──
  cardWrapper: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  card: {
    marginHorizontal: 18,
    padding: 20,
    gap: 14,
  },

  // ── Divider ──
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 4,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.line,
  }
});

export default AuthScreen;
