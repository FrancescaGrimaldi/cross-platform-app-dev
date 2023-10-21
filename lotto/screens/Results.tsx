/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable eol-last */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */

import React, { useState } from 'react';
import { View, TextInput, SafeAreaView, ScrollView } from 'react-native';

import WinnerCard from '../components/WinnerCard';

const Results = ( {navigation}: {navigation: any} ) => {

    const initialItems = require('../data/data.json').results;
    initialItems.sort((a: { week: number; }, b: { week: number; }) => (a.week > b.week) ? -1 : 1);
    
    const [items, setItems] = useState(initialItems);

    return (
        <SafeAreaView>
            <View style={{backgroundColor: '#ecf2eb'}}>
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
                            setItems(initialItems);
                        }
                    }}
                />
            </View>
            <ScrollView style={{backgroundColor: '#ecf2eb', marginBottom: 55}}>
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