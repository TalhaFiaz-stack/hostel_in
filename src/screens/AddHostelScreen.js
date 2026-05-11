import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, typography } from '../theme';

const AddHostelScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add Hostel Coming Soon</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  text: {
    fontSize: 18,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
  },
});

export default AddHostelScreen;
