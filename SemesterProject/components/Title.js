/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
/* eslint-disable eol-last */

import React from 'react';
import { View, Text } from 'react-native';

const Title = (props) => {
    return (
        <View style={{}}>
            <Text style={{
                fontSize: 35,
                fontWeight: 'bold',
                textAlign: 'left',
                marginVertical: 10,
                marginLeft: 15,
                color: 'black',
            }}>{props.title}</Text>
        </View>
    )
}

export default Title;