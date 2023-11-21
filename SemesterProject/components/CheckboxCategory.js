/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable no-trailing-spaces */
/* eslint-disable eol-last */

import React, { useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
import { View, Text, StyleSheet } from 'react-native';

const CheckboxCategory = (props) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(props.selected);
    
    return (
        <View style={styles.container}>
            <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => {
                    setToggleCheckBox(newValue);
                    if (newValue) { props.addToSelected(props.category); }
                    else { props.removeFromSelected(props.category); }
                }}
            />
            <Text style={styles.text}>{props.category}</Text>
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
        fontSize: 22,
        marginLeft: 10,
    },
});

export default CheckboxCategory;