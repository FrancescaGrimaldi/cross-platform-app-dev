/* eslint-disable prettier/prettier */

import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import Title from '../components/Title';
import ItemCard from '../components/ItemCards/ItemCard';

import Globals from '../Globals';
import i18n from '../translations/I18n';

const Bookmarks = ( {navigation}: {navigation: any} ) => {
    const [favs, setFavs] = useState([]);

    // fetch bookmarked items' id from server
    const getFavs = async () => {
        try {
            const response = await fetch(`https://${Globals.serverAddress}/bookmarks`);
            const json = await response.json();
            setFavs(json);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const id = setInterval(() => {
            getFavs();
        }, 3000);

        return () => {
            clearInterval(id);
        };
    });

    return (
        <View>
            <View style={styles.titleView}>
                <Title title={i18n.t('Bookmarks.title')}/>
            </View>
            <ScrollView style={styles.scrollview}>
                {
                    // retrieve the item name from the id using findName()
                    favs.map( (item: any) => (
                        <ItemCard key={item.id} id={item.item_id} navigation={navigation}/>
                    ))
                }
            </ScrollView>
        </View>
    );
};

export default Bookmarks;

const styles = StyleSheet.create({
    titleView: {
        marginLeft: 15,
    },
    scrollview: {
        flexDirection: 'column',
        marginBottom: 85,
    },
});
