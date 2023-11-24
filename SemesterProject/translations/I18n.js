/* eslint-disable prettier/prettier */
/* eslint-disable quotes */

import {I18n} from "i18n-js";
import { I18nManager } from "react-native";
import * as RNLocalize from "react-native-localize";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const translatedTexts = {
    "en-GB": () => require("./en-GB.json"),
    "nb-NO": () => require("./nb-NO.json"),
    "it-IT": () => require("./it-IT.json"),
};

// fallback and current language
const fallback = { languageTag: "en-GB", isRTL: false };
const { languageTag, isRTL } = RNLocalize.findBestLanguageTag(Object.keys(translatedTexts)) || fallback;

// update layout direction
I18nManager.forceRTL(isRTL);

// populate correct translated
const translationsWithFallback = {
    [languageTag]: translatedTexts[languageTag](),
    [fallback.languageTag]: translatedTexts[fallback.languageTag](),
};

// configure i18n
const i18n = new I18n();
i18n.translations = translationsWithFallback;
i18n.locale = languageTag;
i18n.enableFallback = true;
i18n.fallbackLanguage = fallback.languageTag;

// set language from AsyncStorage
const setLanguage = async () => {
    try {
        const language = await AsyncStorage.getItem('language');
        if (language !== null) {
            i18n.translations = {
                [language]: translatedTexts[language](),
            };
            i18n.locale = language;
        }
    } catch (e) {
        console.log(e);
    }
};

setLanguage();

export default i18n;
