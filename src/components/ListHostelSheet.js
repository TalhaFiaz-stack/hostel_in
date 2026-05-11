import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, typography } from '../theme';

const ListHostelSheet = ({ sheetRef, onListPress }) => {
  return (
    <RBSheet
      ref={sheetRef}
      closeOnDragDown={true}
      closeOnPressMask={true}
      height={360}
      customModalProps={{
        statusBarTranslucent: true, // covers everything on Android including tab bar
      }}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(0,0,0,0.5)',
        },
        draggableIcon: {
          backgroundColor: '#E2E8F0',
          width: 60,
        },
        container: {
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingHorizontal: 24,
          paddingBottom: 0, // no bottom padding — sheet sits flush to screen bottom
        },
      }}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Icon name="business" size={30} color={colors.primary} />
          </View>
          <Text style={styles.title}>List Your Property</Text>
          <Text style={styles.subtitle}>
            Are you a hostel owner or manager looking to grow your business?
          </Text>
        </View>

        <Text style={styles.description}>
          Join Pakistan's largest hostel network and reach thousands of students
          and professionals looking for quality accommodation.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            sheetRef.current.close();
            if (onListPress) onListPress();
          }}
        >
          <Text style={styles.buttonText}>Get Started Now</Text>
          <Icon name="arrow-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    paddingTop: 8,
    // paddingBottom: 16, // just enough breathing room, no excess
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
    paddingHorizontal: 12,
    lineHeight: 20,
    fontWeight: typography.weight.medium,
  },
  description: {
    fontSize: 13,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 18,
    opacity: 0.8,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    width: '100%',
    gap: 12,
    elevation: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: typography.weight.bold,
  },
});

export default ListHostelSheet;