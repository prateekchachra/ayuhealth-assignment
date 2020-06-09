//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import {colors} from '../utils/theme'
import Icon from 'react-native-vector-icons/Fontisto'
const {width, height} = Dimensions.get('window')
// create a component
class AppointmentCard extends Component {
    render() {
        const {patient} = this.props;

        return (
            <View style={styles.container}>
                <Icon name='doctor' size={24} color='#fff' style={{
                marginBottom: 16}}/>
                <Text style={styles.nameStyle}>Patient Name: {patient.patientName}</Text>
                <Text style={styles.typeStyle}>Consultation Type: {patient.consultationType}</Text>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        alignSelf: 'center',
        elevation: 8,
        marginVertical: 14,
        padding: 24,
        width: width/1.2,
        borderRadius: 16,
        backgroundColor: colors.PrimaryColor
    },  
    nameStyle: {
        fontWeight: 'bold',
        fontSize: 16
    }, typeStyle: {
        marginBottom: 14
    }
});

//make this component available to the app
export default AppointmentCard;
