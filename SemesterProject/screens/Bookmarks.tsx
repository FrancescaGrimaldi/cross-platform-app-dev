/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */

import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable } from 'react-native';

import Globals from '../Globals';
import Title from '../components/Title';
import ItemCard from '../components/ItemCard';

const Bookmarks = ( {navigation}: {navigation: any} ) => {
    const [favs, setFavs] = useState([])

    // fetch bookmarked items' id from server
    const getFavs = async () => {
        try {
            const response = await fetch(`https://${Globals.serverAddress}/bookmarks`);
            const json = await response.json();
            setFavs(json);
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect( () => {
        getFavs();
    }, [favs]);

    return (
        <View>
            <View style={{marginLeft: 15}}>
                <Title title="My favourites"/>
            </View>
            <ScrollView style={{
                flexDirection: 'column',
            }}>
                {
                    // retrieve the item name from the id using findName()
                    favs.map( (item: any) => (
                        <Pressable key={item.id} onPress={() => navigation.navigate('ItemDetails', item.item_id)}>
                            <ItemCard id={item.item_id}/>
                        </Pressable>
                    ))
                }
            </ScrollView>
        </View>
    );            
}

export default Bookmarks;