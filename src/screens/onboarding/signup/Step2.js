import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, typography } from '../../../theme';
import { api } from '../../../services/api';
import OnboardingCard from '../../../components/OnboardingCard';
import CustomInput from '../../../components/CustomInput';
import OtpInput from '../../../components/OtpInput';

const Step2 = ({ onboardingData, updateOnboardingData, onNext, onBack, onCancel }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [timer, setTimer] = useState(0);
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    let interval = timer > 0 ? setInterval(() => setTimer(t => t - 1), 1000) : null;
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendOtp = async () => {
    setSending(true);
    try {
      const response = await api.sendOtp(onboardingData.phone);
      if (response.success) {
        setTimer(60);
        setOtpSent(true);
      } else {
        Alert.alert('Error', 'Failed to send OTP');
      }
    } catch (e) { Alert.alert('Error', 'OTP Error'); }
    finally { setSending(false); }
  };

  const handleVerify = async () => {
    if (otp.length < 4) return;
    setLoading(true);
    try {
      const response = await api.verifyOtp(onboardingData.phone, otp);
      if (response.success) onNext();
      else Alert.alert('Error', 'Invalid OTP');
    } catch (e) { Alert.alert('Error', 'Verification failed'); }
    finally { setLoading(false); }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Verification</Text>
        <Text style={styles.subtitle}>
          {otpSent 
            ? `Code sent to WhatsApp` 
            : `Verify your WhatsApp number to secure your account`
          }
        </Text>
      </View>

      {!otpSent ? (
        <View style={styles.phaseContainer}>
          <OnboardingCard title="WhatsApp Number" icon="logo-whatsapp">
            <CustomInput 
              label="Phone Number"
              placeholder="e.g. 03211234567"
              value={onboardingData.phone}
              onChangeText={(text) => updateOnboardingData({ phone: text })}
              keyboardType="phone-pad"
            />
            <Text style={styles.infoText}>
              Please make sure this number is active on WhatsApp. We will send a 6-digit code for verification.
            </Text>
          </OnboardingCard>

          <View style={styles.footerBtns}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.nextBtn, styles.nextBtnFlex, sending && styles.disabled]} onPress={handleSendOtp} disabled={sending}>
              <Text style={styles.btnText}>{sending ? 'Sending...' : 'Send OTP'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.phaseContainer}>
          <OnboardingCard title="Verify OTP" icon="chatbubble-outline">
            <OtpInput 
              value={otp} 
              onChange={setOtp} 
            />
            <View style={styles.center}>
              {timer > 0 ? (
                <Text style={styles.timer}>Resend in {timer}s</Text>
              ) : (
                <TouchableOpacity onPress={handleSendOtp} disabled={sending}>
                  <Text style={styles.resend}>Resend Code</Text>
                </TouchableOpacity>
              )}
            </View>
          </OnboardingCard>

          <TouchableOpacity style={[styles.nextBtn, loading && styles.disabled]} onPress={handleVerify} disabled={loading}>
            <Text style={styles.btnText}>{loading ? 'Verifying...' : 'Verify & Continue'}</Text>
            <Icon name="checkmark-circle" size={20} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.back} onPress={() => setOtpSent(false)}>
            <Text style={styles.backText}>Didn't receive code? Check number</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { marginBottom: 20, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: typography.weight.bold, color: colors.text.primary },
  subtitle: { fontSize: 15, color: colors.text.secondary, textAlign: 'center', marginTop: 8, paddingHorizontal: 20 },
  phaseContainer: { gap: 16 },
  infoText: { fontSize: 14, color: colors.text.secondary, lineHeight: 20, textAlign: 'center', marginTop: 12 },
  center: { alignItems: 'center', marginTop: 10 },
  timer: { fontSize: 14, color: '#94A3B8' },
  resend: { fontSize: 14, color: colors.primary, fontWeight: 'bold' },
  footerBtns: { flexDirection: 'row', gap: 12, marginTop: 10 },
  cancelBtn: { flex: 1, backgroundColor: '#F1F5F9', paddingVertical: 16, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  cancelBtnText: { color: '#64748B', fontWeight: 'bold', fontSize: 16 },
  nextBtn: { backgroundColor: colors.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16, borderRadius: 16, gap: 12 },
  nextBtnFlex: { flex: 2 },
  disabled: { opacity: 0.7 },
  btnText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  back: { marginTop: 10, alignItems: 'center' },
  backText: { color: colors.text.secondary, textDecorationLine: 'underline', fontSize: 13 }
});

export default Step2;
