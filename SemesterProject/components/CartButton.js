/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialComm from 'react-native-vector-icons/MaterialCommunityIcons';


const CartButton = (props) => {
    const icons = {
        checkout: <MaterialIcons style={{marginLeft: 20}} name="shopping-cart-checkout" size={40} color={props.palette.checkout}/>,
        reset: <MaterialComm style={{marginLeft: 20}} name="cart-remove" size={40} color={props.palette.remove}/>,
    };

    return (
        <Pressable onPress={props.onPress}>
            <View style={[styles.button, props.palette.card]}>
                { icons[props.icon] }
                <Text style={[styles.buttonText, props.palette.color1]}>{props.text}</Text>
            </View>
        </Pressable>
    );
};

export default CartButton;

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'white',
        width: '100%',
        height: 60,
        elevation: 5,
        marginVertical: 10,
    },
    buttonText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});
