/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Title from '../components/Title';
import LanguageSelector from '../components/LanguageSelector';

import i18n from '../translations/I18n';

// give users the option to change the language and save it in local storage

const Settings = ( {navigation}: {navigation: any} ) => {

    return (
        <View style={styles.container}>
            <Title title={i18n.t('Settings.title')}/>

            <View style={styles.settingContainer}>
                <Text style={styles.settingName}>{i18n.t('Settings.locale.title')}</Text>
                <LanguageSelector />
            </View>
        </View>
    );
};

export default Settings;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15,
    },
    settingContainer: {
        flexDirection: 'column',
    },
    settingName: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});
