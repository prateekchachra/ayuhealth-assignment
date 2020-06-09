
import React from 'react';
import LoginScreen from './src/screens/LoginScreen'
import AppointmentScreen from './src/screens/AppointmentScreen'
import VideoScreen from './src/screens/VideoScreen'
import {Router,Stack, Scene} from 'react-native-router-flux'

import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux';


const App = () => (
  <Provider store={store}>
        <PersistGate persistor={persistor}>
  <Router>
    <Stack key="root">
      <Scene key="login" component={LoginScreen} title="Doctor Login" />
      <Scene key="appointments" component={AppointmentScreen} title="Your Appointments" />
      <Scene key="video" component={VideoScreen} title="Appointment" />
    </Stack>
  </Router>
  </PersistGate>
  </Provider>
);


export default App;