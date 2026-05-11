import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, typography } from '../theme';

// Screens
import HomeScreen from '../screens/home/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SearchScreen from '../screens/SearchScreen';
import HostelDetailScreen from '../screens/detail/HostelDetailScreen';
import AddHostelScreen from '../screens/AddHostelScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ListHostelSheet from '../components/ListHostelSheet';
import OnboardingWizard from '../screens/onboarding/OnboardingWizard';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

// ──────── NESTED HOME STACK ────────
// This ensures the Bottom Tab Bar remains visible on sub-pages
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Search" component={SearchScreen} />
      <HomeStack.Screen name="HostelDetail" component={HostelDetailScreen} />
    </HomeStack.Navigator>
  );
};

// ──────── MAIN TAB NAVIGATOR ────────
const MainTabs = ({ navigation }) => {
  const sheetRef = React.useRef();

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color }) => {
            let iconName;
            let iconColor = color;
            let iconSize = 24;

            if (route.name === 'HomeTab') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Add') {
              iconName = 'add-circle';
              iconColor = '#4e4e4eff';
              iconSize = 30; // Boosting only this icon
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Icon name={iconName} size={iconSize} color={iconColor} />;
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.text.secondary,
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarShowLabel: true,
        })}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeStackScreen}
          options={{ title: 'Explore' }}
        />
        <Tab.Screen
          name="Add"
          component={AddHostelScreen}
          options={{ title: 'Add' }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              sheetRef.current?.open();
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: 'Profile' }}
        />
      </Tab.Navigator>

      <ListHostelSheet
        sheetRef={sheetRef}
        onListPress={() => navigation.navigate('Onboarding')}
      />
    </>
  );
};

// ──────── ROOT NAVIGATOR ────────
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingWizard} />
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 75,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingBottom: 12,
    paddingTop: 12,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: typography.weight.bold,
    marginTop: 0,
  }
});

export default AppNavigator;
