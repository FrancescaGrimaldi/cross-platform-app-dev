/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, {useState} from 'react';
import { ScrollView } from 'react-native';
import CheckboxCategory from '../components/CheckboxCategory';

const Filter = ( {navigation, route}: {navigation: any, route: any} ) => {
    const categories = ['American Food', 'Asian Food', 'Italian Food']

    const addToSelectedCategories = (category: string) => {
        route.params.setSelectedCategories([...route.params.selectedCategories, category]);
    }

    const removeFromSelectedCategories = (category: string) => {
        route.params.setSelectedCategories(route.params.selectedCategories.filter( (item: string) => item !== category));
    }

    const checkSelected = (category: string) => {
        if (route.params.selectedCategories.includes(category)) {
            return true;
        }
        return false;
    }
    
    return (
        <ScrollView style={{flex: 1}}>
            {
                categories.map( (category: any, index: number) => (
                    <CheckboxCategory key={index} category={category} selected={checkSelected(category)} addToSelected={addToSelectedCategories} removeFromSelected={removeFromSelectedCategories} />
                ))
            }
        </ScrollView>
    );            
}

export default Filter;