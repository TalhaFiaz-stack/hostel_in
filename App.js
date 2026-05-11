/**
 * HostelIn - React Native App
 * @format
 */

import React, {useEffect} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import BootSplash from 'react-native-bootsplash';
import AppNavigator from './src/navigation/AppNavigator';
import {colors} from './src/theme';

import { OnboardingProvider } from './src/context/OnboardingContext';

const App = () => {
  useEffect(() => {
    const init = async () => {
      // Add a 2-second delay so you can see the native logo
      await new Promise(resolve => setTimeout(resolve, 2000));
      await BootSplash.hide({ fade: true });
    };

    init();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <OnboardingProvider>
          <AppNavigator />
        </OnboardingProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default App;
