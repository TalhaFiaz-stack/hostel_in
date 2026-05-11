import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { List } from 'react-native-paper';
import { colors, typography } from '../../../theme';

const AccordionItem = ({ title, rightTitle, children }) => {
  return (
    <List.Accordion
      title={title}
      description={rightTitle}
      style={styles.container}
      titleStyle={styles.title}
      descriptionStyle={styles.rightTitle}
      theme={{ colors: { primary: colors.primary } }}
      rippleColor="transparent"
    >
      <View style={styles.content}>
        {children}
      </View>
    </List.Accordion>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 0,
    overflow: 'hidden',
  },
  title: {
    fontSize: 16,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
  },
  rightTitle: {
    fontSize: 14,
    fontWeight: typography.weight.bold,
    color: colors.primary,
    marginTop: 2,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 4,
    backgroundColor: '#FFFFFF',
  },
});

export default AccordionItem;
