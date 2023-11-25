/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React, {useState, useEffect} from 'react';
import { View, Pressable, TextInput, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import FontAw5 from 'react-native-vector-icons/FontAwesome5';

import Globals from '../Globals';
import i18n from '../translations/I18n';

const MapScreen = ( {navigation}: {navigation: any} ) => {
    const [markers, setMarkers] = useState<any>([]);
    const [filteredCategories, setFilteredCategories] = useState([]);

    // fetch items from server
    const getMarkers = async () => {
        try {
            const response = await fetch(`https://${Globals.serverAddress}/items`);
            const json = await response.json();
            // check if there are any categories to filter by
            if (filteredCategories.length > 0) {
                var filteredItems = json.filter(function (item: { category: string | any[]; }) {
                    return filteredCategories.includes(item.category);
                });
                setMarkers(filteredItems);
            } else {
                setMarkers(json);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const id = setInterval(() => {
            getMarkers();
        }, 8000);

        return () => {
            clearInterval(id);
        };
    });

    return (
        <View style={styles.container}>
            <View style={styles.upperBar}>
                <TextInput
                    style={styles.searchBar}
                    placeholder={i18n.t('Homepage.search.placeholder')}
                    onChangeText={newText => {
                        var matchedItems = [];

                        if (newText.trim().length > 1) {
                            matchedItems = markers.filter(function (item: { name: string | any[]; }) {
                                if (typeof item.name === 'string') {
                                    return item.name.toLowerCase().includes(newText.toLowerCase());
                                }
                                return false;
                            });
                            setMarkers(matchedItems);
                        } else {
                            getMarkers();
                        }
                    }}
                    />
                    <Pressable onPress={() => navigation.navigate('Filter', {selectedCategories: filteredCategories, setSelectedCategories: setFilteredCategories})}>
                    <FontAw5 name="filter" size={25} color="#22391f" style={{marginTop: 20, marginLeft: 10}} />
                </Pressable>
            </View>

            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 63.43,
                    longitude: 10.40,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.02,
                }}
            >
                { markers.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={{latitude: marker.location.latitude, longitude: marker.location.longitude}}
                        title={marker.name}
                        description={i18n.t('Items.contact') + ` ${marker.contact}`}
                        onCalloutPress={() => navigation.navigate('ItemDetails', marker.id)}
                    />
                ))}
            </MapView>
        </View>
    );
};

export default MapScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    upperBar: {
        height: 50,
        flexDirection: 'row',
    },
    searchBar: {
        fontSize: 17,
        height: 40,
        width: '82%',
        borderColor: '#22391f',
        borderWidth: 1,
        margin: 15,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    map: {
        marginTop: 10,
        width: '100%',
        height: '90%',
    },
});
