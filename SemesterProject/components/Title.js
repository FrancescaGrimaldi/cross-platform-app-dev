/* eslint-disable prettier/prettier */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Title = (props) => {
    return (
        <View>
            <Text style={[styles.title, props.palette.color1]}>{props.title}</Text>
            <Text style={[styles.subtitle, props.palette.color1]}>{props.subtitle}</Text>
        </View>
    );
};

export default Title;

const styles = StyleSheet.create({
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'left',
        marginTop: 10,
    },
    subtitle: {
        fontSize: 20,
        textAlign: 'left',
    },
});
