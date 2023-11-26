/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Title from '../components/Title';
import LanguageSelector from '../components/LanguageSelector';
import ThemeSelector from '../components/ThemeSelector';

import i18n from '../translations/I18n';
import Globals from '../Globals';

const Settings = ( {navigation}: {navigation: any} ) => {
    const [lang, setLang] = useState('en-GB');
    const [palette, setPalette] = useState<any>(Globals.colors.light);

    const getTheme = async () => {
        try {
            let theme = await AsyncStorage.getItem('theme');
            if (theme !== null) {
                if (theme === 'light') {
                    setPalette(Globals.colors.light);
                } else {
                    setPalette(Globals.colors.dark);
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
        <View style={[styles.container, palette.bg]}>
            <Title title={i18n.t('Settings.title')} palette={palette} />

            <View style={styles.settingContainer}>
                <Text style={[styles.settingName, palette.color1]}>{i18n.t('Settings.locale.title')}</Text>
                <LanguageSelector setLang={setLang} palette={palette} />
            </View>

            <View style={[styles.settingContainer, {marginTop: 20}]}>
                <Text style={[styles.settingName, palette.color1]}>{i18n.t('Settings.theme.title')}</Text>
                <ThemeSelector setPalette={setPalette} currentPalette={palette}/>
            </View>
        </View>
    );
};

export default Settings;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        flex: 1,
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
