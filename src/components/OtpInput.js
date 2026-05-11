import React, { useRef } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { colors } from '../theme';

const OtpInput = ({ value, onChange }) => {
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newValue = value.split('');
    newValue[index] = text;
    const finalValue = newValue.join('');
    onChange(finalValue);

    // Auto-focus next
    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (!value[index] && index > 0) {
        // Move back and clear previous
        const newValue = value.split('');
        newValue[index - 1] = '';
        onChange(newValue.join(''));
        inputs.current[index - 1].focus();
      }
    }
  };

  return (
    <View style={styles.container}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <TextInput
          key={i}
          ref={(ref) => (inputs.current[i] = ref)}
          style={[styles.box, value[i] && styles.boxFilled]}
          maxLength={1}
          keyboardType="number-pad"
          value={value[i] || ''}
          onChangeText={(text) => handleChange(text, i)}
          onKeyPress={(e) => handleKeyPress(e, i)}
          selectionColor={colors.primary}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 20,
  },
  box: {
    width: 45,
    height: 55,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  boxFilled: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '05',
  },
});

export default OtpInput;
