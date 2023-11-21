/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */

import React, {useState, useEffect} from 'react';
import { View, Text} from 'react-native';

import Globals from '../Globals';

const Cart = (props) => {
    const [item, setItem] = useState({});
    
    const findItem = async () => {
        try {
            const response = await fetch(`http://${Globals.serverAddress}/items/${props.id}`);
            const json = await response.json();
            setItem(json);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        findItem()
    })

    return (
        <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: 'pink',
        }}>
            <Text>{item.name}</Text>
            <Text>x{props.quantity}</Text>
        </View>
    )
}

export default Cart;