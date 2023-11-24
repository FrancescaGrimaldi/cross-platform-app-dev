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
            alignContent: 'center',
            height: '80%',
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 2,
                marginHorizontal: 60,
            }}>
                <Fontisto name="shopping-basket" size={80} color="black"/>
                
                <View style={{
                    marginHorizontal: 15,
                    alignItems: 'center',
                }}>
                    <Text style={{fontSize: 23, fontWeight: 'bold'}}>{i18n.t('ShoppingCart.empty.text1')}</Text>
                    <Text style={{fontSize: 21, textAlign: 'center'}}>{i18n.t('ShoppingCart.empty.text2')}</Text>
                </View>
            </View>
            <View style={{
                marginTop: 30,
                borderRadius: 10,
                justifyContent: 'center',
                backgroundColor: 'white',
                alignSelf: 'center',
                height: 40,
                width: 200,
                elevation: 5,
            }}>
                <Pressable onPress={() => props.navigation.navigate('Homepage')}>
                    <Text style={{fontSize: 23, textAlign: 'center'}}>{i18n.t('ShoppingCart.empty.gotohome')}</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default EmptyCart;