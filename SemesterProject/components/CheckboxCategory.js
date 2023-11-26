/* eslint-disable prettier/prettier */

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import i18n from '../translations/I18n';

const CheckboxCategory = (props) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(props.selected);

    return (
        <View style={styles.container}>
            <CheckBox
                disabled={false}
                value={toggleCheckBox}
                tintColors={{ true: props.palette.purple }}
                onValueChange={(newValue) => {
                    setToggleCheckBox(newValue);
                    if (newValue) { props.addToSelected(props.category); }
                    else { props.removeFromSelected(props.category); }
                }}
            />
            <Text style={[styles.text, props.palette.color2]}>{i18n.t(`Filter.categories.${props.category}`)}</Text>
        </View>
    );
};

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
