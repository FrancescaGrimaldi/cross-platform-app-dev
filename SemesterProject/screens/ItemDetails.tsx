/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, {useState, useEffect} from 'react';
import { Text, View, ScrollView } from 'react-native';

const ItemDetails = ( {navigation, route}: {navigation: any, route: any} ) => {
    const [item, setItem] = useState([]);

    // fetch item details from server
    const getItemDetails = async () => {
        try {
            const response = await fetch('https://7f9d-188-113-90-45.ngrok-free.app/items/' + route.params);
            const json = await response.json();
            setItem(json);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect( () => {
        getItemDetails();
    });

    
    return (
        <ScrollView style={{flex: 1}}>
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: 'grey',
            }}>
                <Text>{item.name}</Text>
                <Text>{item.category}</Text>
                <Text>{item.price}</Text>
            </View>
        </ScrollView>
    );            
}

export default ItemDetails;