/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
import React from 'react';
import { View } from 'react-native';
import LightCard from './LightCard';
import DarkCard from './DarkCard';

const CardContainer = (props) => {
    const children = [];
    
    for (let instance of props.children) {
        if (props.color === "light") {
            children.push(<LightCard key={instance} boldText={instance[0]} smallText={instance[1]} />);
        } else if (props.color === "dark") {
            children.push(<DarkCard key={instance} text={instance[0]} logo={instance[1]} />);
        }
    }

    return (
        <View style={{ 
            flex: 1, 
            justifyContent: "center", 
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "wrap",
            alignContent: "center",
        }}>
            { children }
        </View>
    );
}

export default CardContainer;