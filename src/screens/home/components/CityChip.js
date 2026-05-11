import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
import { colors, spacing, typography } from '../../../theme';

const CityChip = ({ name, image, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        {/* Using a placeholder circle with initial if no image provided */}
        <View style={styles.placeholder}>
          <Text style={styles.initial}>{name.charAt(0)}</Text>
        </View>
      </View>
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: spacing.lg,
    width: 70,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    backgroundColor: colors.primary + '15', // Transparent primary
    justifyContent: 'center',
    alignItems: 'center',
  },
  initial: {
    fontSize: 20,
    fontWeight: typography.weight.bold,
    color: colors.primary,
  },
  name: {
    fontSize: 12,
    fontWeight: typography.weight.semiBold,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});

export default CityChip;
