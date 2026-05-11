import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useOnboarding } from '../../context/OnboardingContext';

// Components
import OnboardingStepper from '../../components/OnboardingStepper';
import Step1 from './signup/Step1';
import Step2 from './signup/Step2';
import Step3 from './signup/Step3';
import Step4 from './signup/Step4';

const OnboardingWizard = ({ navigation }) => {
  const { onboardingData, updateOnboardingData, resetOnboardingData } = useOnboarding();
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => setCurrentStep(prev => prev + 1);
  const handleBack = () => setCurrentStep(prev => prev - 1);
  
  const handleFinish = () => {
    resetOnboardingData();
    navigation.navigate('Main');
  };

  const handleCancel = () => {
    Alert.alert(
      'Exit Onboarding',
      'Are you sure you want to cancel? All your progress will be lost.',
      [
        { text: 'Keep Filling', style: 'cancel' },
        { 
          text: 'Exit', 
          style: 'destructive',
          onPress: () => {
            resetOnboardingData();
            navigation.navigate('Main');
          }
        },
      ]
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1 
            onboardingData={onboardingData} 
            updateOnboardingData={updateOnboardingData} 
            onNext={handleNext}
            onCancel={handleCancel}
            onLoginPress={() => navigation.navigate('Login')}
          />
        );
      case 2:
        return (
          <Step2 
            onboardingData={onboardingData} 
            updateOnboardingData={updateOnboardingData} 
            onNext={handleNext}
            onBack={handleBack}
            onCancel={handleCancel}
          />
        );
      case 3:
        return (
          <Step3 
            onboardingData={onboardingData} 
            updateOnboardingData={updateOnboardingData} 
            onNext={handleNext}
            onBack={handleBack}
            onCancel={handleCancel}
          />
        );
      case 4:
        return (
          <Step4 
            onboardingData={onboardingData} 
            updateOnboardingData={updateOnboardingData} 
            onFinish={handleFinish}
            onBack={handleBack}
            onCancel={handleCancel}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <OnboardingStepper currentStep={currentStep} />
      <View style={styles.content}>
        {renderStep()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
  },
});

export default OnboardingWizard;
