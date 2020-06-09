//import liraries
import React, { Component } from 'react';
import { View, Dimensions, Text, StyleSheet, Platform } from 'react-native';
import RtcEngine, { RtcLocalView, RtcRemoteView } from 'react-native-agora';
import {agoraAppId} from '../utils/config'
const {width, height} = Dimensions.get('window')


let LocalView = RtcLocalView.SurfaceView;
let RemoteView = RtcRemoteView.SurfaceView;
let engine;


// create a component

// const config = {                            //Setting config of the app
//   appid: agoraAppId,               //Enter the App ID generated from the Agora Website
//   channelProfile: 0,                        //Set channel profile as 0 for RTC
//   videoEncoderConfig: {                     //Set Video feed encoder settings
//     width: 720,
//     height: 1080,
//     bitrate: 1,
//     frameRate: FPS30,
//     orientationMode: Adaptative,
//   },
//   audioProfile: AudioProfileDefault,
//   audioScenario: AudioScenarioDefault,
// };


class VideoScreen extends Component {

    constructor(props) {
        super(props);
        const {patient} = props;
        const {id, patientName} = patient;
        this.state = {
          peerIds: [],            //Generate a UID for local user
          appid: agoraAppId,                               
          channelName: 'appointment-' + id,                        //Channel Name for the current session
          joinSucceed: false,
          patientName                                //State variable for storing success
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

    startCall = () => {
      this.setState({ joinSucceed: true }); //Set state variable to true
      engine.joinChannel(null, this.state.channelName, null, 0);  //Join Channel using null token and channel name
    }
  
    /**
    * @name endCall
    * @description Function to end the call
    */
    endCall = () => {
      engine.leaveChannel();
      this.setState({ peerIds: [], joinSucceed: false });
    }

    componentDidMount() {
      let self = this;
      /**
      * @name init
      * @description Function to initialize the Rtc Engine, attach event listeners and actions
      */
      async function init() {
        engine = await RtcEngine.create(self.state.appid);
        engine.enableVideo();
  
        engine.addListener('UserJoined', (data) => {          //If user joins the channel
          const { peerIds } = self.state;                     //Get currrent peer IDs
          if (peerIds.indexOf(data) === -1) {                 //If new user
            self.setState({ peerIds: [...peerIds, data] });   //add peer ID to state array
          }
        });
  
        engine.addListener('UserOffline', (data) => {                 //If user leaves
          self.setState({
            peerIds: self.state.peerIds.filter(uid => uid !== data), //remove peer ID from state array
          });
        });
  
        engine.addListener('JoinChannelSuccess', (data) => {          //If Local user joins RTC channel
          self.setState({ joinSucceed: true });                       //Set state variable to true
        });
      }
      init();
    }

    render() {

        const {peerIds, channelName, patientName} = this.state;
        return (
            <View style={styles.container}>
              <View>
              <Text style={styles.headerStyle}>{patientName}</Text>
          <RemoteView style={styles.videoStyle}
              uid={peerIds[0]} renderMode={1} />
              </View>
              <View>
               <Text style={styles.headerStyle}>Doctor</Text>
                 <LocalView style={styles.videoStyle}               //view for local videofeed
                    channelId={channelName} renderMode={1} zOrderMediaOverlay={true} />
            </View>


            
          </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
    },
    videoStyle: {
      width: width/2,
      height: height/2
    },
    headerStyle: {
      fontSize: 18,
      marginVertical: 16,
      alignSelf: 'center',
      fontWeight: 'bold'
    }

});

//make this component available to the app
export default VideoScreen;
