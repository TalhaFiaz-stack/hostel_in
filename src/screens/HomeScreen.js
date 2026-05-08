import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, typography } from '../theme';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to HostelIn</Text>
      <Text style={styles.subtext}>Your simple hostel booking app</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: typography.size.h1,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
    marginBottom: 8,
  },
  subtext: {
    fontSize: typography.size.body,
    color: colors.text.secondary,
  },
});

export default HomeScreen;
