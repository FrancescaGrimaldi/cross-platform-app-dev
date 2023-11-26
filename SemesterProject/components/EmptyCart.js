/* eslint-disable prettier/prettier */

import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

import Fontisto from 'react-native-vector-icons/Fontisto';

import i18n from '../translations/I18n';

const EmptyCart = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.basketBox}>
                <Fontisto name="shopping-basket" size={82} color={props.palette.purple}/>

                <View style={styles.textContainer}>
                    <Text style={[styles.smallText, props.palette.color2]}>{i18n.t('ShoppingCart.empty.text1')} {i18n.t('ShoppingCart.empty.text2')}</Text>

                    <View style={[styles.button, props.palette.card]}>
                        <Pressable onPress={() => props.navigation.navigate('Homepage')}>
                            <Text style={[styles.bigText, props.palette.color1]}>{i18n.t('ShoppingCart.empty.gotohome')}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default EmptyCart;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        height: '80%',
    },
    basketBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 2,
        marginHorizontal: 60,
    },
    textContainer: {
        marginHorizontal: 15,
        alignItems: 'center',
    },
    bigText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    smallText: {
        fontSize: 20,
        textAlign: 'center',
    },
    button: {
        marginTop: 10,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: 'white',
        alignSelf: 'center',
        height: 35,
        width: 200,
        elevation: 5,
    },
});
