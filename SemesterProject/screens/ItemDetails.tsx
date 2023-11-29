/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, {useState, useEffect} from 'react';
import { Text, View, Pressable, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import FontAw from 'react-native-vector-icons/FontAwesome';

import Title from '../components/Title';
import PictureGallery from '../components/PictureGallery';

import Globals from '../Globals';
import Palette from '../Palette';
import i18n from '../translations/I18n';

const imgSources = {
    1: require('../images/items/1_1.jpg'),
    2: require('../images/items/2_1.jpg'),
    3: require('../images/items/3_1.jpg'),
    4: require('../images/items/4_1.jpg'),
    5: require('../images/items/5_1.jpg'),
    6: require('../images/items/6_1.jpg'),
    7: require('../images/items/7_1.jpg'),
};

const ItemDetails = ( {navigation, route}: {navigation: any, route: any} ) => {
    const [item, setItem] = useState<any>([]);
    const [isFav, setIsFav] = useState(false);
    const [itemImg, setItemImg] = useState(require('../images/items/unavailable.jpg'));
    const [palette, setPalette] = useState<any>(Palette.colors.light);

    // fetch item details from server
    const getItemDetails = async () => {
        try {
            const response = await fetch(`https://${Globals.serverAddress}/items/` + route.params);
            const json = await response.json();
            setItem(json);
            checkFav();
            setItemImg(imgSources[json.id] || []);
        } catch (error) {
            console.error(error);
        }
    };

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
    };

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
    };

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
    };

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
    };

    const switchFav = () => {
        if (isFav) {
            removeFromFavs();
        } else {
            addToFavs();
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
        getItemDetails();
        getTheme();
    }, []);

    return (
        <View style={[{flex: 1}, palette.bg]}>

            <View style={styles.itemDetails}>
                <Text style={[styles.category, palette.color2]}>{i18n.t(`Filter.categories.${item.category}`)}</Text>
                <Title title={item.name} subtitle={`${i18n.t('Items.contact')} ${item.contact}`} palette={palette} />
            </View>

            <View style={styles.imgBox}>
                <Image source={itemImg} style={styles.img} />
                <View style={styles.buttonsContainer}>
                    <Pressable onPress={switchFav}>
                        <FontAw name={isFav ? 'heart' : 'heart-o'} size={32} color={palette.purple} style={{marginRight: 20, marginLeft: 10}} />
                    </Pressable>
                    <View>
                        <Pressable onPress={addToCart}>
                            <FontAw name="shopping-cart" size={35} color={palette.purple} style={{marginRight: 20, marginLeft: 12}} />
                        </Pressable>
                        <Text style={[styles.price, palette.color2]}>{item.price} NOK</Text>
                    </View>
                </View>
            </View>

            <View style={styles.descrBox}>
                <Text style={[styles.descrTitle, palette.color1]}>{i18n.t('Items.description')}</Text>
                <Text style={[styles.fullDescr, palette.color2]}>{item.fulldescr}</Text>
            </View>

            <PictureGallery item={item} />

        </View>
    );
};

export default ItemDetails;

const styles = StyleSheet.create({
    itemDetails: {
        marginLeft: 15,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    category: {
        fontSize: 16,
        marginRight: 80,
    },
    imgBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        marginLeft: 15,
    },
    img: {
        width: '80%',
        height: 200,
        borderRadius: 13,
    },
    buttonsContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    price: {
        marginRight: 10,
        fontSize: 16,
    },
    descrBox: {
        marginHorizontal: 15,
        marginTop: 10,
    },
    descrTitle: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    fullDescr: {
        fontSize: 20,
    },
});
