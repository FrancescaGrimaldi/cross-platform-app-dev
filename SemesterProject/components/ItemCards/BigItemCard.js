/* eslint-disable prettier/prettier */

import React from 'react';
import { View, Image, Text, Pressable, StyleSheet } from 'react-native';

import i18n from '../../translations/I18n';

const imagesMap = {
    1: require('../../images/items/1_1.jpg'),
    2: require('../../images/items/2_1.jpg'),
    3: require('../../images/items/3_1.jpg'),
    4: require('../../images/items/4_1.jpg'),
    5: require('../../images/items/5_1.jpg'),
    6: require('../../images/items/6_1.jpg'),
    7: require('../../images/items/7_1.jpg'),
};

const BigItemCard = (props) => {
    return (
        <Pressable onPress={() => props.navigation.navigate('ItemDetails', props.id)}>
            <View style={styles.container}>
                <Image style={styles.img} source={imagesMap[props.id]} />

                <View style={styles.textContainer}>
                    <Text style={styles.bigText}>{props.name}</Text>
                    <Text style={styles.smallText}>{i18n.t('Items.contact')} {props.contact}</Text>
                </View>
            </View>
        </Pressable>
    );
};

export default BigItemCard;

const styles = StyleSheet.create({
    container: {
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
    },
    img: {
        width: '100%',
        height: '85%',
        borderRadius: 10,
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginLeft: 10,
    },
    bigText: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    smallText: {
        fontSize: 18,
    },
});
