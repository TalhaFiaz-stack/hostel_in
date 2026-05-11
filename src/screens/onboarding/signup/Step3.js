import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, typography } from '../../../theme';
import OnboardingCard from '../../../components/OnboardingCard';
import CustomInput from '../../../components/CustomInput';

const Step3 = ({ onboardingData, updateOnboardingData, onNext, onBack, onCancel }) => {
  const [buildings, setBuildings] = useState(onboardingData.buildings || [
    { id: 1, name: '', floors: '', type: 'Male', rooms: [] }
  ]);

  const addBuilding = () => {
    setBuildings([...buildings, { id: buildings.length + 1, name: '', floors: '', type: 'Male', rooms: [] }]);
  };

  const updateBuilding = (id, field, value) => {
    setBuildings(buildings.map(b => b.id === id ? { ...b, [field]: value } : b));
  };

  const handleContinue = () => {
    if (buildings.some(b => !b.name || !b.floors)) {
      Alert.alert('Error', 'Please fill all building details');
      return;
    }
    updateOnboardingData({ buildings });
    onNext();
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Buildings & Rooms</Text>
        <Text style={styles.subtitle}>Setup your hostel structures and rooms</Text>
      </View>

      {buildings.map((building, index) => (
        <OnboardingCard key={building.id} title={`Building #${index + 1}`} icon="business">
          <CustomInput 
            label="Building Name" 
            placeholder="e.g. Main Block" 
            value={building.name} 
            onChangeText={(v) => updateBuilding(building.id, 'name', v)} 
          />
          <View style={styles.row}>
            <View style={styles.flex}>
              <CustomInput 
                label="Floors" 
                placeholder="0" 
                keyboardType="number-pad" 
                value={building.floors} 
                onChangeText={(v) => updateBuilding(building.id, 'floors', v)} 
              />
            </View>
            <View style={styles.flex}>
              <Text style={styles.label}>Type</Text>
              <View style={styles.typeRow}>
                {['Male', 'Female', 'Both'].map(t => (
                  <TouchableOpacity 
                    key={t}
                    style={[styles.typeBtn, building.type === t && styles.typeBtnActive]}
                    onPress={() => updateBuilding(building.id, 'type', t)}
                  >
                    <Text style={[styles.typeText, building.type === t && styles.typeTextActive]}>{t}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </OnboardingCard>
      ))}

      <TouchableOpacity style={styles.addBtn} onPress={addBuilding}>
        <Icon name="add-circle-outline" size={20} color={colors.primary} />
        <Text style={styles.addBtnText}>Add Another Building</Text>
      </TouchableOpacity>

      <View style={styles.footerBtns}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backBtnText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
          <Text style={styles.cancelBtnText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextBtn} onPress={handleContinue}>
          <Text style={styles.nextBtnText}>Continue</Text>
          <Icon name="arrow-forward" size={20} color="#FFFFFF" />
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
  row: { flexDirection: 'row', gap: 12, alignItems: 'flex-end' },
  flex: { flex: 1 },
  label: { fontSize: 14, color: colors.text.secondary, marginBottom: 8, fontWeight: '500' },
  typeRow: { flexDirection: 'row', backgroundColor: '#F1F5F9', borderRadius: 10, padding: 4 },
  typeBtn: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 8 },
  typeBtnActive: { backgroundColor: colors.primary },
  typeText: { fontSize: 12, color: '#64748B', fontWeight: 'bold' },
  typeTextActive: { color: '#FFFFFF' },
  addBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16, borderStyle: 'dashed', borderWidth: 1, borderColor: colors.primary, borderRadius: 16, marginBottom: 24, gap: 8 },
  addBtnText: { color: colors.primary, fontWeight: 'bold' },
  footerBtns: { flexDirection: 'row', gap: 8 },
  backBtn: { flex: 1, backgroundColor: '#F1F5F9', paddingVertical: 16, borderRadius: 16, alignItems: 'center' },
  backBtnText: { color: '#64748B', fontWeight: 'bold' },
  cancelBtn: { flex: 1, backgroundColor: '#FEF2F2', paddingVertical: 16, borderRadius: 16, alignItems: 'center' },
  cancelBtnText: { color: '#EF4444', fontWeight: 'bold' },
  nextBtn: { flex: 2, backgroundColor: colors.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16, borderRadius: 16, gap: 8 },
  nextBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});

export default Step3;
