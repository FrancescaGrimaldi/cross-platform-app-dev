/* eslint-disable prettier/prettier */

import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Entypo from 'react-native-vector-icons/Entypo';

import i18n, { translatedTexts } from '../translations/I18n';

const LanguageSelector = (props) => {
    const [selected, setSelected] = useState('');

    const data = [
        {key:'en-GB', value:'English'},
        {key:'it-IT', value:'Italiano'},
        {key:'nb-NO', value:'Norsk Bokmål'},
    ];

    const changeLanguage = async () => {
        i18n.translations = {
            [selected]: translatedTexts[selected](),
        };
        i18n.locale = selected;
        try {
            await AsyncStorage.setItem('language', selected);
            props.setLang(selected);
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
            placeholder={i18n.t('Settings.locale.placeholder')}
            onSelect={changeLanguage}
            inputStyles={[styles.text, props.palette.color2]}
            dropdownTextStyles={[styles.text, props.palette.color2]}
            arrowicon={<Entypo name="chevron-small-down" size={20} color={props.palette.grey} />}
        />
    );
};

export default LanguageSelector;

const styles = StyleSheet.create({
    text: {
        fontSize: 17,
    },
});
