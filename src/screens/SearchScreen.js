import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors, spacing, typography } from '../theme';

const SearchScreen = ({ route, navigation }) => {
  const { city } = route.params || {};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hostels in {city || 'All Cities'}</Text>
        <TouchableOpacity>
          <Icon name="sliders" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Icon name="search" size={50} color="#E2E8F0" />
        <Text style={styles.emptyText}>Showing results for "{city}"</Text>
        <Text style={styles.subText}>This page will eventually show the full buildings list from the API.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
    marginTop: 20,
  },
  subText: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default SearchScreen;
