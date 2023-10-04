/* eslint-disable prettier/prettier */
/* eslint-disable jsx-quotes */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
import React from 'react';
import { Text, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialComm from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAw5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';

const DarkCard = (props) => {
    const logos = {
        "clover": <MaterialComm name='clover' size={20} color='#ddf0d8' style={{position: 'absolute', right: 10}} />,
        "pie-chart": <AntDesign name='piechart' size={18} color='#ddf0d8' style={{position: 'absolute', right: 10}} />,
        "system": <FontAw5 name='network-wired' size={18} color='#ddf0d8' style={{position: 'absolute', right: 10}} />,
        "star": <AntDesign name='star' size={20} color='#ddf0d8' style={{position: 'absolute', right: 10}} />,
        "pencil": <Entypo name='pencil' size={20} color='#ddf0d8' style={{position: 'absolute', right: 10}} />,
        "info": <AntDesign name='questioncircleo' size={20} color='#ddf0d8' style={{position: 'absolute', right: 10}} />,
    };

    return (
        <View style={{ 
            backgroundColor: "#22391f",
            height: 40,
            width: 150,
            borderRadius: 10,
            margin: 2,
            justifyContent: "center",
        }}>
            <Text style={{color: '#ddf0d8', fontWeight: 'bold', marginLeft: 7}}>{props.text}</Text>
            {logos[props.logo]}
        </View>
    );
};

export default DarkCard;