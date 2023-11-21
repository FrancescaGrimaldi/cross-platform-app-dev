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

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialComm from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalWindow from '../components/ModalWindow';
import SmallItemCard from '../components/SmallItemCard';
import CartButton from '../components/CartButton';

const ShoppingCart = ( {navigation}: {navigation: any} ) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [total, setTotal] = useState(0);
    const [fee, setFee] = useState(0);  // TODO: calculate fees
    const [cartItems, setCartItems] = useState<{id: number, item_id: number, quantity: number,}[]>([]);
    const [suggestedItems, setSuggestions] = useState<any[]>([]);  // TODO: suggest items based on [cartItems] category

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
        for (let item of cartItems) {
            try {
                const response = await fetch(`https://${Globals.serverAddress}/items/` + item.item_id);
                const json = await response.json();
                sum += json.price * item.quantity;
            } catch (error) {
                console.error(error);
            }
        }
        setTotal(sum);
        setFee(sum / 100);
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
                <Title title="My shopping basket"/>
            </View>

            <Text style={{fontWeight: 'bold', marginLeft: 15, fontSize: 22}}>Order summary</Text>

            <ScrollView style={{
                height: '20%',
                marginTop: 5,
                marginHorizontal: 15,
            }}>
                {
                    cartItems.map( (item: any, index: number) => (
                        <Cart id={item.item_id} quantity={item.quantity} key={index} />
                    ))
                }
            </ScrollView>
            
            <View style={{
                marginHorizontal: 15,
            }}>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <Text style={{fontSize: 18}}>Subtotal</Text>
                    <Text style={{fontSize: 18}}>{total} NOK</Text>
                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <Text style={{fontSize: 18}}>Delivery and Service fees</Text>
                    <Text style={{fontSize: 18}}>{fee} NOK</Text>
                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderBottomWidth: 1,
                    borderBottomColor: 'black',
                }}>
                    <Text style={{fontSize: 18,  fontWeight: 'bold'}}>Total</Text>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>{total + fee} NOK</Text>
                </View>

            </View>

            <View>
                <Text style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    marginTop: 30,
                    marginHorizontal: 15,
                }}>You might also like...</Text>

                <ScrollView horizontal={true} style={{margin: 15}}>
                    {
                        suggestedItems.map( (item: any, index: number) => (
                            <SmallItemCard id={item.id} name={item.name} key={index} navigation={navigation}/>
                        ))
                    }
                </ScrollView>

            </View>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 'auto',
                marginHorizontal: 15,
            }}>
                <CartButton onPress={resetCart} icon="reset" text="Reset" backgroundColor="#fc5c65"/>
                <CartButton onPress={checkout} icon="checkout" text="Checkout" backgroundColor="#3ae374"/>
            </View>

            <ModalWindow visible={modalVisible} text="Operation completed successfully" buttonText="Close" onClose={confirmCheckout} onPress={confirmCheckout}/>
        </View>

    );            
}

export default ShoppingCart;