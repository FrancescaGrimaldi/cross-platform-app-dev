/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
import React, { useState } from 'react';
import { Text, View } from 'react-native';

const LightCard = (props) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <View style={{ 
            backgroundColor: "#b2d2aa",
            height: 60,
            width: 150,
            borderRadius: 10,
            margin: 4,
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Text onPress={() => setIsPressed(!isPressed)} style={{color: '#22391f', fontWeight: 'bold'}}>{props.boldText}</Text>
          { isPressed ? <Text onPress={() => setIsPressed(!isPressed)} style={{color: '#718c6b'}}>{props.smallText}</Text> : null }
        </View>
    );
}

export default LightCard;