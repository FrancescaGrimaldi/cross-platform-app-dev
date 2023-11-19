/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, {useState, useEffect} from 'react';
import { Text, View, ScrollView, Pressable } from 'react-native';

const ItemDetails = ( {navigation, route}: {navigation: any, route: any} ) => {
    const [item, setItem] = useState([]);
    const [isFav, setIsFav] = useState(false);  // TODO: check if item is in the bookmarks list

    // fetch item details from server
    const getItemDetails = async () => {
        try {
            const response = await fetch('https://9aa1-2001-700-300-4035-2dd5-fa65-60e1-1cf0.ngrok-free.app/items/' + route.params);
            const json = await response.json();
            setItem(json);
        } catch (error) {
            console.error(error);
        }
    }

    const checkFav = async () => {
        try {
            const response = await fetch('https://9aa1-2001-700-300-4035-2dd5-fa65-60e1-1cf0.ngrok-free.app/bookmarks/?item_id=' + route.params);
            const json = await response.json();
            if (json.length > 0) {
                setIsFav(true);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const addToCart = async () => {
        // check if the item is already in the shopping cart, if so, increment the quantity
        try {
            const response = await fetch('https://9aa1-2001-700-300-4035-2dd5-fa65-60e1-1cf0.ngrok-free.app/cart/?item_id=' + route.params);
            const json = await response.json();
            if (json.length > 0) {
                await fetch('https://9aa1-2001-700-300-4035-2dd5-fa65-60e1-1cf0.ngrok-free.app/cart/' + json[0].id, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        quantity: json[0].quantity + 1,
                    }),
                });
                return;
            } else {
                await fetch('https://9aa1-2001-700-300-4035-2dd5-fa65-60e1-1cf0.ngrok-free.app/cart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        item_id: route.params,
                        quantity: 1,
                    }),
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    const addToFavs = async () => {
        // check if the item is already in the bookmarks list, if so, return
        try {
            const response = await fetch('https://9aa1-2001-700-300-4035-2dd5-fa65-60e1-1cf0.ngrok-free.app/bookmarks/?item_id=' + route.params);
            const json = await response.json();
            if (json.length > 0) {
                return;
            } else {
                await fetch('https://9aa1-2001-700-300-4035-2dd5-fa65-60e1-1cf0.ngrok-free.app/bookmarks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        item_id: route.params,
                    }),
                });
                setIsFav(true);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const removeFromFavs = async () => {
        try {
            // delete using the id of the bookmark
            const response = await fetch('https://9aa1-2001-700-300-4035-2dd5-fa65-60e1-1cf0.ngrok-free.app/bookmarks/?item_id=' + route.params);
            const json = await response.json();
            const id = json[0].id;
            await fetch('https://9aa1-2001-700-300-4035-2dd5-fa65-60e1-1cf0.ngrok-free.app/bookmarks/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: null,
            });
            setIsFav(false);
        } catch (error) {
            console.error(error);
        }
    }

    const switchFav = () => {
        if (isFav) {
            removeFromFavs();
        } else {
            addToFavs();
        }
    }

    useEffect( () => {
        getItemDetails();
        checkFav();
    }, []);
    
    return (
        <ScrollView>
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

            {
                isFav ? <Text>Item is in the bookmarks list</Text> : <Text>Item is not in the bookmarks list</Text>
            }

            <Pressable onPress={switchFav}>
                <Text>Bookmarks</Text>
            </Pressable>

            <Pressable onPress={addToCart}>
                <Text>Add to cart</Text>
            </Pressable>
        </ScrollView>
    );            
}

export default ItemDetails;