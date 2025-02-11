/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */

import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, Image, ScrollView } from 'react-native';
import BottomCard from '../components/BottomCard';
import CardContainer from '../components/CardContainer';
import TitleArea from '../components/TitleArea';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Homepage = ( {navigation}: {navigation: any} ) => {
    const images = {
        background: require('../images/background.jpg'),
        logo: require('../images/logo.png'),
    }
    
    const childrenCards = {
        light: [['1 week', 'NOK 50'], ['2 weeks', 'NOK 90'], ['5 weeks', 'NOK 200'], ['Subscribe', 'Be the next winner!']],
        dark: [['Lucky coupon', 'clover'], ['Cooperative bank', 'pie-chart'], ['System games', 'system'], ['Super draw', 'star'], ['Fill in yourself', 'pencil'], ['How to play', 'info']],
    }

    const switchLightPage = (specificPage: any, routeParam: any) => {
        if (specificPage === 'Subscription') {
            navigation.navigate('Subscription', {week: routeParam});
        }
    }

    const switchDarkPage = (specificPage: any) => {
        if (specificPage === 'How to play') {
            navigation.navigate('How to play');
        }
        if (specificPage === 'Fill in yourself') {
            navigation.navigate('Fill in yourself');
        }
    }

    // modify background color from data in AsyncStorage
    // initialize
    const [preferredBgColor, setPreferredBgColor] = useState('#ecf2eb');

    // update
    useEffect( () => {
        updateBgColor();
    }, []);

    const updateBgColor = async() => {
        try {
            const value = await AsyncStorage.getItem('bgcolor')
            if (value !== null) {
                // value previously stored
                setPreferredBgColor(value);
            }
        } catch (error) {
            return null;
        }
    }

    return (
        <ScrollView style={{flex: 1}}>
            <View style={{
                flex: 1,
                backgroundColor: preferredBgColor,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}>

                <ImageBackground
                    source={images.background}
                    style={{width: '100%', height: 350}}
                >
                
                    <View style={{
                        flex: 0.1,
                        flexWrap: 'wrap',
                        alignContent: 'flex-start',
                    }}>
                        <Image 
                            source={images.logo}
                            style={{height: 25, marginTop: 30, resizeMode: 'contain'}}
                        />
                    </View>

                    <TitleArea bigTitle="New lotto millionaires every Thursday" subtitle="About 14 million NOK in the first prize pot" />
                    
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text style={{color: '#22391f', fontWeight: 'bold'}}>Deadline Wednesday at 18:00</Text>
                        <CardContainer color="light" children={ childrenCards.light } switchPage={switchLightPage}/>
                    </View>

                </ImageBackground>

                <CardContainer color="dark" children={ childrenCards.dark } switchPage={switchDarkPage}/>
                <BottomCard mainText="Results" caption="All winning numbers and prizes" bottomPress={() => navigation.navigate('Results')}/>
            </View>
        </ScrollView>
    );            
}

export default Homepage;