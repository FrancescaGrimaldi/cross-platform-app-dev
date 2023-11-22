/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */

import React from 'react';
import { View, Image, Text, Pressable } from 'react-native';

const imagesMap = {
    1: require('../images/items/1_1.jpg'),
    2: require('../images/items/2_1.jpg'),
    3: require('../images/items/3_1.jpg'),
    4: require('../images/items/4_1.jpg'),
    5: require('../images/items/5_1.jpg'),
    6: require('../images/items/6_1.jpg'),
    7: require('../images/items/7_1.jpg'),
}

const SmallItemCard = (props) => {
    return (
        <Pressable onPress={() => props.navigation.navigate('ItemDetails', props.id)}>
            <View style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                borderRadius: 10,
                width: 110,
                height: 120,
                marginHorizontal: 5,
            }}>
                <Image source={imagesMap[props.id]} style={{width: 70, height: 70, borderRadius: 10}}/>
                <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>{props.name}</Text>
            </View>
        </Pressable>
    )
}

export default SmallItemCard;
