import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors, typography } from '../theme';

const STEPS = [
  { id: 1, label: 'Basic Details' },
  { id: 2, label: 'Verification' },
  { id: 3, label: 'Property Setup' },
  { id: 4, label: 'Final Polish' },
];

const OnboardingStepper = ({ currentStep }) => {
  return (
    <View style={styles.container}>
      <View style={styles.stepsRow}>
        {STEPS.map((step, index) => (
          <React.Fragment key={step.id}>
            <View style={styles.stepWrapper}>
              <View 
                style={[
                  styles.circle,
                  currentStep >= step.id ? styles.circleActive : styles.circleInactive
                ]}
              >
                <Text 
                  style={[
                    styles.stepNumber,
                    currentStep >= step.id ? styles.textActive : styles.textInactive
                  ]}
                >
                  {step.id}
                </Text>
              </View>
              <Text 
                style={[
                  styles.label,
                  currentStep === step.id ? styles.labelActive : styles.labelInactive
                ]}
                numberOfLines={1}
              >
                {step.label}
              </Text>
            </View>
            {index < STEPS.length - 1 && (
              <View 
                style={[
                  styles.line,
                  currentStep > step.id ? styles.lineActive : styles.lineInactive
                ]} 
              />
            )}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  stepWrapper: {
    alignItems: 'center',
    width: 50,
  },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    borderWidth: 2,
  },
  circleActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  circleInactive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E8F0',
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: typography.weight.bold,
  },
  textActive: {
    color: '#FFFFFF',
  },
  textInactive: {
    color: '#94A3B8',
  },
  label: {
    fontSize: 10,
    textAlign: 'center',
  },
  labelActive: {
    color: colors.primary,
    fontWeight: typography.weight.bold,
  },
  labelInactive: {
    color: '#94A3B8',
  },
  line: {
    flex: 1,
    height: 2,
    marginBottom: 20, // Align with circles
    marginHorizontal: -5,
  },
  lineActive: {
    backgroundColor: colors.primary,
  },
  lineInactive: {
    backgroundColor: '#E2E8F0',
  },
});

export default OnboardingStepper;
