import React, { Component } from 'react';
import { ImageBackground } from 'react-native'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
  Image,
  Modal
} from 'react-native';
import { Linking } from 'expo';
import * as LocalAuthentication from 'expo-local-authentication';
import * as IntentLauncher from 'expo-intent-launcher';
import DropdownAlert from 'react-native-dropdownalert';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import AwesomeAlert from 'react-native-awesome-alerts';

export default class biometric extends React.Component{
    state = {
      compatible: false,
      modalVisible: false,
    };
  static navigationOptions = {
      header : null
  }

  constructor(props) {
    super(props);
    this.state = { showAlert: false };
  };

  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };
  
    componentDidMount() {
      //this.checkDeviceForHardware();
    }
  
    checkDeviceForHardware = async () => {
      let compatible = await LocalAuthentication.hasHardwareAsync();
      this.setState({ compatible });
      if (!compatible) {
        this.showIncompatibleAlert();
      }
      else{
        this.checkForBiometrics()
      }
    };
  
    showIncompatibleAlert = () => {
      this.dropdown.alertWithType(
        'error',
        'Incompatible Device',
        'Current device does not have the necessary hardware to use this API.'
      );
    };
  
    checkForBiometrics = async () => {
      let biometricRecords = await LocalAuthentication.isEnrolledAsync();
      if (!biometricRecords) {
        if (Platform.OS === 'android'){
          IntentLauncher.startActivityAsync(IntentLauncher.ACTION_SETTINGS);
        }
        else if (Platform.OS === 'ios'){
           Linking.openURL('app-settings:') ;
          //Linking.openSettings()
        }
      } else {
        this.handleLoginPress();
      }
    };
    
    handleLoginPress = () => {
      if (Platform.OS === 'android') {
        this.showAndroidAlert();
      } else {
        this.scanBiometrics();
      }
    };
  
    showAndroidAlert = () => {
      //dialog = Alert.alert('Fingerprint Scan', 'Place your finger over the touch sensor.');
      this.showAlert();
      this.scanBiometrics();
    };
  
    scanBiometrics = async () => {
      let result = await LocalAuthentication.authenticateAsync();
  
      if (result.success) {
        this.hideAlert();
        this.props.navigation.navigate('Testing')
        
        // this.dropdown.alertWithType(
        //   'success',
        //   'Access Granted',
        //   'Bio-Authentication succeeded.'
       
        // );
         
      } else {
        this.hideAlert();
        this.dropdown.alertWithType(
          'error',
          'Access Denied!',
          'Bio-Authentication failed or canceled.'
        );
      }
    };
  
    render() {
      const {showAlert} = this.state;
      const {navigate} = this.props.navigation;
      return (
        <View style={styles.container}>
<ImageBackground source={require('./../src/images/white_back/back.png')} style={styles.ImageBackground}>
<Image source={require('./../src/images/fingerprint_colored.png')}style={{width: 80, height: 80, marginTop: "30%"}}/>
<Text style={styles.textStyle}>Login with touch ID</Text>
     {/* <TouchableOpacity
            onPress={
              this.checkDeviceForHardware
              // this.state.compatible
              //   ? this.checkForBiometrics
              //   : this.showIncompatibleAlert
            }
            style={styles.button}>
              <View style={styles.container}>
              <Text style={styles.buttonText}>Scan Fingerprint</Text>
              </View>
          </TouchableOpacity> */}
           <TouchableOpacity
                            style={{backgroundColor:'#FF4500' , position:'absolute' , bottom:0 , marginBottom:50,  width: 150,
                            height: 30, borderRadius:5,alignSelf:'center' , alignItems:'center' ,
                            borderWidth: 1,  }}
                        
                     onPress={this.checkDeviceForHardware}
                            underlayColor='#fff'>
                                <Text style={styles.loginText}>Scan Fingerprint</Text>



                  </TouchableOpacity>
          <DropdownAlert
            ref={ref => (this.dropdown = ref)}
            closeInterval={3000}
          />
          <AwesomeAlert
          
          show={showAlert}
          showProgress={false}
          title="Fingerprint Scan"
          message="Place your finger over touch sensor"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          cancelText="No, cancel"
          confirmText="Yes, delete it"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
  </ImageBackground>         
  
        </View>
      );
    }
  }
  
  
  const styles = StyleSheet.create({ 
    loginScreenButton:{
      width: 200,
      height: 50,  
    marginRight:2e5,
    marginLeft:25,
    marginTop:200,
    paddingTop:10,
    color:'white' , 
    paddingBottom:10,
    backgroundColor:'#FF4500',
    borderRadius:5,
    borderWidth: 1,
    borderColor: '#fff'
  },
  loginText:{
      color:'white',
      textAlign:'center',
      fontSize:20,
      alignSelf:'center' ,
      paddingLeft : 10,
      paddingRight : 10
  },
    container: {
      flex: 1,
      flexDirection:"column",
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    ImageBackground:{
        alignItems:'center',
        width: '100%', 
        height: '100%'
    },
    scanIcon:{
        width : '50',
        height : '50'
    },
    textStyle:{
        textAlign:'center',
        fontSize: 18,
        color: '#FF4500',
        marginTop: 20
    },
    button: {
      alignItems: 'center',
      justifyContent : 'center',
      width: 200,
      height: 50,
      backgroundColor: 'transparent',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#fff',
      alignSelf: 'center',
      marginTop: '80%'
    },
    buttonText: {
      textAlign:'center',
      fontSize: 20,
      color: '#fff',
      marginTop: 45,
    },
    logo: {
      height: 128,
      width: 128,
    },
  });
  