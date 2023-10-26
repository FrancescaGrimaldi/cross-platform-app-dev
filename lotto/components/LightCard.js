/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View, Pressable } from 'react-native';

const LightCard = (props) => {
    const onLightCardPress = () => {
        props.switchPage('Subscription', props.boldText)
    }

    return (
        <Pressable onPress={onLightCardPress}>

            <View style={{ 
                backgroundColor: '#b2d2aa',
                height: 60,
                width: 150,
                borderRadius: 10,
                margin: 4,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text style={{color: '#22391f', fontWeight: 'bold'}}>{props.boldText}</Text>
                <Text style={{color: '#4e6b4a'}}>{props.smallText}</Text>
            </View>
            
        </Pressable>
    );
}

export default LightCard;