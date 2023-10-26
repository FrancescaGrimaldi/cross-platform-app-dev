/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable react-native/no-inline-styles */

/* payment logic not implemented, user is redirected to homepage */
import React, { useState, useEffect } from 'react';
import { Text, View, Pressable } from 'react-native';
import DarkCard from '../components/DarkCard';

const Subscription = ( {navigation, route}: {navigation: any, route: any} ) => {
    const {week} = route.params;

    const [subscrData, setSubscrData] = useState<{ length: number, paragraph: string, price: string }[]>([]);
    
    const getSubscription = async () => {
        try {
            const response = await fetch('https://9696-188-113-90-45.ngrok-free.app/subscriptions');
            const data = await response.json();
            setSubscrData(data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect( () => {
        getSubscription();
    }, []);

    var text = '';
    var price = '';
    if (subscrData) {
        for (let item of subscrData) {
            if (item.length === week) {
                text = item.paragraph;
                price = item.price;
            }
        }
    }
    
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#ecf2eb',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        }}>
            <Text style={{
                fontSize: 20,
                color: '#22391f',
                margin: 20,
            }}>{text}</Text>

            <Pressable onPress={() => navigation.navigate('Home')}>
                <DarkCard text={price} logo="money" />
            </Pressable>
        </View>
    );
}

export default Subscription;