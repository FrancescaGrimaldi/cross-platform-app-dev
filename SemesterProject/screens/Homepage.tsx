/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */

import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Pressable } from 'react-native';

const Homepage = ( {navigation}: {navigation: any} ) => {
    const [items, setItems] = useState([]);

    // fetch items from server
    const getItems = async () => {
        try {
            const response = await fetch('https://9aa1-2001-700-300-4035-2dd5-fa65-60e1-1cf0.ngrok-free.app/items');
            const json = await response.json();
            setItems(json);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect( () => {
        getItems();
    }, []);
    
    return (
        <ScrollView>
            {
                items.map( (item: any, index: number) => (
                    <Pressable key={index} onPress={() => navigation.navigate('ItemDetails', item.id)}>
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
                    </Pressable>
                ))
            }
        </ScrollView>
    );            
}

export default Homepage;