import React, { Component } from 'react';
import { ImageBackground } from 'react-native';

//import react in our code.

import {
  StyleSheet,
  View,
  AsyncStorage,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

export default class kyc extends Component {

    static navigationOptions = {
        header : null
    }
  constructor() {
    super();
    this.state = {
        cnic : '',
        mother_name : '',
        place_of_birth : '',
      };

  }

 

  render() {
      const cnic_options = [
        {label: '42291-3324845-9', value: 0 },
        {label: '40120-8467203-0', value: 1 },
        {label: '47829-9889373-8', value: 2 }
      ];
      const mother_options = [
        {label: 'Jehan Ara', value: 0 },
        {label: 'Begum Jehan Ara', value: 1 },
        {label: 'Jehan Ara Begum', value: 2 }
      ];
      const place_options = [
        {label: 'Karachi', value: 0 },
        {label: 'Lahore', value: 1 },
        {label: 'Islamabad', value: 2 }
      ];
    return (
      <View style={styles.MainContainer}>
          <ImageBackground source={require('./../../src/images/background.png')} style={styles.ImageBackground}>
          <Text style={styles.HeaderText}>
              KYC Details
          </Text>
          <Text style ={styles.textOne}>CNIC:</Text>
          <RadioForm
          style = {styles.RadioButtonLayoutOne}
          radio_props={cnic_options}
          initial={0}
          color={'#FFFFFF'}
          buttonSize={10}
          buttonColor={'#FFFFFF'}
          buttonInnerColor={'#FFFFFF'}
          labelColor={'#FFFFFF'}
          labelStyle={{fontSize: 15, color: '#FFFFFF'}}
          backgroundColor = {'#FFFFFF'}
          formHorizontal={false}
          onPress={(value) => {this.setState({cnic:value})}}
        />

<Text style={styles.textTwo}>Mother Name:</Text>
          <RadioForm
          style = {styles.RadioButtonLayoutOne}
          radio_props={mother_options}
          initial={0}
          buttonSize={10}
          color={'#FFFFFF'}
          buttonColor={'#FFFFFF'}
          buttonInnerColor={'#FFFFFF'}
          buttonOuterColor={'#FFFFFF'}
          labelColor={'#FFFFFF'}
          labelStyle={{fontSize: 15, color: '#FFFFFF'}}
          backgroundColor = {'#FFFFFF'}
          formHorizontal={false}
          borderColor={'#FFFFFF'}
          onPress={(value) => {this.setState({place_of_birth:value})}}
        />

<Text style ={styles.textThree}>Place of Birth:</Text>
          <RadioForm
          style = {styles.RadioButtonLayoutOne}
          radio_props={place_options}
          initial={0}
          buttonSize={10}
          color={'#FFFFFF'}
          buttonColor={'#FFFFFF'}
          buttonInnerColor={'#FFFFFF'}
          labelColor={'#FFFFFF'}
          labelStyle={{fontSize: 15, color: '#FFFFFF'}}
          backgroundColor = {'#FFFFFF'}
          formHorizontal={false}
          onPress={(value) => {this.setState({place_of_birth:value})}}
        />
        <TouchableOpacity
          onPress={this.saveValueFunction}
          style={styles.button}>
          <Text style={styles.buttonText}> SUBMIT </Text>
        </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    alignItems: 'center',
    flex: 1,
  },
  ImageBackground:{
    alignItems:'center',
    width: '100%', 
    height: '100%'
},
  HeaderText: {
    textAlign: 'center',
    fontSize : 25,
    color : '#FFFFFF',
    top:0,
    position : 'absolute',
    marginTop : 40,
    width : '100%',
    fontWeight : 'bold',
    
  },
  RadioButtonLayoutOne: {
    width : '100%',
    marginTop : 10,
    color : '#FFFFFF',
    marginLeft : 20,
    paddingLeft : 20,
    tintColor : '#FFFFFF',
  },
  TextInputStyle: {
    textAlign: 'left',
    height: 40,
    width: '100%',
    borderWidth: 1,
    paddingLeft : 10,
    borderColor: '#808000',

    marginTop : '70%',    
  },
  TextInputStyleTwo: {
    textAlign: 'left',
    height: 40,
    width: '100%',
    borderWidth: 1,
    paddingLeft : 10,
    borderColor: '#808000',

  },

  button: {
    width: '40%',
    height: 40,
    padding: 10,
    backgroundColor: '#ffffff',
    marginTop: 10,
    position : 'absolute',
    bottom : 0,
    marginBottom : 20,
    borderRadius : 10,
  },

  buttonText: {
    color: '#FF4500',
    textAlign: 'center',
  },

  textOne: {
    fontSize: 20,
    color : '#FFFFFF',
    width : '100%',
    marginTop : 100,
    paddingLeft : 20,

    
  },
  textTwo: {
    fontSize: 20,
    color : '#FFFFFF',
    width : '100%',
    paddingLeft : 20,
    marginTop : 10,
    
  },
  textThree: {
    fontSize: 20,
    color : '#FFFFFF',
    width : '100%',
    paddingLeft : 20,
    marginTop : 10,

    
  },
});