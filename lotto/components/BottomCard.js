/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
import React from 'react';
import { Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BottomCard = (props) => {
    return (
        <View style={{
            flex: 0.5,
            justifyContent: "center",
            backgroundColor: "#b2d2aa",
            width: 310,
            height: 90,
            borderRadius: 10,
            marginBottom: 5,
        }}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#22391f', marginLeft: 10}}>{props.mainText}</Text>
            <Text style={{color: '#22391f', marginLeft: 10}}>{props.caption}</Text>
            <Ionicons name="chevron-forward-outline" size={30} color="#22391f" style={{position: 'absolute', right: 10}} />
        </View>
    );
}

export default BottomCard;