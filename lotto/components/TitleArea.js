/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
import React from 'react';
import { Text, View } from 'react-native';

const TitleArea = (props) => {
    return (
        <View style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
        }}>
            <View style={{ 
                height: 60,
                width: 250,
                marginBottom: 8,
                alignItems: "center",
                justifyContent: "center",
            }}>
                <Text style={{color: '#22391f', fontWeight: 'bold', textAlign: 'center', fontSize: 25}}>{props.bigTitle}</Text>
            </View>
            
            <View style={{ 
                backgroundColor: "#cfe3ca",
                height: 20,
                width: 240,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
            }}>
                <Text style={{color: '#22391f', fontSize: 12}}>{props.subtitle}</Text>
            </View>
        </View>
    );
}

export default TitleArea;