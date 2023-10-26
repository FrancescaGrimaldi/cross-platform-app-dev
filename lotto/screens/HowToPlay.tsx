/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable react-native/no-inline-styles */

import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';

const HowToPlay = ( {navigation}: {navigation: any} ) => {
    const [paragraphs, setParagraphs] = useState([]);
    
    const getParagraphs = async () => {
        try {
            const response = await fetch('https://6fa2-188-113-90-45.ngrok-free.app/howtoplay');
            const pars = await response.json();
            setParagraphs(pars)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect( () => {
        getParagraphs();
    }, []);

    return (
        <ScrollView style={{
            flex: 1,
            backgroundColor: '#ecf2eb',
            flexDirection: 'column',
        }}>
            {
                paragraphs.map((item: { id: any; title: any; content: any; }, index: any) => (
                    <View key={index} style={{marginTop: 20}}>
                        { item.title &&
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: '#22391f',
                            marginLeft: 20,
                        }}>{item.title}</Text>}
                        
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