/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */

import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Pressable, TextInput } from 'react-native';
import FontAw5 from 'react-native-vector-icons/FontAwesome5';
import Globals from '../Globals';

const Homepage = ( {navigation}: {navigation: any} ) => {
    const [items, setItems] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);

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
    }

    useEffect( () => {
        getItems();
    }, [filteredCategories]);
    
    return (
        <View>
            <View style={{
                height: 50,
                flexDirection: 'row',
            }}>
                <TextInput
                    style={{height: 40, width: '82%', borderColor: '#22391f', borderWidth: 1, margin: 10, padding: 10, backgroundColor: '#fff'}}
                    placeholder="Search"
                    onChangeText={newText => {
                        var matchedItems = [];

                        // don't know if i want to make it so that it searches for the item's category too
                        // is case sensitive
                        if (newText.trim().length > 0) {
                            matchedItems = items.filter(function (item: { name: string | any[]; }) {
                                return item.name.includes(newText);
                            });
                            setItems(matchedItems);
                        } else {
                            getItems();
                        }
                    }}
                />
                <Pressable onPress={() => navigation.navigate('Filter', {selectedCategories: filteredCategories, setSelectedCategories: setFilteredCategories})}>
                    <FontAw5 name="filter" size={25} color="#22391f" style={{marginTop: 15, marginLeft: 15}} />
                </Pressable>
            </View>
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
        </View>
    );            
}

export default Homepage;