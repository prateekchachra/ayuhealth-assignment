
import React from 'react';
import LoginScreen from './src/screens/LoginScreen'
import AppointmentScreen from './src/screens/AppointmentScreen'
import VideoScreen from './src/screens/VideoScreen'
import {Router,Stack, Scene} from 'react-native-router-flux'




const App = () => (
  <Router>
    <Stack key="root">
      <Scene key="login" component={LoginScreen} title="Doctor Login" />
      <Scene key="appointments" component={AppointmentScreen} title="Your Appointments" />
      <Scene key="video" component={VideoScreen} title="Appointment" />
    </Stack>
  </Router>
);


export default App;