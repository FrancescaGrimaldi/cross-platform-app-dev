/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Title from '../components/Title';
import CartItem from '../components/CartItem';
import EmptyCart from '../components/EmptyCart';
import ModalWindow from '../components/ModalWindow';
import SmallItemCard from '../components/ItemCards/SmallItemCard';
import CartButton from '../components/CartButton';

import Globals from '../Globals';
import Palette from '../Palette';
import i18n from '../translations/I18n';

const ShoppingCart = ( {navigation}: {navigation: any} ) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [total, setTotal] = useState(0);
    const [fee, setFee] = useState(0);
    const [cartItems, setCartItems] = useState<{id: number, item_id: number, quantity: number,}[]>([]);
    const [suggestedItems, setSuggestions] = useState<any[]>([]);
    const [deliveryTime, setDeliveryTime] = useState(0);
    const [palette, setPalette] = useState<any>(Palette.colors.light);

    // fetch items in the shopping cart from server
    const getCartItems = async () => {
        try {
            const response = await fetch(`https://${Globals.serverAddress}/cart`);
            const json = await response.json();
            setCartItems(json);
            calculateTotal();
            suggestItems();
        } catch (error) {
            console.error(error);
        }
    };

    const calculateTotal = async () => {
        let sum = 0;
        let deliTime = 0;

        for (let item of cartItems) {
            try {
                const response = await fetch(`https://${Globals.serverAddress}/items/` + item.item_id);
                const json = await response.json();
                sum += json.price * item.quantity;
                deliTime += item.quantity * 15;
            } catch (error) {
                console.error(error);
            }
        }
        setTotal(sum);
        setFee(sum / 100);
        setDeliveryTime(deliTime);
    };

    const suggestItems = async () => {
        // retrieve all information of each cart item from the server and check their category to suggest similar items
        let itemsCategories: any[] = [];
        for (let item of cartItems) {
            try {
                const response = await fetch(`https://${Globals.serverAddress}/items/` + item.item_id);
                const json = await response.json();
                if (!itemsCategories.includes(json.category)) {
                    itemsCategories.push(json.category);
                }
            } catch (error) {
                console.error(error);
            }
        }
        for (let category of itemsCategories) {
            try {
                const response = await fetch(`https://${Globals.serverAddress}/items?category=` + category);
                const json = await response.json();
                // check if the suggested item is already in the cart
                for (let item of json) {
                    let found = false;
                    for (let cartItem of cartItems) {
                        if (item.id === cartItem.item_id) {
                            if (suggestedItems.map( (suggested : any) => suggested.id).indexOf(item.id) !== -1) {
                                setSuggestions(suggestedItems.filter( (suggested : any) => suggested.id !== item.id));
                            }
                            found = true;
                        }
                    }
                    if (!found && suggestedItems.map( (suggested : any) => suggested.id).indexOf(item.id) === -1) {
                        setSuggestions([...suggestedItems, item]);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const getPalette = async () => {
        try {
            let theme = await AsyncStorage.getItem('theme');
            if (theme !== null) {
                if (theme === 'light') {
                    setPalette(Palette.colors.light);
                } else {
                    setPalette(Palette.colors.dark);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        const id = setInterval(() => {
            getCartItems();
            getPalette();
        }, 3000);

        return () => {
            clearInterval(id);
        };
    });

    const resetCart = async () => {
        try {
            for (let item of cartItems) {
                await fetch(`https://${Globals.serverAddress}/cart/` + item.id, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: null,
                });
            }

            setCartItems([]);
            setTotal(0);
            setFee(0);
            setDeliveryTime(0);
            setSuggestions([]);

        } catch (error) {
            console.error(error);
        }
    };

    const checkout = () => {
        setModalVisible(true);
    };

    const confirmCheckout = async () => {
        resetCart();
        setModalVisible(false);
    };

    return (
        <View style={[{flex: 1}, palette.bg]}>
            <View style={styles.titleContainer}>
                <Title title={i18n.t('ShoppingCart.title')} palette={palette} />
            </View>

            { cartItems.length === 0 ? <EmptyCart navigation={navigation} palette={palette} /> :
            <ScrollView>
                <Text style={[styles.titleText, palette.color1]}>{i18n.t('ShoppingCart.summary')}</Text>

                <View style={styles.itemContainer}>
                    {
                        cartItems.map( (item: any, index: number) => (
                            <CartItem id={item.item_id} quantity={item.quantity} key={index} palette={palette} />
                        ))
                    }
                </View>

                <View style={{ marginHorizontal: 15 }}>
                    <View style={styles.deliveryBox}>
                        <MaterialIcons name="delivery-dining" size={55} color={palette.purple} />
                        <View style={styles.deliveryInfo}>
                            <Text style={[styles.smallText, palette.color2]}>{i18n.t('ShoppingCart.delivery')}</Text>
                            <Text style={[{fontSize: 21, fontWeight: 'bold', color: '#4A188C'}, palette.color1]}>{deliveryTime} min</Text>
                        </View>
                    </View>

                    <View style={{ marginVertical: 20 }}>
                        <View style={styles.priceContainer}>
                            <Text style={[styles.smallText, palette.color2]}>{i18n.t('ShoppingCart.subtotal')}</Text>
                            <Text style={[styles.smallText, palette.color2]}>{total} NOK</Text>
                        </View>

                        <View style={styles.priceContainer}>
                            <Text style={[styles.smallText, palette.color2]}>{i18n.t('ShoppingCart.fees')}</Text>
                            <Text style={[styles.smallText, palette.color2]}>{fee} NOK</Text>
                        </View>

                        <View style={[styles.totalContainer, palette.borderBottom]}>
                            <Text style={[styles.smallBoldText, palette.color1]}>{i18n.t('ShoppingCart.total')}</Text>
                            <Text style={[styles.smallBoldText, palette.color1]}>{total + fee} NOK</Text>
                        </View>
                    </View>

                </View>

                { suggestedItems.length > 0 &&
                    <View style={{marginVertical: 10}}>
                        <Text style={[styles.titleText, palette.color1]}>{i18n.t('ShoppingCart.suggested.title')}</Text>

                        <Text style={[styles.suggestedText, palette.color2]}>{i18n.t('ShoppingCart.suggested.text')}</Text>

                        <ScrollView horizontal={true} style={styles.horizontalScrollview}>
                            {
                                suggestedItems.map( (item: any, index: number) => (
                                    <SmallItemCard id={item.id} name={item.name} key={index} navigation={navigation} palette={palette} />
                                ))
                            }
                        </ScrollView>

                    </View>
                }

                <View style={styles.buttonsContainer}>
                    <CartButton onPress={resetCart} icon="reset" text={i18n.t('ShoppingCart.reset')} backgroundColor="#fc5c65" palette={palette} />
                    <CartButton onPress={checkout} icon="checkout" text={i18n.t('ShoppingCart.checkout.title')} backgroundColor="#3ae374" palette={palette} />
                </View>

                <ModalWindow visible={modalVisible} text={i18n.t('ShoppingCart.checkout.success')} buttonText={i18n.t('ShoppingCart.checkout.close')} onClose={confirmCheckout} onPress={confirmCheckout} palette={palette} />

            </ScrollView>
            }

        </View>
    );
};

export default ShoppingCart;

const styles = StyleSheet.create({
    titleContainer: {
        marginLeft: 15,
    },
    horizontalScrollview: {
        marginHorizontal: 15,
        marginTop: 10,
    },
    itemContainer: {
        marginVertical: 20,
        marginHorizontal: 15,
    },
    smallText: {
        fontSize: 18,
    },
    deliveryInfo: {
        flexDirection: 'column',
        marginLeft: 25,
    },
    deliveryBox: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
    },
    smallBoldText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginHorizontal: 15,
    },
    suggestedText: {
        marginHorizontal: 15,
        fontSize: 18,
    },
    buttonsContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginVertical: 10,
        marginHorizontal: 15,
    },
});
