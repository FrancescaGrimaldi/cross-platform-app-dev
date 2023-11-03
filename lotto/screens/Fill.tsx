/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable react-native/no-inline-styles */

import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Pressable, TextInput } from 'react-native';
import FilledRow from '../components/FilledRow';
import NumberInput from '../components/NumberInput';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Fill = ( {navigation}: {navigation: any} ) => {
    const [rows, setRows] = useState([]);
    const [newRow, setNewRow] = useState(['', '', '', '', '']);
    const [modRow, setModRow] = useState(['', '', '', '', '']);
    const [modIndex, setModIndex] = useState('');

    const dbUrl = 'https://974b-188-113-90-45.ngrok-free.app/fill'

    // retrieves the filled rows from the database
    const getRows = async () => {
        try {
            const response = await fetch(dbUrl + '?_sort=id&_order=asc');
            const data = await response.json();
            setRows(data)
        } catch (error) {
            console.error(error);
        }
    }

    // deletes a row from the database
    const deleteRow = async ( id: any ) => {
        try {
            await fetch(dbUrl + '/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: null,
            })

            getRows()
        } catch (error) {
            console.error(error);
        }
    }

    // modifies an existing row from the database
    const modifyRow = async ( id: any ) => {
        try {
            await fetch(dbUrl + '/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    numbers: modRow,
                }),
            })

            getRows()
            setModRow(['', '', '', '', ''])
            setModIndex('')
        } catch (error) {
            console.error(error);
        }
    }

    // adds a new row to the database
    const addNewRow = async () => {
        try {
            await fetch(dbUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id : findMissingRow(),
                    numbers: newRow,
                }),
            })

            getRows()
            setNewRow(['', '', '', '', ''])
        } catch (error) {
            console.error(error);
        }
    }

    // finds the index of the first missing (not filled) row
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
                        <FilledRow id={item.id} numbers={item.numbers} delPress={() => deleteRow(item.id)} modPress={() => setModIndex(item.id)} />
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
                    <NumberInput changeFunc={(text: string) => setNewRow([text, newRow[1], newRow[2], newRow[3], newRow[4]])} />
                    <NumberInput changeFunc={(text: string) => setNewRow([newRow[0], text, newRow[2], newRow[3], newRow[4]])} />
                    <NumberInput changeFunc={(text: string) => setNewRow([newRow[0], newRow[1], text, newRow[3], newRow[4]])} />
                    <NumberInput changeFunc={(text: string) => setNewRow([newRow[0], newRow[1], newRow[2], text, newRow[4]])} />
                    <NumberInput changeFunc={(text: string) => setNewRow([newRow[0], newRow[1], newRow[2], newRow[3], text])} />
                    
                    <Pressable onPress={addNewRow}>
                        <FontAwesome name="plus" size={25} color="#22391f" style={{marginTop: 20, marginRight: 10}} />
                    </Pressable>
                </View>
            </View>
            }

            { modIndex !== '' &&
            <View style={{
                marginTop: 20,
            }}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: '#22391f',
                    marginLeft: 20,
                }}>Modify row {modIndex}</Text>

                <View style={{
                    marginHorizontal: 20,
                    flexDirection: 'row',
                }}>
                    <NumberInput changeFunc={(text: string) => setModRow([text, modRow[1], modRow[2], modRow[3], modRow[4]])} />
                    <NumberInput changeFunc={(text: string) => setModRow([modRow[0], text, modRow[2], modRow[3], modRow[4]])} />
                    <NumberInput changeFunc={(text: string) => setModRow([modRow[0], modRow[1], text, modRow[3], modRow[4]])} />
                    <NumberInput changeFunc={(text: string) => setModRow([modRow[0], modRow[1], modRow[2], text, modRow[4]])} />
                    <NumberInput changeFunc={(text: string) => setModRow([modRow[0], modRow[1], modRow[2], modRow[3], text])} />

                    <Pressable onPress={() => modifyRow(modIndex)}>
                        <FontAwesome name="plus" size={25} color="#22391f" style={{marginTop: 20, marginRight: 10}} />
                    </Pressable>
                </View>
            </View>
            }
        </ScrollView>
    );
}

export default Fill;