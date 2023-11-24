/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import { View, Text } from 'react-native';
import Title from '../components/Title';

import i18n from '../translations/I18n';
import LanguageSelector from '../components/LanguageSelector';

// give users the option to change the language and save it in local storage

const Settings = ( {navigation}: {navigation: any} ) => {
    
    return (
        <View style={{marginHorizontal: 15}}>
            <Title title={i18n.t('Settings.title')}/>

            <View style={{
                flexDirection: 'column',
            }}>
                <Text style={{fontSize: 25, fontWeight: 'bold', marginBottom: 10}}>{i18n.t('Settings.locale.title')}</Text>
                <LanguageSelector />
            </View>
        </View>
    );            
}

export default Settings;