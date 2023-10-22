/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { Text, View, Pressable } from 'react-native';
import DarkCard from '../components/DarkCard';

const Subscription = ( {navigation, route}: {navigation: any, route: any} ) => {
    const {week} = route.params;
    var data = require('../data/data.json').subscription;

    var text = '';
    var price = '';
    for (let item of data) {
        if (item.length === week) {
            text = item.paragraph;
            price = item.price;
        }
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#ecf2eb',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        }}>
            <Text style={{
                fontSize: 20,
                color: '#22391f',
                margin: 20,
            }}>{text}</Text>

            <Pressable onPress={() => navigation.navigate('Home')}>
                <DarkCard text={price} logo="money" />
            </Pressable>
        </View>
    );
}

export default Subscription;