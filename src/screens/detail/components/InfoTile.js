import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spacing, typography } from '../../../theme';

const InfoTile = ({ label, value, icon }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Icon name={icon} size={16} color={colors.primary} />
      </View>
      <View>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    padding: 10,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  value: {
    fontSize: 14,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
  },
  label: {
    fontSize: 10,
    color: colors.text.secondary,
    fontWeight: typography.weight.medium,
    textTransform: 'uppercase',
  },
});

export default InfoTile;
