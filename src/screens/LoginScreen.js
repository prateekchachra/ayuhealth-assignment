//import liraries
import React, { Component } from 'react';
import { KeyboardAvoidingView, Text, TextInput, StyleSheet, Dimensions, Platform} from 'react-native';
import AyuButton from '../components/AyuButton'
import {Actions} from 'react-native-router-flux'
const {width, height} = Dimensions.get('window')
// create a component
class LoginScreen extends Component {


    constructor(props){
        super(props)
        this.state={
            name: '',
            errors: {}
        }
    }

    onNameSubmit = () => {
        const {name, errors} = this.state;
        
            if (name === '') {
                errors['name'] = 'Name cannot be empty';
            } else if (!/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(name)) {
                errors['name'] = 'Invalid Name.';
            }

            if(Object.keys(errors).length === 0){
                // this.props.saveName(name);
                Actions.appointments();
            }
            else {
                this.setState({errors})
            }
    }
    render() {
        const {name, errors} = this.state;
        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.container}>
                <Text style={{
                    fontSize: 28,
                    marginBottom: 18
                }}>Welcome!</Text>
                <Text style={{
                    opacity: 0.8,

                }}> Please Log in! What's your name?</Text>
                <TextInput
                            style={styles.inputStyle}
                            value={name}
                            onChangeText={name => this.setState({name, errors: {}})}
                        />
                               {errors['name'] && (
            <Text style={styles.errorStyle}>{errors['name']}</Text>
          )}
                        <AyuButton
                        onSubmit={this.onNameSubmit}
                        label={'SUBMIT NAME'} />
      
                        
            </KeyboardAvoidingView>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    inputStyle: {
        height: 40,
        backgroundColor: '#f5f5f5',
        color: '#000',
        borderRadius: 4,
        paddingLeft: 20,
        
        width: width / 1.24,
        marginVertical: 36,
      },
      errorStyle: {
          color: 'red', marginVertical: 12,

      }
});

//make this component available to the app
export default LoginScreen;
