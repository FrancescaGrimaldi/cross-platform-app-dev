/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from './screens/Homepage';
import Results from './screens/Results';
import Subscription from './screens/Subscription';

const Stack = createNativeStackNavigator();

const LottoApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Homepage} />
        <Stack.Screen name="Results" component={Results} />
        <Stack.Screen name="Subscription" component={Subscription} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default LottoApp;
