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

const BigItemCard = (props) => {
    return (
        <Pressable onPress={() => props.navigation.navigate('ItemDetails', props.id)}>
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                padding: 10,
                backgroundColor: 'white',
                marginVertical: 5,
                marginHorizontal: 15,
                borderRadius: 10,
                elevation: 7,
                height: 350,
                width: '93%',
            }}>
                <Image style={{
                    width: '100%',
                    height: '85%',
                    borderRadius: 10,
                }} source={imagesMap[props.id]} />

                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginLeft: 10,
                }}>
                    <Text style={{fontSize: 22, fontWeight: 'bold'}}>{props.name}</Text>
                    <Text style={{fontSize: 18}}>By {props.contact}</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default BigItemCard;
