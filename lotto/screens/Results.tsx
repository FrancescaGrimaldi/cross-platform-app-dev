/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */

import React, { useState, useEffect } from 'react';
import { View, TextInput, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import WinnerCard from '../components/WinnerCard';

const Results = ( {navigation}: {navigation: any} ) => {
    const [items, setItems] = useState([]);
    const dbUrl = 'https://974b-188-113-90-45.ngrok-free.app/results';

    // fetch results from server
    const getResults = async () => {
        try {
            const response = await fetch(dbUrl + '?_sort=week&_order=desc');
            const initialItems = await response.json();
            setItems(initialItems)
        } catch (error) {
            console.error(error);
        }
    }

    // modify background color from data in AsyncStorage
    const [preferredBgColor, setPreferredBgColor] = useState('#ecf2eb');

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

    useEffect( () => {
        getResults();
        updateBgColor();
    }, []);

    return (
        <SafeAreaView>
            <View style={{backgroundColor: preferredBgColor}}>
                <TextInput
                    style={{height: 40, borderColor: '#22391f', borderWidth: 1, margin: 10, padding: 10, backgroundColor: '#fff'}}
                    placeholder="Search by week"
                    onChangeText={newText => {
                        var matchedItems = [];

                        if (newText.trim().length > 0) {
                            matchedItems = items.filter(function (item: { week: string | any[]; }) {
                                return item.week.includes(newText);
                            });
                            setItems(matchedItems);
                        } else {
                            getResults();
                        }
                    }}
                />
            </View>
            <ScrollView style={{backgroundColor: preferredBgColor, marginBottom: 55}}>
                {
                    items.map((item: { id: any; week: any; winner: any; city: any; prize: any; winningNumbers: any; }, index: any) => (
                    <WinnerCard key={index} id={item.id} week={item.week} name={item.winner} city={item.city} prize={item.prize} numbers={item.winningNumbers} />
                    ))
                }
            </ScrollView>
        </SafeAreaView>
    );
}

export default Results;