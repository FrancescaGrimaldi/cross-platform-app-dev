/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable react-native/no-inline-styles */

import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Pressable, TextInput } from 'react-native';

const Fill = ( {navigation}: {navigation: any} ) => {
    const [rows, setRows] = useState([]);
    const [newRow, setNewRow] = useState(['', '', '', '', '']);

    const getRows = async () => {
        try {
            const response = await fetch('https://6fa2-188-113-90-45.ngrok-free.app/fill?_sort=id&_order=asc');
            const data = await response.json();
            setRows(data)
        } catch (error) {
            console.error(error);
        }
    }

    const deleteRow = async ( id: any ) => {
        try {
            // delete row
            await fetch('https://6fa2-188-113-90-45.ngrok-free.app/fill/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: null,
            })

            const newResponse = await fetch('https://6fa2-188-113-90-45.ngrok-free.app/fill');
            const newData = await newResponse.json();
            setRows(newData)
        } catch (error) {
            console.error(error);
        }
    }

    const addNewRow = async () => {
        try {
            const postResponse = await fetch('https://6fa2-188-113-90-45.ngrok-free.app/fill', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id : findMissingRow(),
                    numbers: newRow,
                }),
            })

            const newResponse = await fetch('https://6fa2-188-113-90-45.ngrok-free.app/fill');
            const newData = await newResponse.json();
            setRows(newData)
            setNewRow(['', '', '', '', '']);
        } catch (error) {
            console.error(error);
        }
    }

    const findMissingRow = () => {
        for (let i = 1; i < 8; i++) {
            var found = false;
            for (let row of rows) {
                if (row.id === i) {
                    found = true;
                }
            }
            if (!found) {
                return i;
            }
        }
    }

    useEffect( () => {
        getRows();
    }, []);

    return (
        <ScrollView style={{
            flex: 1,
            backgroundColor: '#ecf2eb',
            flexDirection: 'column',
        }}>
            {
                rows.map((item: { id: any; numbers: any; }, index: any) => (
                    <View key={index}>
                        <View style={{
                            marginTop: 20,
                            flexDirection: 'row',
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: '#22391f',
                                marginLeft: 20,
                            }}>Row {item.id}</Text>
                            <Pressable>
                                <Text style={{
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    color: '#22391f',
                                    marginLeft: 20,
                                }}>Modify</Text>
                            </Pressable>
                            <Pressable onPress={() => deleteRow(item.id)}>
                                <Text style={{
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    color: '#22391f',
                                    marginLeft: 20,
                                }}>Delete</Text>
                            </Pressable>
                        </View>
                        <View style={{
                            marginHorizontal: 20,
                            flexDirection: 'row',
                        }}>
                            {
                                item.numbers.map((number: any, index2: any) => (
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
                ))
            }

            { rows.length < 7 &&
            <View style={{
                marginTop: 20,
            }}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: '#22391f',
                    marginLeft: 20,
                }}>Fill row {findMissingRow()}</Text>

                <View style={{
                    marginHorizontal: 20,
                    flexDirection: 'row',
                }}>
                    <TextInput keyboardType="numeric"
                        onChangeText={text => setNewRow([text, newRow[1], newRow[2], newRow[3], newRow[4]])}
                        style={{
                            height: 40,
                            borderColor: '#22391f',
                            borderWidth: 1,
                            borderRadius: 40,
                            margin: 10,
                            padding: 10,
                            backgroundColor: '#fff',
                        }}
                    />
                    <TextInput keyboardType="numeric"
                        onChangeText={text => setNewRow([newRow[0], text, newRow[2], newRow[3], newRow[4]])}
                        style={{
                            height: 40,
                            borderColor: '#22391f',
                            borderWidth: 1,
                            borderRadius: 40,
                            margin: 10,
                            padding: 10,
                            backgroundColor: '#fff',
                        }}
                    />
                    <TextInput keyboardType="numeric"
                        onChangeText={text => setNewRow([newRow[0], newRow[1], text, newRow[3], newRow[4]])}
                        style={{
                            height: 40,
                            borderColor: '#22391f',
                            borderWidth: 1,
                            borderRadius: 40,
                            margin: 10,
                            padding: 10,
                            backgroundColor: '#fff',
                        }}
                    />
                    <TextInput keyboardType="numeric"
                        onChangeText={text => setNewRow([newRow[0], newRow[1], newRow[2], text, newRow[4]])}
                        style={{
                            height: 40,
                            borderColor: '#22391f',
                            borderWidth: 1,
                            borderRadius: 40,
                            margin: 10,
                            padding: 10,
                            backgroundColor: '#fff',
                        }}
                    />
                    <TextInput keyboardType="numeric"
                        onChangeText={text => setNewRow([newRow[0], newRow[1], newRow[2], newRow[3], text])}
                        style={{
                            height: 40,
                            borderColor: '#22391f',
                            borderWidth: 1,
                            borderRadius: 40,
                            margin: 10,
                            padding: 10,
                            backgroundColor: '#fff',
                        }}
                    />
                    <Pressable onPress={addNewRow}>
                        <Text style={{
                            fontSize: 35,
                            fontWeight: 'bold',
                            color: '#22391f',
                            marginTop: 6,
                            marginRight: 10,
                        }}>+</Text>
                    </Pressable>
                </View>
            </View>
            }
        </ScrollView>
    );
}

export default Fill;