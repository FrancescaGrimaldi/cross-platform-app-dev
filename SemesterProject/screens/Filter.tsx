/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CheckboxCategory from '../components/CheckboxCategory';

import Palette from '../Palette';

const Filter = ( {navigation, route}: {navigation: any, route: any} ) => {
    const categories = ['American Food', 'Asian Food', 'Italian Food'];
    const [selected, setSelected] = useState(route.params.selectedCategories);
    const [palette, setPalette] = useState<any>(Palette.colors.light);

    // adds a category to the selected categories
    const addToSelectedCategories = (category: string) => {
        setSelected([...selected, category]);
    };

    // removes a category from the selected categories
    const removeFromSelectedCategories = (category: string) => {
        setSelected(selected.filter( (item: string) => item !== category));
    };

    // checks if a category is selected
    const checkSelected = (category: string) => {
        if (selected.includes(category)) {
            return true;
        }
        return false;
    };

    // retrieve theme from async storage
    const getTheme = async () => {
        try {
            let theme = await AsyncStorage.getItem('theme');
            if (theme !== null) {
                if (theme === 'light') {
                    setPalette(Palette.colors.light);
                } else {
                    setPalette(Palette.colors.dark);
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
