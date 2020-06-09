//import liraries
import React, { Component } from 'react';
import { View, NativeModules, ScrollView, Text, TouchableOpacity, Platform } from 'react-native';
import { RtcEngine, AgoraView } from 'react-native-agora';
import {agoraAppId} from '../utils/config'
// create a component


const { Agora } = NativeModules;            //Define Agora object as a native module

const {
  FPS30,
  AudioProfileDefault,
  AudioScenarioDefault,
  Adaptative,
} = Agora;                                  //Set defaults for Stream

const config = {                            //Setting config of the app
  appid: agoraAppId,               //Enter the App ID generated from the Agora Website
  channelProfile: 0,                        //Set channel profile as 0 for RTC
  videoEncoderConfig: {                     //Set Video feed encoder settings
    width: 720,
    height: 1080,
    bitrate: 1,
    frameRate: FPS30,
    orientationMode: Adaptative,
  },
  audioProfile: AudioProfileDefault,
  audioScenario: AudioScenarioDefault,
};


class VideoScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
          peerIds: [],                                       //Array for storing connected peers
          uid: Math.floor(Math.random() * 100),              //Generate a UID for local user
          appid: config.appid,                               
          channelName: 'channel-x',                        //Channel Name for the current session
          joinSucceed: false,                                //State variable for storing success
        };
        if (Platform.OS === 'android') {                    //Request required permissions from Android
          this.requestCameraAndAudioPermission().then(_ => {
            console.log('requested!');
          });
        }
      }

      requestCameraAndAudioPermission = async() =>  {
        try {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            ]);
            if (
                granted["android.permission.RECORD_AUDIO"] ===
                PermissionsAndroid.RESULTS.GRANTED &&
                granted["android.permission.CAMERA"] ===
                PermissionsAndroid.RESULTS.GRANTED
            ) {
                console.log("You can use the cameras & mic");
            } else {
                console.log("Permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    }

    componentDidMount() {
        RtcEngine.on('userJoined', (data) => {
          const { peerIds } = this.state;                   //Get currrent peer IDs
          if (peerIds.indexOf(data.uid) === -1) {           //If new user has joined
            this.setState({
              peerIds: [...peerIds, data.uid],              //add peer ID to state array
            });
          }
        });
        RtcEngine.on('userOffline', (data) => {             //If user leaves
          this.setState({
            peerIds: this.state.peerIds.filter(uid => uid !== data.uid), //remove peer ID from state array
          });
        });
        RtcEngine.on('joinChannelSuccess', (data) => {                   //If Local user joins RTC channel
          RtcEngine.startPreview();                                      //Start RTC preview
          this.setState({
            joinSucceed: true,                                           //Set state variable to true
          });
        });
        RtcEngine.init(config);                                         //Initialize the RTC engine
      }

      startCall = () => {
        RtcEngine.joinChannel(this.state.channelName, this.state.uid);  //Join Channel
        RtcEngine.enableAudio();                                        //Enable the audio
      }
      /**
      * @name endCall
      * @description Function to end the call
      */
      endCall = () => {
        RtcEngine.leaveChannel();
        this.setState({
          peerIds: [],
          joinSucceed: false,
        });
      }

    render() {

        const {peerIds} = this.state;
        return (
            <View style={styles.halfViewRow}>
            <AgoraView style={styles.half}
              remoteUid={this.state.peerIds[0]} mode={1} />
            <AgoraView style={styles.half}
              remoteUid={this.state.peerIds[1]} mode={1} />
          </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

//make this component available to the app
export default VideoScreen;
