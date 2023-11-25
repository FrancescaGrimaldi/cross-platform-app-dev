/* eslint-disable prettier/prettier */

import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

import Fontisto from 'react-native-vector-icons/Fontisto';

import i18n from '../translations/I18n';

const EmptyCart = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.basketBox}>
                <Fontisto name="shopping-basket" size={80} color="black"/>

                <View style={styles.textContainer}>
                    <Text style={styles.bigText}>{i18n.t('ShoppingCart.empty.text1')}</Text>
                    <Text style={styles.smallText}>{i18n.t('ShoppingCart.empty.text2')}</Text>
                </View>
            </View>
            <View style={styles.button}>
                <Pressable onPress={() => props.navigation.navigate('Homepage')}>
                    <Text style={styles.bigText}>{i18n.t('ShoppingCart.empty.gotohome')}</Text>
                </Pressable>
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
        fontSize: 23,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    smallText: {
        fontSize: 21,
        textAlign: 'center',
    },
    button: {
        marginTop: 30,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: 'white',
        alignSelf: 'center',
        height: 40,
        width: 200,
        elevation: 5,
    },
});
