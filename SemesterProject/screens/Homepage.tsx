/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, TextInput, StyleSheet } from 'react-native';
import FontAw5 from 'react-native-vector-icons/FontAwesome5';
import Globals from '../Globals';
import ItemCard from '../components/ItemCards/ItemCard';
import BigItemCard from '../components/ItemCards/BigItemCard';
import SidedItemCard from '../components/ItemCards/SidedItemCard';

import i18n from '../translations/I18n';

const Homepage = ( {navigation}: {navigation: any} ) => {
    const [items, setItems] = useState<any>([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [searching, setSearching] = useState(false);

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

    useEffect(() => {
        const id = setInterval(() => {
            getItems();
        }, 3000);

        return () => {
            clearInterval(id);
        };
    });

    const createGrid = () => {
        let counter = 0;

        return (
            <View style={{ flexDirection: 'column' }}>
                { items.map( (item: any) => {
                    counter++;

                    if (counter > 4) { counter = 1; }
                    if (filteredCategories.length > 0 || searching) { counter = 2; }
                    if (counter === 1) {
                        return <BigItemCard key={item.id} id={item.id} name={item.name} contact={item.contact} navigation={navigation}/>;
                    } else if (counter === 2) {
                        return <ItemCard key={item.id} id={item.id} navigation={navigation}/>;
                    } else if (counter === 3) {
                        return (
                            <View style={styles.sidedCardsContainer}>
                                <SidedItemCard key={item.id} id={item.id} name={item.name} contact={item.contact} navigation={navigation}/>
                                {
                                    (items[items.indexOf(item) + 1] !== undefined) &&
                                    <SidedItemCard key={items[items.indexOf(item) + 1].id} id={items[items.indexOf(item) + 1].id} name={items[items.indexOf(item) + 1].name} contact={items[items.indexOf(item) + 1].contact} navigation={navigation}/>
                                }
                            </View>
                        );
                    }
                })}
            </View>
        );
    };

    return (
        <View>
            <View style={styles.upperBar}>
                <TextInput
                    style={styles.searchBar}
                    placeholder={i18n.t('Homepage.search.placeholder')}
                    onChangeText={newText => {
                        var matchedItems = [];

                        if (newText.trim().length > 1) {
                            matchedItems = items.filter(function (item: { name: string | any[]; }) {
                                if (typeof item.name === 'string') {
                                    return item.name.toLowerCase().includes(newText.toLowerCase());
                                }
                                return false;
                            });
                            setItems(matchedItems);
                            setSearching(true);
                        } else {
                            getItems();
                            setSearching(false);
                        }
                    }}
                    />
                    <Pressable onPress={() => navigation.navigate('Filter', {selectedCategories: filteredCategories, setSelectedCategories: setFilteredCategories})}>
                    <FontAw5 name="filter" size={25} color="#22391f" style={{marginTop: 20, marginLeft: 10}} />
                </Pressable>
            </View>

            <ScrollView style={styles.scrollview}>
                { createGrid() }
            </ScrollView>
        </View>
    );
};

export default Homepage;

const styles = StyleSheet.create({
    upperBar: {
        height: 50,
        flexDirection: 'row',
    },
    searchBar: {
        fontSize: 17,
        height: 40,
        width: '82%',
        borderColor: '#22391f',
        borderWidth: 1,
        margin: 15,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    sidedCardsContainer: {
        flexDirection: 'row',
        width: '93%',
        justifyContent: 'space-between',
    },
    scrollview: {
        marginBottom: 50,
        marginTop: 10,
    },
});
