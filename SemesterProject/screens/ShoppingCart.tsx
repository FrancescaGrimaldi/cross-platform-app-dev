/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, {useState, useEffect} from 'react';
import { Text, View, ScrollView, Pressable, StyleSheet, Image } from 'react-native';
import Globals from '../Globals';
import Title from '../components/Title';
import Cart from '../components/Cart';
import EmptyCart from '../components/EmptyCart';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ModalWindow from '../components/ModalWindow';
import SmallItemCard from '../components/SmallItemCard';
import CartButton from '../components/CartButton';

import i18n from '../translations/I18n';

const ShoppingCart = ( {navigation}: {navigation: any} ) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [total, setTotal] = useState(0);
    const [fee, setFee] = useState(0);
    const [cartItems, setCartItems] = useState<{id: number, item_id: number, quantity: number,}[]>([]);
    const [suggestedItems, setSuggestions] = useState<any[]>([]);
    const [deliveryTime, setDeliveryTime] = useState(0);

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
    }

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
    }

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
    }

    useEffect(() => {
        const id = setInterval(() => {
            getCartItems();
        }, 3000)
        
        return () => {
            clearInterval(id);
        }
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
    }

    const checkout = () => {
        setModalVisible(true);
    }

    const confirmCheckout = async () => {
        resetCart();
        setModalVisible(false);
    }

    return (
        <View>
            <View style={{marginLeft: 15}}>
                <Title title={i18n.t('ShoppingCart.title')}/>
            </View>

        { cartItems.length === 0 ? <EmptyCart navigation={navigation}/> :
            <ScrollView style={{
                marginBottom: 85,
            }}>

                <Text style={{fontWeight: 'bold', marginLeft: 15, fontSize: 22}}>{i18n.t('ShoppingCart.summary')}</Text>

                <View style={{
                    marginVertical: 20,
                    marginHorizontal: 15,
                }}>
                    {
                        cartItems.map( (item: any, index: number) => (
                            <Cart id={item.item_id} quantity={item.quantity} key={index} />
                        ))
                    }
                </View>
                
                <View style={{
                    marginHorizontal: 15,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                    }}> 
                        <MaterialIcons name="delivery-dining" size={55} color="black" />
                        <View style={{
                            flexDirection: 'column',
                            marginLeft: 25,
                        }}>
                            <Text style={{fontSize: 17}}>{i18n.t('ShoppingCart.delivery')}</Text>
                            <Text style={{fontSize: 21, fontWeight: 'bold'}}>{deliveryTime} min</Text>
                        </View>
                    </View>
                    
                    <View style={{
                        marginVertical: 20,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <Text style={{fontSize: 18}}>{i18n.t('ShoppingCart.subtotal')}</Text>
                            <Text style={{fontSize: 18}}>{total} NOK</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <Text style={{fontSize: 18}}>{i18n.t('ShoppingCart.fees')}</Text>
                            <Text style={{fontSize: 18}}>{fee} NOK</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            borderBottomWidth: 1,
                            borderBottomColor: 'black',
                        }}>
                            <Text style={{fontSize: 18,  fontWeight: 'bold'}}>{i18n.t('ShoppingCart.total')}</Text>
                            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{total + fee} NOK</Text>
                        </View>
                    </View>

                </View>
                
                { suggestedItems.length > 0 &&
                    <View style={{marginVertical: 10}}>
                        <Text style={{
                            fontSize: 22,
                            fontWeight: 'bold',
                            marginHorizontal: 15,
                        }}>{i18n.t('ShoppingCart.suggested.title')}</Text>

                        <Text style={{marginHorizontal: 15, fontSize: 18}}>{i18n.t('ShoppingCart.suggested.text')}</Text>

                        <ScrollView horizontal={true} style={{marginHorizontal: 15, marginTop: 10}}>
                            {
                                suggestedItems.map( (item: any, index: number) => (
                                    <SmallItemCard id={item.id} name={item.name} key={index} navigation={navigation}/>
                                ))
                            }
                        </ScrollView>

                    </View>
                }

                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                    marginHorizontal: 15,
                }}>
                    <CartButton onPress={resetCart} icon="reset" text={i18n.t('ShoppingCart.reset')} backgroundColor="#fc5c65"/>
                    <CartButton onPress={checkout} icon="checkout" text={i18n.t('ShoppingCart.checkout.title')} backgroundColor="#3ae374"/>
                </View>

                <ModalWindow visible={modalVisible} text={i18n.t('ShoppingCart.checkout.success')} buttonText={i18n.t('ShoppingCart.checkout.close')} onClose={confirmCheckout} onPress={confirmCheckout}/>
            
            </ScrollView>
        }
        
        </View>



    );            
}

export default ShoppingCart;