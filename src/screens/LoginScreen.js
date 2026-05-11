import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors, spacing, typography } from '../theme';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { validateEmail } from '../utils/validation';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (text) => {
    setEmail(text);
    if (emailError) {
      const validation = validateEmail(text);
      setEmailError(validation.error);
    }
  };

  const handleLogin = () => {
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setEmailError(emailValidation.error);
      return;
    }
    navigation.replace('Home');
  };

  return (
    <View style={styles.root}>
      {/* ──────── HERO / TOP SECTION ──────── */}
      <View style={styles.hero}>
        <View style={styles.circle1} />
        <View style={styles.circle2} />

        <View style={styles.heroContent}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>HostelIn</Text>
          <Text style={styles.tagline}>Your perfect stay, just a tap away.</Text>
        </View>
      </View>

      {/* ──────── FORM CARD ──────── */}
      <KeyboardAvoidingView style={styles.cardWrapper} behavior={null}>
        <View style={styles.card}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">

            <View style={styles.section}>
              <Text style={styles.cardTitle}>Sign in</Text>
              <Text style={styles.cardSub}>Enter your credentials to continue</Text>
            </View>

            {/* ── Inputs ── */}
            <View style={styles.section}>
              <CustomInput
                label="Email"
                placeholder="hello@example.com"
                iconName="envelope"
                value={email}
                onChangeText={handleEmailChange}
                error={emailError}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <CustomInput
                label="Password"
                placeholder="••••••••"
                iconName="lock"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <TouchableOpacity style={styles.forgotRow}>
                <Text style={styles.forgotText}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            {/* ── Primary CTA ── */}
            <View style={styles.section}>
              <CustomButton title="Sign In" onPress={handleLogin} />
            </View>

            {/* ── Divider ── */}
            <View style={styles.section}>
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerLabel}>or sign in with</Text>
                <View style={styles.dividerLine} />
              </View>
            </View>

            {/* ── Social ── */}
            <View style={styles.section}>
              <View style={styles.socialRow}>
                <TouchableOpacity style={[styles.socialBtn, styles.googleBtn]}>
                  <Icon name="google" size={18} color="#EA4335" />
                  <Text style={[styles.socialLabel, { color: '#EA4335' }]}>Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.socialBtn, styles.fbBtn]}>
                  <Icon name="facebook" size={18} color="#1877F2" />
                  <Text style={[styles.socialLabel, { color: '#1877F2' }]}>Facebook</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* ── Footer ── */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>No account? </Text>
              <TouchableOpacity>
                <Text style={styles.footerLink}>Create one →</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  hero: {
    height: SCREEN_HEIGHT * 0.35,
    backgroundColor: colors.primary,
    overflow: 'hidden',
    justifyContent: 'center', // Centered logo
    alignItems: 'center',
  },
  circle1: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(255,255,255,0.06)',
    top: -100,
    right: -60,
  },
  circle2: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.08)',
    bottom: -50,
    left: -40,
  },
  heroContent: {
    alignItems: 'center',
    zIndex: 1,
  },
  logo: {
    width: 160, // Bigger logo
    height: 70,
    marginBottom: spacing.sm,
  },
  appName: {
    fontSize: 32,
    fontWeight: typography.weight.black,
    color: '#FFFFFF',
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: typography.weight.medium,
    marginTop: 4,
  },
  cardWrapper: {
    flex: 1,
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Clean white background
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -32,
    paddingTop: spacing.xl,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  section: {
    marginBottom: spacing.lg, // Consistent spacing throughout
    width: '100%',
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
    marginBottom: 4,
  },
  cardSub: {
    fontSize: 14,
    color: colors.text.secondary,
    fontWeight: typography.weight.medium,
  },
  forgotRow: {
    alignSelf: 'flex-end',
    marginTop: spacing.xs,
  },
  forgotText: {
    fontSize: 13,
    fontWeight: typography.weight.semiBold,
    color: colors.primary,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerLabel: {
    marginHorizontal: spacing.md,
    fontSize: 12,
    fontWeight: typography.weight.bold,
    color: '#94A3B8',
    textTransform: 'uppercase',
  },
  socialRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
    borderWidth: 1.5,
    backgroundColor: '#FFFFFF',
  },
  googleBtn: {
    borderColor: '#FEE2E2',
  },
  fbBtn: {
    borderColor: '#DBEAFE',
  },
  socialLabel: {
    fontSize: 14,
    fontWeight: typography.weight.semiBold,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  footerText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: typography.weight.bold,
    color: colors.primary,
  },
});

export default LoginScreen;
