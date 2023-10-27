/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View } from 'react-native';

const Paragraph = (props) => {
    
    return (
        <View>
            { props.title &&
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: '#22391f',
                    marginLeft: 20,
                }}>{props.title}</Text>
            }
                        
            <Text style={{
                fontSize: 18,
                color: '#22391f',
                margin: 20,
            }}>{props.content}</Text>
        </View>
    );
}

export default Paragraph;