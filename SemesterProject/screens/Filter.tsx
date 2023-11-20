/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, {useEffect, useState} from 'react';
import { ScrollView } from 'react-native';
import CheckboxCategory from '../components/CheckboxCategory';

const Filter = ( {navigation, route}: {navigation: any, route: any} ) => {
    const categories = ['American Food', 'Asian Food', 'Italian Food']
    const [selected, setSelected] = useState(route.params.selectedCategories);

    const addToSelectedCategories = (category: string) => {
        setSelected([...selected, category]);
    }

    const removeFromSelectedCategories = (category: string) => {
        setSelected(selected.filter( (item: string) => item !== category));
    }

    const checkSelected = (category: string) => {
        if (selected.includes(category)) {
            return true;
        }
        return false;
    }

    useEffect( () => {
        route.params.setSelectedCategories(selected)
    }, [route.params, selected]);
    
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