/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */

import React from 'react';
import { View, Text, Pressable } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialComm from 'react-native-vector-icons/MaterialCommunityIcons';

const icons = {
    checkout: <MaterialIcons name="shopping-cart-checkout" size={40} color="black"/>,
    reset: <MaterialComm name="cart-remove" size={40} color="black"/>,
}

const CartButton = (props) => {
    return (
        <Pressable onPress={props.onPress}>
            <View style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: props.backgroundColor,
                borderRadius: 10,
                width: 180,
                height: 80,
                elevation: 10,
            }}>
                { icons[props.icon] }
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>{props.text}</Text>
            </View>
        </Pressable>
    )
}

export default CartButton;
