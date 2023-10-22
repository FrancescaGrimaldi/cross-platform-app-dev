/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
/* eslint-disable react/self-closing-comp */
/* eslint-disable semi */

/* registration and login logic not implemented yet, user is redirected to the homepage after clicking on log in */
import React from 'react';
import { Text, View, TextInput, Pressable } from 'react-native';

const Profile = ( {navigation}: {navigation: any} ) => {
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#ecf2eb',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        }}>
            <View style={{
                backgroundColor: '#b2d2aa',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                width: '70%',
                padding: 20,
                borderRadius: 10,
            }}>
                <Text style={{
                    fontSize: 15,
                    color: '#22391f',
                    marginBottom: 10,
                }}>Insert your credentials</Text>
                <TextInput placeholder="email" style={{width: '80%', height: 40, borderColor: '#22391f', borderRadius: 8, borderWidth: 1, margin: 5, padding: 10, backgroundColor: '#fff'}}></TextInput>
                <TextInput placeholder="password" style={{width: '80%', height: 40, borderColor: '#22391f', borderRadius: 8, borderWidth: 1, margin: 5, padding: 10, backgroundColor: '#fff'}}></TextInput>
                <Pressable onPress={() => navigation.navigate('Homepage')}>
                    <View style={{
                        backgroundColor: '#22391f',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        borderRadius: 10,
                        marginTop: 10,
                    }}>
                        <Text style={{
                            fontSize: 15,
                            color: '#ddf0d8',
                            fontWeight: 'bold',
                            margin: 4,
                            paddingHorizontal: 10,
                        }}>Log in</Text>
                    </View>
                </Pressable>
            </View>
            <Text>Not a member yet? Register</Text>
        </View>
    );
}

export default Profile;