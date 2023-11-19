/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';

const Bookmarks = ( {navigation}: {navigation: any} ) => {
    const [favs, setFavs] = useState([]);

    // fetch bookmarked items' id from server
    const getFavs = async () => {
        try {
            const response = await fetch('https://7f9d-188-113-90-45.ngrok-free.app/bookmarks');
            const json = await response.json();
            setFavs(json);
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect( () => {
        getFavs();
    }, []);

    return (
        <ScrollView style={{
            flex: 1,
            flexDirection: 'column',
        }}>
            {
                favs.map( (item: any, index: number) => (
                    <View key={index} style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: 'grey',
                    }}>
                        <Text>{item.item_id}</Text>
                        <Text>{item.date}</Text>
                    </View>
                ))
            }
        </ScrollView>
    );            
}

export default Bookmarks;