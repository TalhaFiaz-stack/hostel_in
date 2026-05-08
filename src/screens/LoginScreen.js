import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors, spacing, typography } from '../theme';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { validateEmail } from '../utils/validation';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (text) => {
    setEmail(text);
    // If there was an error, re-validate as the user types
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

    // Proceed with login
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboardView}>
        
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          
          <View style={styles.section}>
            <Image 
              source={require('../assets/logo2.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue to HostelIn</Text>
          </View>

          <View style={styles.section}>
            <CustomInput
              label="Email Address"
              placeholder="name@company.com"
              value={email}
              onChangeText={handleEmailChange}
              error={emailError}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <CustomInput
              label="Password"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <CustomButton 
              title="Sign In"
              onPress={handleLogin}
            />
          </View>

          <View style={styles.section}>
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <Icon name="google" size={24} color="#DB4437" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton}>
                <Icon name="facebook" size={24} color="#4267B2" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footerSection}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity>
              <Text style={styles.signUpText}>Create account</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.content,
    paddingVertical: spacing.xxl,
    flexGrow: 1,
    justifyContent: 'center',
  },
  section: {
    marginBottom: spacing.lg,
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: 140,
    height: 80,
  },
  title: {
    fontSize: typography.size.h2,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    letterSpacing: typography.letterSpacing.tight,
  },
  subtitle: {
    fontSize: typography.size.body,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotText: {
    fontSize: typography.size.small,
    fontWeight: typography.weight.medium,
    color: colors.primary,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    marginHorizontal: spacing.md,
    fontSize: 14,
    color: colors.text.secondary,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.lg,
  },
  socialButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  footerSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: typography.size.small,
    color: colors.text.secondary,
  },
  signUpText: {
    fontSize: typography.size.small,
    fontWeight: typography.weight.semiBold,
    color: colors.primary,
  },
});

export default LoginScreen;
