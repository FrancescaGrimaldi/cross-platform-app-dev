/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { TextInput } from 'react-native';

const NumberInput = (props) => {
    
    return (
        <TextInput keyboardType="numeric"
            onChangeText={props.changeFunc}
            style={{
                height: 40,
                borderColor: '#22391f',
                borderWidth: 1,
                borderRadius: 40,
                margin: 10,
                padding: 10,
                backgroundColor: '#fff',
            }}
        />
    );
}

export default NumberInput;