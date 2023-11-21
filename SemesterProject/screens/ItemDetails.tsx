/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, {useState, useEffect} from 'react';
import { Text, View, Pressable, Image } from 'react-native';
import Globals from '../Globals';
import Title from '../components/Title';
import ImageModal from 'react-native-image-modal';

import FontAw from 'react-native-vector-icons/FontAwesome';

const ItemDetails = ( {navigation, route}: {navigation: any, route: any} ) => {
    const [item, setItem] = useState([]);
    const [isFav, setIsFav] = useState(false); // TODO: save favs in local storage (?)
    const imgSources = [require('../images/items/1_1.jpg'), require('../images/items/1_2.jpg'), require('../images/items/1_3.jpg'), require('../images/items/1_4.jpg'), require('../images/items/1_5.jpg')]

    // fetch item details from server
    const getItemDetails = async () => {
        try {
            const response = await fetch(`https://${Globals.serverAddress}/items/` + route.params);
            const json = await response.json();
            setItem(json);
        } catch (error) {
            console.error(error);
        }
    }

    const checkFav = async () => {
        try {
            const response = await fetch(`https://${Globals.serverAddress}/bookmarks/?item_id=` + route.params);
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
            const response = await fetch(`https://${Globals.serverAddress}/cart/?item_id=` + route.params);
            const json = await response.json();
            if (json.length > 0) {
                await fetch(`https://${Globals.serverAddress}/cart/` + json[0].id, {
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
                await fetch(`https://${Globals.serverAddress}/cart`, {
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
            const response = await fetch(`https://${Globals.serverAddress}/bookmarks/?item_id=` + route.params);
            const json = await response.json();
            if (json.length > 0) {
                return;
            } else {
                await fetch(`https://${Globals.serverAddress}/bookmarks`, {
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
            const response = await fetch(`https://${Globals.serverAddress}/bookmarks/?item_id=` + route.params);
            const json = await response.json();
            const id = json[0].id;
            await fetch(`https://${Globals.serverAddress}/bookmarks/` + id, {
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
        <View>

            <View style={{
                marginLeft: 15,
                flexDirection: 'column',
                justifyContent: 'space-between',
                marginVertical: 10,
            }}>
                <Text style={{fontSize: 16, marginRight: 80}}>{item.category}</Text>
                <Title title={item.name} subtitle={`By ${item.contact}`} />
            </View>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
                marginLeft: 15,
            }}>
                <Image source={imgSources[(item.id - 1) * 6]} style={{width: '80%', height: 200, borderRadius: 13}} />
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                }}>
                    <Pressable onPress={switchFav}>
                        <FontAw name={isFav ? 'heart' : 'heart-o'} size={32} color="#22391f" style={{marginRight: 20, marginLeft: 10}} />
                    </Pressable>
                    <View>
                        <Pressable onPress={addToCart}>
                            <FontAw name="shopping-cart" size={35} color="#22391f" style={{marginRight: 20, marginLeft: 12}} />
                        </Pressable>
                        <Text style={{marginRight: 10, fontSize: 16}}>{item.price} NOK</Text>
                    </View>
                </View>
            </View>

            <View style={{
                marginHorizontal: 15,
            }}>
                <Text style={{fontSize: 22, fontWeight: 'bold'}}>Description</Text>
                <Text style={{fontSize: 20}}>{item.fulldescr}</Text>
            </View>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                marginVertical: 20,
            }}>
                <ImageModal
                    resizeMode="cover"
                    modalImageResizeMode="contain"
                    imageBackgroundColor="#00000"
                    style={{
                        width: 90,
                        height: 90,
                    }}
                    source={imgSources[1]}
                />
                <ImageModal
                    resizeMode="cover"
                    modalImageResizeMode="contain"
                    imageBackgroundColor="#00000"
                    style={{
                        width: 90,
                        height: 90,
                    }}
                    source={imgSources[2]}
                />
                <ImageModal
                    resizeMode="cover"
                    modalImageResizeMode="contain"
                    imageBackgroundColor="#00000"
                    style={{
                        width: 90,
                        height: 90,
                    }}
                    source={imgSources[3]}
                />
                <ImageModal
                    resizeMode="cover"
                    modalImageResizeMode="contain"
                    imageBackgroundColor="#00000"
                    style={{
                        width: 90,
                        height: 90,
                    }}
                    source={imgSources[4]}
                />
            </View>
        </View>
    );            
}

export default ItemDetails;