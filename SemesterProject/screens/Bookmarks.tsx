/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Title from '../components/Title';
import ItemCard from '../components/ItemCards/ItemCard';

import Globals from '../Globals';
import Palette from '../Palette';
import i18n from '../translations/I18n';

const Bookmarks = ( {navigation}: {navigation: any} ) => {
    const [favs, setFavs] = useState([]);
    const [palette, setPalette] = useState<any>(Palette.colors.light);

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

    const getTheme = async () => {
        try {
            let theme = await AsyncStorage.getItem('theme');
            if (theme !== null) {
                if (theme === 'light') {
                    setPalette(Palette.colors.light);
                } else {
                    setPalette(Palette.colors.dark);
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        const id = setInterval(() => {
            getFavs();
            getTheme();
        }, 3000);

        return () => {
            clearInterval(id);
        };
    });

    return (
        <View style={[{flex: 1}, palette.bg]}>
            <View style={styles.titleView}>
                <Title title={i18n.t('Bookmarks.title')} palette={palette} />
            </View>
            <ScrollView style={styles.scrollview}>
                {
                    // retrieve the item name from the id using findName()
                    favs.map( (item: any) => (
                        <ItemCard key={item.id} id={item.item_id} navigation={navigation} palette={palette} />
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
