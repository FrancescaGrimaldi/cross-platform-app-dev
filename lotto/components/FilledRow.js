/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View, Pressable } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

const FilledRow = (props) => {
    
    return (
        <View>
        <View style={{
            marginTop: 20,
            flexDirection: 'row',
        }}>
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#22391f',
                marginLeft: 20,
            }}>Row {props.id}</Text>
            <Pressable onPress={props.modPress}>
                <Entypo name="pencil" size={20} color="#22391f" style={{position: 'absolute', left: 30, top: 5}} />
            </Pressable>
            <Pressable onPress={props.delPress}>
                <AntDesign name="delete" size={20} color="#22391f" style={{position: 'absolute', left: 65, top: 5}} />
            </Pressable>
        </View>
        <View style={{
            marginHorizontal: 20,
            flexDirection: 'row',
        }}>
            {
                props.numbers.map((number, index2) => (
                    <View key={index2} style={{
                        backgroundColor: '#22391f',
                        margin: 10,
                        padding: 10,
                        width: 40,
                        height: 40,
                        borderRadius: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: '#ecf2eb',
                        }}>{number}</Text>
                    </View>
                ))
            }
        </View>
        </View>
    );
}

export default FilledRow;