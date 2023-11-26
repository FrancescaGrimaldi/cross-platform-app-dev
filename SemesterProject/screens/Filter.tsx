/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */

import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CheckboxCategory from '../components/CheckboxCategory';

import Globals from '../Globals';

const Filter = ( {navigation, route}: {navigation: any, route: any} ) => {
    const categories = ['American Food', 'Asian Food', 'Italian Food'];
    const [selected, setSelected] = useState(route.params.selectedCategories);
    const [palette, setPalette] = useState<any>('');

    const addToSelectedCategories = (category: string) => {
        setSelected([...selected, category]);
    };

    const removeFromSelectedCategories = (category: string) => {
        setSelected(selected.filter( (item: string) => item !== category));
    };

    const checkSelected = (category: string) => {
        if (selected.includes(category)) {
            return true;
        }
        return false;
    };

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

    useEffect( () => {
        route.params.setSelectedCategories(selected);
        getTheme();
    }, [route.params, selected]);

    return (
        <ScrollView style={palette.bg}>
            {
                categories.map( (category: any, index: number) => (
                    <CheckboxCategory key={index} category={category} selected={checkSelected(category)} addToSelected={addToSelectedCategories} removeFromSelected={removeFromSelectedCategories} palette={palette} />
                ))
            }
        </ScrollView>
    );
};

export default Filter;
