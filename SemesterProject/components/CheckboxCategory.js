/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable no-trailing-spaces */
/* eslint-disable eol-last */

import React, { useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
import { View, Text, StyleSheet } from 'react-native';

const CheckboxCategory = ({ category, selected, addToSelected, removeFromSelected }) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(selected);
    
    return (
        <View style={styles.container}>
        <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={(newValue) => {
                setToggleCheckBox(newValue);
                if (newValue) { addToSelected(category); }
                else { removeFromSelected(category); }
            }}
        />
        <Text style={styles.text}>{category}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    text: {
        fontSize: 16,
    },
});

export default CheckboxCategory;