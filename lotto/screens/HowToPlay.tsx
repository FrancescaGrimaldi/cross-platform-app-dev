/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable react-native/no-inline-styles */

/* payment logic not implemented, user is redirected to homepage */
import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';

const HowToPlay = ( {navigation}: {navigation: any} ) => {
    const [paragraphs, setParagraphs] = useState([]);
    
    const getParagraphs = async () => {
        try {
            const response = await fetch('https://9696-188-113-90-45.ngrok-free.app/howtoplay');
            const pars = await response.json();
            setParagraphs(pars)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect( () => {
        getParagraphs();
    });

    return (
        <ScrollView style={{
            flex: 1,
            backgroundColor: '#ecf2eb',
            flexDirection: 'column',
        }}>
            {
                paragraphs.map((item: { id: any; title: any; content: any; }, index: any) => (
                    <View key={index}>
                        <Text v-if={item.title} style={{
                            fontSize: 20,
                            color: '#22391f',
                            margin: 20,
                        }}>{item.title}</Text>
                        <Text style={{
                            fontSize: 18,
                            color: '#22391f',
                            margin: 20,
                        }}>{item.content}</Text>
                    </View>
                ))
            }
        </ScrollView>
    );
}

export default HowToPlay;