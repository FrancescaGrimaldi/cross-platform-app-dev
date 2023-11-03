/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
/* eslint-disable no-trailing-spaces */

import React from 'react';
import { View, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SettingsIcon = (props) => {

    const onSettingsIconPress = () => {
        props.navigation.navigate('SettingsScreen');
    }
       
    return (
        <Pressable onPress={onSettingsIconPress}>
            <View>
                <Ionicons name="settings-sharp" size={30} style={{marginRight: 20}}/>
            </View>
        </Pressable>
    );
}

export default SettingsIcon;
