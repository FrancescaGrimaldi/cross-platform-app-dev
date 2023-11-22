/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { View, Text, Pressable} from 'react-native';

import Fontisto from 'react-native-vector-icons/Fontisto';

const EmptyCart = (props) => {
    return (
        <View style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 2,
            height: '80%',
        }}>
            <Fontisto name="shopping-basket" size={60} color="black"/>
            
            <View style={{
                marginTop: 20,
                alignItems: 'center',
            }}>
                <Text style={{fontSize: 25}}>Oops!</Text>
                <Text style={{fontSize: 25}}>Looks like your cart is empty!</Text>
                
                <View style={{
                    marginTop: 30,
                    borderRadius: 10,
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    height: 40,
                    width: 200,
                    elevation: 5,
                }}>
                    <Pressable onPress={() => props.navigation.navigate('Homepage')}>
                        <Text style={{fontSize: 25, textAlign: 'center'}}>Check our items</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default EmptyCart;