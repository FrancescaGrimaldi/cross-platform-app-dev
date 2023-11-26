/* eslint-disable prettier/prettier */

import React, {useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

import UpperBar from '../components/UpperBar';

import Globals from '../Globals';
import i18n from '../translations/I18n';

const MapScreen = ( {navigation}: {navigation: any} ) => {
    const [markers, setMarkers] = useState<any>([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [searching, setSearching] = useState(false);
    const [palette, setPalette] = useState<any>('');

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

    const getTheme = async () => {
        try {
            let theme = await AsyncStorage.getItem('theme');
            if (theme !== null) {
                if (theme === 'light') {
                    setPalette(Globals.colors.light);
                } else {
                    setPalette(Globals.colors.dark);
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        const id = setInterval(() => {
            if (!searching) { getMarkers(); }
            getTheme();
        }, 8000);

        return () => {
            clearInterval(id);
        };
    });

    return (
        <View style={[styles.container, palette.bg]}>
            <UpperBar from="MapScreen" items={markers} getItems={getMarkers} setItems={setMarkers} filteredCategories={filteredCategories} setFilteredCategories={setFilteredCategories} setSearching={setSearching} navigation={navigation} palette={palette} />

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
    map: {
        marginTop: 10,
        width: '100%',
        height: '90%',
    },
});
