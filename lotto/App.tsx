/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Homepage from './screens/Homepage';
import Results from './screens/Results';
import Subscription from './screens/Subscription';
import Profile from './screens/Profile';
import HowToPlay from './screens/HowToPlay';
import Fill from './screens/Fill';
import SettingsIcon from './components/SettingsIcon';
import SettingsScreen from './screens/SettingsScreen';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialComm from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Homepage" component={Homepage} options={ ({navigation}) => ({
          headerRight: () => (<SettingsIcon navigation={navigation}/>),
          headerTitle: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        })}/>
      <Tab.Screen name="Profile" component={Profile} options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialComm name="account" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="SettingsScreen" component={SettingsScreen} options={{
          tabBarLabel: 'Settings',
          headerTitle: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-sharp" color={color} size={size} />
          ),
        }}/>
    </Tab.Navigator>
  );
}

const LottoApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Results" component={Results} />
        <Stack.Screen name="Subscription" component={Subscription} />
        <Stack.Screen name="Fill in yourself" component={Fill}/>
        <Stack.Screen name="How to play" component={HowToPlay}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default LottoApp;
