/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/func-call-spacing */

import React, { useState } from 'react';
import { View, Text } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ( {navigation}: {navigation: any} ) => {
    // set default color
    const [bgcolor, setBgcolor] = useState ('#ecf2eb');
    
    // on color change, persist it
    const onColorChangeComplete = async (color: string) => {
        try {
            await AsyncStorage.setItem('bgcolor', color)
            setBgcolor(color);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: bgcolor,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        }}>
            <View>
                <Text style={{
                    fontSize: 20,
                    color: '#22391f',
                    marginTop: 50,
                }}>Choose the app background color: </Text>
            </View>
            <View style={{marginHorizontal: 20, marginBottom: 70, flex: 0.9}}>
                <ColorPicker
                    color={bgcolor}
                    onColorChangeComplete={onColorChangeComplete}
                />
            </View>
        </View>
    );

}

export default SettingsScreen;
