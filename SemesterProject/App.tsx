/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import i18n from './translations/I18n';
import Palette from './Palette';

import Homepage from './screens/Homepage';
import MapScreen from './screens/MapScreen';
import Bookmarks from './screens/Bookmarks';
import ShoppingCart from './screens/ShoppingCart';
import Settings from './screens/Settings';
import Filter from './screens/Filter';

import MaterialComm from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAw5 from 'react-native-vector-icons/FontAwesome5';
import FontAw from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import ItemDetails from './screens/ItemDetails';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const FoodApp = () => {
  const [palette, setPalette] = useState<any>(Palette.colors.light);

  function HomeScreen() {
    return (
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarStyle: {
          height: 60,
          paddingHorizontal: 5,
          borderTopWidth: 2,
          borderTopColor: palette.purple,
          backgroundColor: palette.bgColor,
      },
    })}>
        <Tab.Screen name="Homepage" component={Homepage} options={ ({navigation}) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialComm name="view-grid" color={color} size={size} />
            ),
            tabBarActiveTintColor: palette.purple,
          })}/>
        <Tab.Screen name="MapScreen" component={MapScreen} options={ ({navigation}) => ({
            headerTitle: 'MapScreen',
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <FontAw5 name="map-marked-alt" color={color} size={size} />
            ),
            tabBarActiveTintColor: palette.purple,
          })}/>
        <Tab.Screen name="Bookmarks" component={Bookmarks} options={ ({navigation}) => ({
            headerTitle: 'Bookmarks',
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <FontAw name="heart" color={color} size={size} />
            ),
            tabBarActiveTintColor: palette.purple,
        })}/>
        <Tab.Screen name="ShoppingCart" component={ShoppingCart} options={ ({navigation}) => ({
            headerTitle: 'ShoppingCart',
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <Entypo name="shopping-cart" color={color} size={size} />
            ),
            tabBarActiveTintColor: palette.purple,
        })}/>
        <Tab.Screen name="Settings" component={Settings} options={ ({navigation}) => ({
            headerTitle: 'Settings',
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="settings" color={color} size={size} />
            ),
            tabBarActiveTintColor: palette.purple,
        })}/>
      </Tab.Navigator>
    );
  }

  const getTheme = async () => {
    try {
        let theme = await AsyncStorage.getItem('theme');
        if (theme !== null) {
            if (theme === 'light') {
                setPalette(Palette.colors.light);
            } else {
                setPalette(Palette.colors.dark);
            }
        }
    } catch (e) {
        console.log(e);
    }
  };

  useEffect(() => {
    const id = setInterval(() => {
        getTheme();
    }, 3000);

    return () => {
        clearInterval(id);
    };
  });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ItemDetails" component={ItemDetails} options={{
          headerTitle: '',
          headerTintColor: palette.purple,
          headerStyle: {backgroundColor: palette.bgColor} }}/>
        <Stack.Screen name="Filter" component={Filter} options={{
          headerTitle: `${i18n.t('Filter.title')}`,
          headerStyle: {backgroundColor: palette.bgColor},
          headerTitleStyle: {fontSize: 25},
          headerTintColor: palette.purple }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default FoodApp;
