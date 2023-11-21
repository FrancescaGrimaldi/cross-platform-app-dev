/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import { View } from 'react-native';
import Title from '../components/Title';

const Settings = ( {navigation}: {navigation: any} ) => {
    
    return (
        <View style={{marginLeft: 10}}>
            <Title title="Settings"/>
        </View>
    );            
}

export default Settings;