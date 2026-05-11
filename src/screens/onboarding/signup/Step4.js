import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, typography } from '../../../theme';
import { api } from '../../../services/api';
import OnboardingCard from '../../../components/OnboardingCard';
import CustomInput from '../../../components/CustomInput';

const Step4 = ({ onboardingData, updateOnboardingData, onFinish, onBack, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [pricing, setPricing] = useState({
    monthly: '',
    weekly: '',
    daily: '',
    deposit: '',
  });

  const handleFinish = async () => {
    if (!pricing.monthly) {
      Alert.alert('Error', 'Monthly pricing is required');
      return;
    }

    setLoading(true);
    try {
      const finalData = { ...onboardingData, pricing };
      const response = await api.setupOnboarding(finalData);
      if (response.success) {
        Alert.alert('Success', 'Onboarding completed successfully!', [
          { text: 'Great!', onPress: onFinish }
        ]);
      } else {
        Alert.alert('Error', response.message || 'Submission failed');
      }
    } catch (e) {
      console.error('Submit Error:', e.response?.data || e.message);
      const msg = e.response?.data?.message || 'Submission failed. Please check your internet.';
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Pricing & Images</Text>
        <Text style={styles.subtitle}>Set your rental prices and upload photos</Text>
      </View>

      <OnboardingCard title="Pricing & Availability" icon="cash-outline">
        <CustomInput 
          label="Monthly Rent (PKR) *" 
          placeholder="0" 
          keyboardType="number-pad" 
          value={pricing.monthly} 
          onChangeText={(v) => setPricing({...pricing, monthly: v})} 
        />
        <View style={styles.row}>
          <View style={styles.flex}>
            <CustomInput 
              label="Weekly" 
              placeholder="0" 
              keyboardType="number-pad" 
              value={pricing.weekly} 
              onChangeText={(v) => setPricing({...pricing, weekly: v})} 
            />
          </View>
          <View style={styles.flex}>
            <CustomInput 
              label="Daily" 
              placeholder="0" 
              keyboardType="number-pad" 
              value={pricing.daily} 
              onChangeText={(v) => setPricing({...pricing, daily: v})} 
            />
          </View>
        </View>
        <CustomInput 
          label="Security Deposit" 
          placeholder="0" 
          keyboardType="number-pad" 
          value={pricing.deposit} 
          onChangeText={(v) => setPricing({...pricing, deposit: v})} 
        />
      </OnboardingCard>

      <OnboardingCard title="Hostel Images" icon="images-outline">
        <TouchableOpacity style={styles.uploadBox}>
          <Icon name="cloud-upload-outline" size={40} color={colors.primary} />
          <Text style={styles.uploadTitle}>Upload Hostel Images</Text>
          <Text style={styles.uploadSubtitle}>JPG, PNG — Max 5MB</Text>
        </TouchableOpacity>
      </OnboardingCard>

      <View style={styles.footerBtns}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack} disabled={loading}>
          <Text style={styles.backBtnText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelBtn} onPress={onCancel} disabled={loading}>
          <Text style={styles.cancelBtnText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.finishBtn, loading && styles.disabled]} onPress={handleFinish} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Text style={styles.finishBtnText}>Submit Listing</Text>
              <Icon name="checkmark-done" size={20} color="#FFFFFF" />
            </>
          )}
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
  uploadBox: { height: 180, borderStyle: 'dashed', borderWidth: 2, borderColor: '#E2E8F0', borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FAFC' },
  uploadTitle: { fontSize: 16, fontWeight: 'bold', color: colors.text.primary, marginTop: 12 },
  uploadSubtitle: { fontSize: 12, color: '#94A3B8', marginTop: 4 },
  footerBtns: { flexDirection: 'row', gap: 8 },
  backBtn: { flex: 1, backgroundColor: '#F1F5F9', paddingVertical: 16, borderRadius: 16, alignItems: 'center' },
  backBtnText: { color: '#64748B', fontWeight: 'bold' },
  cancelBtn: { flex: 1, backgroundColor: '#FEF2F2', paddingVertical: 16, borderRadius: 16, alignItems: 'center' },
  cancelBtnText: { color: '#EF4444', fontWeight: 'bold' },
  finishBtn: { flex: 2, backgroundColor: '#10B981', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16, borderRadius: 16, gap: 8 },
  finishBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  disabled: { opacity: 0.7 }
});

export default Step4;
