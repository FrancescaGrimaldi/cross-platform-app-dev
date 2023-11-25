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

const SidedItemCard = (props) => {
    return (
        <Pressable onPress={() => props.navigation.navigate('ItemDetails', props.id)}>
            <View style={styles.container}>
                <Image style={styles.img} source={imagesMap[props.id]} />

                <View style={styles.textContainer}>
                    <Text style={styles.itemName}>{props.name}</Text>
                    <Text style={styles.itemContact}>{i18n.t('Items.contact')} {props.contact}</Text>
                </View>
            </View>
        </Pressable>
    );
};

export default SidedItemCard;

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
        height: 200,
        width: 175,
    },
    img: {
        width: '100%',
        height: '75%',
        borderRadius: 10,
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 2,
        alignItems: 'flex-start',
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemContact: {
        fontSize: 16,
    },
});
