/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { View, Text, Pressable} from 'react-native';

import i18n from '../translations/I18n';

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
                <Text style={{fontSize: 25}}>{i18n.t('ShoppingCart.empty.text1')}</Text>
                <Text style={{fontSize: 23}}>{i18n.t('ShoppingCart.empty.text2')}</Text>
                
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
                        <Text style={{fontSize: 23, textAlign: 'center'}}>{i18n.t('ShoppingCart.empty.gotohome')}</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default EmptyCart;