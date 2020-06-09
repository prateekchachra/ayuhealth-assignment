//import liraries
import React, { Component } from 'react';
import {  ScrollView, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import {Actions} from 'react-native-router-flux'
import AppointmentCard from '../components/AppointmentCard'
// create a component
class AppointmentScreen extends Component {


    constructor(props){
        super(props)
        this.state = {
            patientsList : [
                {
                    id: 14324,
                    patientName: 'Raghav',
                    consultationType: 'Surgery',

                },
                {
                    id: 12413,
                    patientName: 'Prashant',
                    consultationType: 'Checkup'
                },
                {
                    id: 35135,
                    patientName: 'Shilpa',
                    consultationType: 'Surgery'
                },
                {
                    id: 32515,
                    patientName: 'Gaurav',
                    consultationType: 'Checkup'
                },
                {
                    id: 45245,
                    patientName: 'Mihir',
                    consultationType: 'Checkup'
                },
                {
                    id: 32141,
                    patientName: 'Sanjana',
                    consultationType: 'Checkup'
                },

            ]
        }
    }
    render() {
        const {patientsList} = this.state;
        return (
            <ScrollView style={styles.container}>
              <Text style={styles.headerStyle}>Pending Appointments: </Text>
              
              <FlatList
            data={patientsList}
            keyExtractor={item => item.id}
            contentContainerStyle={{flexGrow: 1}}
            renderItem={({item, index}) =>(
            
            <TouchableOpacity
            activeOpacity={1}
            onPress={() => Actions.push('video', {patient: item})}>
            <AppointmentCard patient={item} />
            </TouchableOpacity>
            )}
        />
               </ScrollView>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
    },
    headerStyle: {
        fontSize: 28,
        marginVertical: 24,
        marginLeft: 24,
        fontWeight: 'bold'
    }
});

//make this component available to the app
export default AppointmentScreen;
