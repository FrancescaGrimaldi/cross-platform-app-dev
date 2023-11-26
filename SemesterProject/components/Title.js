/* eslint-disable prettier/prettier */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Globals from '../Globals';

const Title = (props) => {
    const [theme, setTheme] = useState('');

    const getTheme = async () => {
        try {
            let colors = await AsyncStorage.getItem('theme');
            if (theme !== null) {
                setTheme(colors);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        const id = setInterval(() => {
            getTheme();
        }, 3000);

        return () => {
            clearInterval(id);
        };
    });

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
