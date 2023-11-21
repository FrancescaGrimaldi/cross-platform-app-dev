/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
/* eslint-disable eol-last */

import React from 'react';
import { View, Text } from 'react-native';

const Title = (props) => {
    return (
        <View>
            <Text style={{
                fontSize: 35,
                fontWeight: 'bold',
                textAlign: 'left',
                marginTop: 10,
                color: 'black',
            }}>{props.title}</Text>
            <Text style={{
                fontSize: 20,
                textAlign: 'left',
                color: 'black',
            }}>{props.subtitle}</Text>
        </View>
    )
}

export default Title;