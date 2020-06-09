//import liraries
import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native';
import {colors} from '../utils/theme'
const {width, height} = Dimensions.get('window')
// create a component
class Button extends Component {
    render() {
        const {label, onSubmit, buttonStyle} = this.props;
        return (

            <TouchableOpacity 
            onPress={onSubmit}
            style={[styles.container, {...buttonStyle}]}>
                <Text style={styles.labelStyle}>{label}</Text>
            </TouchableOpacity>
        );
    }
}

Button.defaultProps = {
    onSubmit: () => {},
    label: 'Submit',
    buttonStyle: {}
}
// define your styles
const styles = StyleSheet.create({
    container: {
        height: 40,
        backgroundColor: colors.PrimaryColor,
        width: width/1.2,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
    labelStyle: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold'
    }
});

//make this component available to the app
export default Button;
