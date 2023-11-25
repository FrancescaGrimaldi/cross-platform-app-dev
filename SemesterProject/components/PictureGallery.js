/* eslint-disable prettier/prettier */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import ImageModal from 'react-native-image-modal';

const imagesMap = {
    1: [require('../images/items/1_2.jpg'), require('../images/items/1_3.jpg'), require('../images/items/1_4.jpg'), require('../images/items/1_5.jpg')],
    2: [require('../images/items/2_2.jpg'), require('../images/items/2_3.jpg'), require('../images/items/2_4.jpg'), require('../images/items/2_5.jpg')],
    3: [require('../images/items/3_2.jpg'), require('../images/items/3_3.jpg'), require('../images/items/3_4.jpg'), require('../images/items/3_5.jpg')],
    4: [require('../images/items/4_2.jpg'), require('../images/items/4_3.jpg'), require('../images/items/4_4.jpg'), require('../images/items/4_5.jpg')],
    5: [require('../images/items/5_2.jpg'), require('../images/items/5_3.jpg'), require('../images/items/5_4.jpg'), require('../images/items/5_5.jpg')],
    6: [require('../images/items/6_2.jpg'), require('../images/items/6_3.jpg'), require('../images/items/6_4.jpg'), require('../images/items/6_5.jpg')],
    7: [require('../images/items/7_2.jpg'), require('../images/items/7_3.jpg'), require('../images/items/7_4.jpg'), require('../images/items/7_5.jpg')],
};

const PictureGallery = (props) => {
    const images = imagesMap[props.item.id] || [];

    return (
        <View style={styles.container}>
            { images.map((image, index) => {
                return (
                    <ImageModal
                        key={index}
                        resizeMode="cover"
                        modalImageResizeMode="contain"
                        style={styles.modal}
                        source={image}
                    />
                );
            })}
        </View>
    );
};

export default PictureGallery;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginVertical: 20,
    },
    modal: {
        width: 95,
        height: 95,
    },
});
