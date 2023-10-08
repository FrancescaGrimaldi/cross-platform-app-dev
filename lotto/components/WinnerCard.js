/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import React from 'react';
import { Text, View } from 'react-native';

const WinnerCard = (props) => {
    return (
    <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#b2d2aa',
        padding: 10,
        borderRadius: 10,
        margin: 10,
        marginHorizontal: 40,
    }}>
        <Text style={{fontSize: 19, color: '#22391f', fontWeight: 'bold'}}>Week {props.week}</Text>
        <Text style={{marginTop: 5, color: '#22391f'}}>{props.name} from {props.city}</Text>
        <Text style={{color: '#22391f'}}>{props.prize}</Text>
        <Text style={{marginTop: 5, color: '#22391f', fontWeight: 'bold'}}>Winning numbers:</Text>
        <Text style={{color: '#22391f'}}>{props.numbers}</Text>

    </View>
    )
}

export default WinnerCard;
