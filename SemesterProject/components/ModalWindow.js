/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */

import React from 'react';
import { View, Text, Modal, Pressable, StyleSheet} from 'react-native';

const ModalWindow = (props) => {
    return ( 
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.visible}
            onRequestClose={() => {props.onClose()}}>
            
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{props.text}</Text>
                    
                    <Pressable style={[styles.button, styles.buttonClose]} onPress={() => props.onPress()}>
                        <Text style={styles.textStyle}>{props.buttonText}</Text>
                    </Pressable>
                </View>
            </View>

        </Modal>
    )
}

export default ModalWindow;

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    
    button: {
      borderRadius: 12,
      padding: 7,
      elevation: 2,
    },
    
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 18,
    },

    modalText: {
      marginBottom: 15,
      fontSize: 20,
      textAlign: 'center',
    },
});