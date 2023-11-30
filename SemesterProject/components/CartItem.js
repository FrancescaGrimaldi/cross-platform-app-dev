/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Globals from '../Globals';

const Cart = (props) => {
    const [item, setItem] = useState({});

    // fetch item from server
    const findItem = async () => {
        try {
            const response = await fetch(`http://${Globals.serverAddress}/items/${props.id}`);
            const json = await response.json();
            setItem(json);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        findItem();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={[styles.text, props.palette.color2]}>{item.name}</Text>
            <Text style={[styles.text, props.palette.color2]}>x{props.quantity}</Text>
        </View>
    );
};

export default Cart;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
         paddingVertical: 2,
    },
    text: {
        fontSize: 18,
    },
});
