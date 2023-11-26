/* eslint-disable prettier/prettier */
import React from 'react';
import { TextInput, View, Pressable, StyleSheet } from 'react-native';

import FontAw5 from 'react-native-vector-icons/FontAwesome5';

import i18n from '../translations/I18n';

const UpperBar = (props) => {
    return (
        <View style={[styles.upperBar, props.palette.bg]}>
            <TextInput
                style={[styles.searchBar, props.palette.border]}
                placeholder={i18n.t('Homepage.search.placeholder')}
                onChangeText={newText => {
                    var matchedItems = [];
                    if (newText.trim().length > 1) {
                        matchedItems = props.items.filter(function (item) {
                            if (typeof item.name === 'string') {
                                return item.name.toLowerCase().includes(newText.toLowerCase());
                            }
                            return false;
                        });
                        props.setItems(matchedItems);
                        props.setSearching(true);
                    } else {
                        props.getItems();
                        props.setSearching(false);
                    }
                }}
                />
                <Pressable onPress={() => props.navigation.navigate('Filter', {selectedCategories: props.filteredCategories, setSelectedCategories: props.setFilteredCategories})}>
                <FontAw5 name="filter" size={25} color={props.palette.purple} style={styles.icon} />
            </Pressable>
        </View>
    );
};

export default UpperBar;

const styles = StyleSheet.create({
    upperBar: {
        height: 50,
        flexDirection: 'row',
    },
    searchBar: {
        fontSize: 17,
        height: 40,
        width: '82%',
        borderWidth: 1,
        margin: 15,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    icon: {
        marginTop: 20,
        marginLeft: 10,
    },
});
