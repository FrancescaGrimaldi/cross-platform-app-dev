/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable react-native/no-inline-styles */

import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import Paragraph from '../components/Paragraph'

const HowToPlay = ( {navigation}: {navigation: any} ) => {
    const [paragraphs, setParagraphs] = useState([]);

    const dbUrl = 'https://4a16-188-113-90-45.ngrok-free.app/howtoplay'
    
    // fetch how to play information from server
    const getParagraphs = async () => {
        try {
            const response = await fetch(dbUrl);
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
                        <Paragraph id={item.id} title={item.title} content={item.content} />
                    </View>
                ))
            }
        </ScrollView>
    );
}

export default HowToPlay;