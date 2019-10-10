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
  ActivityIndicator,
  ScrollView ,
} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

export default class reminder extends Component {

    static navigationOptions = {
        header : null
    }
  constructor(props) {
    super(props);
    this.state = {
        cnic : '',
        mother_name : '',
        place_of_birth : '',
        dataSource : [],
        showAlert: false,
        isLoading : false,
        names: [
            {'name': 'Licence Renewal', 'id': 1},
            {'name': 'Vehcile Tax Date', 'id': 2},
            {'name': 'Vehicle Insurance Date', 'id': 3},
            {'name': 'Vehicle Tracker', 'id': 4},
            {'name': 'Spark Plug replacement', 'id': 5},
            {'name': 'Oil Change', 'id': 6}
         ],
      };
  }

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
  alertItemName = (item) => {
    alert(item.name)
 }

 setReminders (){

 }

  render() {
    const {showAlert} = this.state;
      if (this.state.isLoading) {
        return (
          <View style={{ flex: 1}}>
            <ActivityIndicator />
          </View>
        );
      }
     
    return (
      <View style={styles.MainContainer}>
          
          <ImageBackground source={require('./../../src/images/background.png')} style={styles.ImageBackground}>
          <Text style={styles.HeaderText}>
              Reminders
          </Text>
          <ScrollView style = {styles.ScrollViewStyle}>
               {
                  this.state.names.map((item, index) => (
                     <TouchableOpacity key = {item.id} style = {styles.item} onPress = {()=>this.alertItemName(item)}>
                        <Text>{item.name}</Text>
                        <Text>10/12/2019</Text>
                     </TouchableOpacity>
                  ))
               }
            </ScrollView>
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
  ScrollViewStyle:{  
    width : '100%',  
    padding: 10,
    position : 'absolute',
    bottom : 0,
    top : 0,
    marginTop : 90,
    marginBottom : 80,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    margin: 2,
    borderColor: '#FF4500',
    borderWidth: 1,
    borderRadius : 10,
    backgroundColor: '#FFFFFF'
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
  dateText:{
      alignSelf : 'flex-end'
  }
});