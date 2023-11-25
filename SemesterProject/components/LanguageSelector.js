/* eslint-disable prettier/prettier */

import React, { useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage';

import i18n, {translatedTexts} from '../translations/I18n';

const LanguageSelector = () => {
    const [selected, setSelected] = useState('');

    const data = [
        {key:'en-GB', value:`${i18n.t('Settings.locale.en')}`},
        {key:'it-IT', value:`${i18n.t('Settings.locale.it')}`},
        {key:'nb-NO', value:`${i18n.t('Settings.locale.nb')}`},
    ];

    const changeLanguage = async () => {
        i18n.translations = {
            [selected]: translatedTexts[selected](),
        };
        i18n.locale = selected;
        try {
            await AsyncStorage.setItem('language', selected);
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
        />
    );
};

export default LanguageSelector;
