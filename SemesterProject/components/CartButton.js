/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */

import React from 'react';
import { View, Text, Pressable } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialComm from 'react-native-vector-icons/MaterialCommunityIcons';

const icons = {
    checkout: <MaterialIcons style={{marginLeft: 20}} name="shopping-cart-checkout" size={40} color="green"/>,
    reset: <MaterialComm style={{marginLeft: 20}} name="cart-remove" size={40} color="red"/>,
}

const CartButton = (props) => {
    return (
        <Pressable onPress={props.onPress}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 10,
                backgroundColor: 'white',
                width: '100%',
                height: 60,
                elevation: 5,
                marginVertical: 10,
            }}>
                { icons[props.icon] }
                <Text style={{fontSize: 18, marginLeft: 20, fontWeight: 'bold'}}>{props.text}</Text>
            </View>
        </Pressable>
    )
}

export default CartButton;
