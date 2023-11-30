/* eslint-disable prettier/prettier */

import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Entypo from 'react-native-vector-icons/Entypo';

import i18n from '../translations/I18n';
import Palette from '../Palette';

const ThemeSelector = (props) => {
    const [selected, setSelected] = useState('');

    const data = [
        {key:'light', value:`${i18n.t('Settings.theme.light')}`},
        {key:'dark', value:`${i18n.t('Settings.theme.dark')}`},
    ];

    // change theme and save it to async storage
    const changeTheme = async () => {
        try {
            await AsyncStorage.setItem('theme', selected);
            if (selected === 'light') {
                props.setPalette(Palette.colors.light);
            } else {
                props.setPalette(Palette.colors.dark);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <SelectList
            setSelected={(key) => setSelected(key)}
            data={data}
            save="key"
            search={false}
            placeholder={i18n.t('Settings.theme.placeholder')}
            onSelect={changeTheme}
            inputStyles={[styles.text, props.currentPalette.color2]}
            dropdownTextStyles={[styles.text, props.currentPalette.color2]}
            arrowicon={<Entypo name="chevron-small-down" size={20} color={props.currentPalette.grey} />}
        />
    );
};

export default ThemeSelector;

const styles = StyleSheet.create({
    text: {
        fontSize: 17,
    },
});

