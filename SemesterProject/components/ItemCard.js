/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */

import React, {useState, useEffect} from 'react';
import { View, Text, Image} from 'react-native';

import Globals from '../Globals';

const ItemCard = (props) => {
    const [item, setItem] = useState({});
    
    const findItem = async () => {
        try {
            const response = await fetch(`http://${Globals.serverAddress}/items/${props.id}`);
            const json = await response.json();
            setItem(json);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        findItem()
    })

    return (
        <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
            backgroundColor: 'white',
            marginHorizontal: 15,
            marginVertical: 5,
            borderRadius: 10,
            elevation: 5,
        }}>
            <Image style={{
                width: 70,
                height: 70,
                borderRadius: 10,
            }} source={require('../images/items/1_1.jpg')} />
            
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginLeft: 10,
            }}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                }}>{item.name}</Text>
                <Text style={{
                    fontSize: 16,
                }}>By {item.contact}</Text>
            </View>
        </View>
    )
}

export default ItemCard;