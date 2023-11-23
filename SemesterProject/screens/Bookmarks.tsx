/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */

import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';

import Globals from '../Globals';
import Title from '../components/Title';
import ItemCard from '../components/ItemCard';

import i18n from '../translations/I18n';

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
    
    useEffect(() => {
        const id = setInterval(() => {
            getFavs();
        }, 3000)
        
        return () => {
            clearInterval(id);
        }
    });

    return (
        <View>
            <View style={{marginLeft: 15}}>
                <Title title={i18n.t('Bookmarks.title')}/>
            </View>
            <ScrollView style={{
                flexDirection: 'column',
            }}>
                {
                    // retrieve the item name from the id using findName()
                    favs.map( (item: any) => (
                        <ItemCard key={item.id} id={item.item_id} navigation={navigation}/>
                    ))
                }
            </ScrollView>
        </View>
    );            
}

export default Bookmarks;