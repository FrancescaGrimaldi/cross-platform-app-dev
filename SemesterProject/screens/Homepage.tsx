/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ItemCard from '../components/ItemCards/ItemCard';
import BigItemCard from '../components/ItemCards/BigItemCard';
import SidedItemCard from '../components/ItemCards/SidedItemCard';
import UpperBar from '../components/UpperBar';

import Globals from '../Globals';

const Homepage = ( {navigation}: {navigation: any} ) => {
    const [items, setItems] = useState<any>([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [searching, setSearching] = useState(false);
    const [palette, setPalette] = useState<any>(Globals.colors.light);

    // fetch items from server
    const getItems = async () => {
        try {
            const response = await fetch(`https://${Globals.serverAddress}/items`);
            const json = await response.json();
            // check if there are any categories to filter by
            if (filteredCategories.length > 0) {
                var filteredItems = json.filter(function (item: { category: string | any[]; }) {
                    return filteredCategories.includes(item.category);
                });
                setItems(filteredItems);
            } else {
                setItems(json);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getTheme = async () => {
        try {
            let theme = await AsyncStorage.getItem('theme');
            if (theme !== null) {
                if (theme === 'light') {
                    setPalette(Globals.colors.light);
                } else {
                    setPalette(Globals.colors.dark);
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        const id = setInterval(() => {
            if (!searching) { getItems(); }
            getTheme();
        }, 3000);

        return () => {
            clearInterval(id);
        };
    });

    const createGrid = () => {
        let counter = 0;

        return (
            <View style={{ flexDirection: 'column'}}>
                { items.map( (item: any) => {
                    counter++;

                    if (counter > 4) { counter = 1; }
                    if (filteredCategories.length > 0 || searching) { counter = 2; }
                    if (counter === 1) {
                        return <BigItemCard key={item.id} id={item.id} name={item.name} contact={item.contact} navigation={navigation} palette={palette} />;
                    } else if (counter === 2) {
                        return <ItemCard key={item.id} id={item.id} navigation={navigation} palette={palette} />;
                    } else if (counter === 3) {
                        return (
                            <View style={styles.sidedCardsContainer}>
                                <SidedItemCard key={item.id} id={item.id} name={item.name} contact={item.contact} navigation={navigation} palette={palette} />
                                {
                                    (items[items.indexOf(item) + 1] !== undefined) &&
                                    <SidedItemCard key={items[items.indexOf(item) + 1].id} id={items[items.indexOf(item) + 1].id} name={items[items.indexOf(item) + 1].name} contact={items[items.indexOf(item) + 1].contact} navigation={navigation} palette={palette} />
                                }
                            </View>
                        );
                    }
                })}
            </View>
        );
    };

    return (
        <View style={[palette.bg, {flex: 1}]}>
            <UpperBar from="Homepage" items={items} getItems={getItems} setItems={setItems} filteredCategories={filteredCategories} setFilteredCategories={setFilteredCategories} setSearching={setSearching} navigation={navigation} palette={palette} />

            <ScrollView style={styles.scrollview}>
                { createGrid() }
            </ScrollView>
        </View>
    );
};

export default Homepage;

const styles = StyleSheet.create({
    sidedCardsContainer: {
        flexDirection: 'row',
        width: '93%',
        justifyContent: 'space-between',
    },
    scrollview: {
        marginTop: 10,
    },
});
