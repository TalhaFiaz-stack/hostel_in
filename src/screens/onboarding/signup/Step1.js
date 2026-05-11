import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, typography } from '../../../theme';
import { api } from '../../../services/api';
import OnboardingCard from '../../../components/OnboardingCard';
import CustomInput from '../../../components/CustomInput';
import VerifyInput from '../../../components/VerifyInput';
import { launchImageLibrary } from 'react-native-image-picker';

const Step1 = ({ onboardingData, updateOnboardingData, onNext, onCancel, onLoginPress }) => {
  const [loading, setLoading] = useState(false);
  const [verifyingCode, setVerifyingCode] = useState(false);
  const [referralError, setReferralError] = useState('');

  const handleImagePick = async () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
    };
    
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        Alert.alert('Error', 'Image picker error: ' + response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        updateOnboardingData({ registration_certificate: response.assets[0] });
      }
    });
  };

  const handleVerifyReferral = async () => {
    if (!onboardingData.referral_code) return;
    setVerifyingCode(true);
    setReferralError('');
    try {
      const response = await api.verifyReferralCode(onboardingData.referral_code);
      if (response.success) {
        updateOnboardingData({ referral_verified: true });
        Alert.alert('Success', 'Referral code verified!');
      } else {
        setReferralError('Invalid referral code');
      }
    } catch (error) {
      setReferralError('Verification failed');
    } finally {
      setVerifyingCode(false);
    }
  };

  const handleContinue = async () => {
    if (!onboardingData.hostel_name || !onboardingData.name || !onboardingData.email || !onboardingData.password || !onboardingData.phone) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    // Referral logic: Optional, but if provided, MUST be verified
    const hasReferral = onboardingData.referral_code && onboardingData.referral_code.trim() !== '';
    if (hasReferral && !onboardingData.referral_verified) {
      Alert.alert('Error', 'Please verify your referral code first, or clear the field to continue without one.');
      return;
    }

    setLoading(true);
    try {
      const response = await api.signup(onboardingData);
      if (response.success) {
        onNext();
      } else {
        Alert.alert('Error', response.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup Error:', error.response?.data || error.message);
      const msg = error.response?.data?.message || 'Connection failed. Please check your internet.';
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Basic Details</Text>
        <Text style={styles.subtitle}>Tell us about your hostel and yourself</Text>
      </View>

      <OnboardingCard title="Hostel Information" icon="business-outline">
        <CustomInput 
          label="Hostel Name *"
          placeholder="e.g. Al-Noor Boys Hostel"
          value={onboardingData.hostel_name}
          onChangeText={(text) => updateOnboardingData({ hostel_name: text })}
        />
        <View style={styles.row}>
          <View style={styles.flex}>
            <CustomInput 
              label="City *" 
              placeholder="e.g. Lahore"
              value={onboardingData.city} 
              onChangeText={(text) => updateOnboardingData({ city: text })} 
            />
          </View>
          <View style={styles.flex}>
            <CustomInput 
              label="Area *" 
              placeholder="e.g. Gulberg"
              value={onboardingData.area} 
              onChangeText={(text) => updateOnboardingData({ area: text })} 
            />
          </View>
        </View>
        <CustomInput 
          label="Full Address *"
          placeholder="Plot #, Street name, Block..."
          value={onboardingData.address}
          onChangeText={(text) => updateOnboardingData({ address: text })}
        />
        <CustomInput 
          label="Registration Number"
          placeholder="Business NTN or Registration ID"
          value={onboardingData.registration_number}
          onChangeText={(text) => updateOnboardingData({ registration_number: text })}
        />

        <View style={styles.imagePickerContainer}>
          <Text style={styles.label}>Registration Certificate (Image) *</Text>
          <TouchableOpacity style={styles.imageUploadBtn} onPress={handleImagePick}>
            {onboardingData.registration_certificate ? (
              <View style={styles.imagePreviewContainer}>
                <Icon name="document-text" size={24} color={colors.primary} />
                <Text style={styles.imageSelectedText} numberOfLines={1}>
                  {onboardingData.registration_certificate.fileName || 'Image Selected'}
                </Text>
                <Icon name="checkmark-circle" size={20} color={colors.success} style={styles.successIcon} />
              </View>
            ) : (
              <>
                <Icon name="cloud-upload-outline" size={24} color={colors.text.secondary} />
                <Text style={styles.imageUploadText}>Upload Certificate</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </OnboardingCard>

      <OnboardingCard title="Admin Details" icon="person-outline">
        <CustomInput 
          label="Full Name *" 
          placeholder="Your full name"
          value={onboardingData.name} 
          onChangeText={(text) => updateOnboardingData({ name: text })} 
        />
        <CustomInput 
          label="Phone Number *" 
          placeholder="e.g. 03211234567"
          value={onboardingData.phone} 
          onChangeText={(text) => updateOnboardingData({ phone: text })} 
          keyboardType="phone-pad" 
        />
        <CustomInput 
          label="Email Address *" 
          placeholder="admin@hostelin.pk"
          value={onboardingData.email} 
          onChangeText={(text) => updateOnboardingData({ email: text })} 
          keyboardType="email-address" 
          autoCapitalize="none" 
        />
        <CustomInput 
          label="Password *" 
          placeholder="Minimum 6 characters"
          value={onboardingData.password} 
          onChangeText={(text) => updateOnboardingData({ password: text })} 
          secureTextEntry 
        />
        
        <View style={styles.referralBox}>
          <Text style={styles.label}>Referral Code *</Text>
          <VerifyInput 
            placeholder="Code"
            value={onboardingData.referral_code}
            onChangeText={(text) => updateOnboardingData({ referral_code: text, referral_verified: false })}
            onVerify={handleVerifyReferral}
            isVerified={onboardingData.referral_verified}
            isLoading={verifyingCode}
            error={referralError}
          />
        </View>
      </OnboardingCard>

      <View style={styles.footerBtns}>
        <TouchableOpacity style={styles.cancelBtn} onPress={onCancel} disabled={loading}>
          <Text style={styles.cancelBtnText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.nextBtn, loading && styles.disabled]} onPress={handleContinue} disabled={loading}>
          <Text style={styles.btnText}>{loading ? 'Processing...' : 'Continue'}</Text>
          <Icon name="arrow-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={onLoginPress}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  header: { marginBottom: 24 },
  title: { fontSize: 24, fontWeight: typography.weight.bold, color: colors.text.primary },
  subtitle: { fontSize: 14, color: colors.text.secondary, marginTop: 4 },
  row: { flexDirection: 'row', gap: 12 },
  flex: { flex: 1 },
  referralBox: { marginTop: 8 },
  label: { fontSize: 14, color: colors.text.secondary, marginBottom: 8, fontWeight: typography.weight.medium },
  footerBtns: { flexDirection: 'row', gap: 12, marginTop: 10 },
  cancelBtn: { flex: 1, backgroundColor: '#F1F5F9', paddingVertical: 16, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  cancelBtnText: { color: '#64748B', fontWeight: typography.weight.bold, fontSize: 16 },
  nextBtn: { flex: 2, backgroundColor: colors.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16, borderRadius: 16, gap: 12 },
  disabled: { opacity: 0.7 },
  btnText: { color: '#FFFFFF', fontSize: 16, fontWeight: typography.weight.bold },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  footerText: { color: colors.text.secondary },
  loginText: { color: colors.primary, fontWeight: typography.weight.bold },
  imagePickerContainer: { marginTop: 16 },
  imageUploadBtn: { borderWidth: 1.5, borderColor: '#E2E8F0', borderStyle: 'dashed', borderRadius: 16, padding: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC', minHeight: 100 },
  imageUploadText: { color: colors.text.secondary, marginTop: 8, fontSize: 14, fontWeight: typography.weight.medium },
  imagePreviewContainer: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  imageSelectedText: { color: colors.text.primary, flex: 1, fontSize: 14, fontWeight: typography.weight.medium },
  successIcon: { marginLeft: 8 },
});

export default Step1;
