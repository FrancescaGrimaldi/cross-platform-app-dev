/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, {useState, useEffect} from 'react';
import { Text, View, ScrollView, Pressable, Modal, StyleSheet } from 'react-native';
import Globals from '../Globals';
import Title from '../components/Title';

const ShoppingCart = ( {navigation}: {navigation: any} ) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [total, setTotal] = useState(0);
    const [fee, setFee] = useState(0);  // TODO: calculate fees
    const [cartItems, setCartItems] = useState([]);

    // fetch items in the shopping cart from server
    const getCartItems = async () => {
        try {
            const response = await fetch(`https://${Globals.serverAddress}/cart`);
            const json = await response.json();
            setCartItems(json);
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

    useEffect( () => {
        getCartItems();
        calculateTotal();
    }, [cartItems]);

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
            
            getCartItems();

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
            <Title title="My shopping basket"/>
            <ScrollView>
                {
                    cartItems.map( (item: any, index: number) => (
                        <View key={index} style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: 'grey',
                        }}>
                            <Text>{item.item_id}</Text>
                        </View>
                    ))
                }
            </ScrollView>

            <Text>Subtotal: {total}</Text>
            <Text>Delivery and Service fees: {fee}</Text>
            <Text>Total: {total + fee}</Text>

            <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                margin: 20,
            }}>You might also like... (implement!!)</Text>

            <Pressable style={{margin: 20, backgroundColor: 'cyan'}} onPress={checkout}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Checkout</Text>
            </Pressable>
            
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {confirmCheckout}}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Operation successful!</Text>
                        <Pressable style={[styles.button, styles.buttonClose]} onPress={() => confirmCheckout()}>
                            <Text style={styles.textStyle}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <Pressable onPress={resetCart} style={{margin: 20, backgroundColor: 'pink'}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Reset</Text>
            </Pressable>
        </View>

    );            
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    
    button: {
      borderRadius: 12,
      padding: 7,
      elevation: 2,
    },
    
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 18,
    },

    modalText: {
      marginBottom: 15,
      fontSize: 20,
      textAlign: 'center',
    },
});

export default ShoppingCart;