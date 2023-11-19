/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Homepage from './screens/Homepage';
import MapView from './screens/MapView';
import Bookmarks from './screens/Bookmarks';
import ShoppingCart from './screens/ShoppingCart';
import Settings from './screens/Settings';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialComm from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAw5 from 'react-native-vector-icons/FontAwesome5';
import FontAw from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarStyle: {
        height: 60,
        paddingHorizontal: 5,
        borderTopWidth: 2,
    },
  })}>
      <Tab.Screen name="Homepage" component={Homepage} options={ ({navigation}) => ({
          headerTitle: 'Home',
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialComm name="view-grid" color={color} size={size} />
          ),
        })}/>
      <Tab.Screen name="MapView" component={MapView} options={ ({navigation}) => ({
          headerTitle: 'MapView',
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <FontAw5 name="map-marked-alt" color={color} size={size} />
          ),
        })}/>
      <Tab.Screen name="Bookmarks" component={Bookmarks} options={ ({navigation}) => ({
          headerTitle: 'Bookmarks',
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <FontAw name="heart" color={color} size={size} />
          ),
      })}/>
      <Tab.Screen name="ShoppingCart" component={ShoppingCart} options={ ({navigation}) => ({
          headerTitle: 'ShoppingCart',
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="shopping-cart" color={color} size={size} />
          ),
      })}/>
      <Tab.Screen name="Settings" component={Settings} options={ ({navigation}) => ({
          headerTitle: 'Settings',
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" color={color} size={size} />
          ),
      })}/>
    </Tab.Navigator>
  );
}

const LottoApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default LottoApp;