/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import { Text, View, ScrollView } from 'react-native';

const ItemDetails = ( {navigation}: {navigation: any} ) => {
    
    return (
        <ScrollView style={{flex: 1}}>
            <View style={{backgroundColor: 'pink'}}>
                <Text>ItemDetails</Text>
            </View>
        </ScrollView>
    );            
}

export default ItemDetails;