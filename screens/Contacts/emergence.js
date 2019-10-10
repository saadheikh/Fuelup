/*Example of Bottom Sheet (Material Design)*/
import React, { Component } from 'react';
//import react in our project
import { StyleSheet, View, Platform, Text, Button, TextInput , TouchableOpacity , Image } from 'react-native';
//import basic react native components
import { BottomSheet } from 'react-native-btr';
//import for the bottom sheet
import { SocialIcon } from 'react-native-elements';
//import to show social icons

export default class emergence extends Component{
    static navigationOptions={
        header : null

  }
  constructor() {
    super();

   
    this.state = {
      //default visibility state of the bottom sheet
      visible: false,
    };
  }
  _toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    this.setState({ visible: !this.state.visible });
  };
  render() {
    return (
      <View style={{flex:1}}>

              <TouchableOpacity onPress={() =>this.props.navigation.goBack()}>
                                                <Image source={require('./../../src/images/orange_arrow/arrow.png')}
                                                      style={{
                                                        marginTop:15 , 
                                                        marginLeft:10 ,
                                                        width : 30 , 
                                                        height : 30 ,  }}>

                                                </Image>
                                            </TouchableOpacity>

      
      <View style={styles.MainContainer}>
        <Text style={{ fontSize: 20, marginBottom: 20, textAlign: 'center' }}>
          No Contacts
        </Text>
        <Button
          onPress={this._toggleBottomNavigationView}
          //on Press of the button bottom sheet will be visible
          title="Add Emergency Contact"
        />
        <BottomSheet
          visible={this.state.visible}
          //setting the visibility state of the bottom shee
          onBackButtonPress={this._toggleBottomNavigationView}
          //Toggling the visibility state on the click of the back botton
          onBackdropPress={this._toggleBottomNavigationView}
          //Toggling the visibility state on the clicking out side of the sheet
        >
          {/*Bottom Sheet inner View*/}
          <View style={styles.bottomNavigationView}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <Text style={{ textAlign: 'center', padding: 20, fontSize: 20 }}>
                Add Details
              </Text>
              <View style={{flexDirection:'column' , justifyContent:'center' , alignItems:'center'}}>
                    <TextInput placeholder= "Phone number"></TextInput>
                    <View style={{borderBottomWidth:1 , borderBottomColor:'black' , width:100 , opacity:0.5}}></View>
             
              </View>
              <View style={{ flex: 1,flexDirection:'column' , justifyContent:'center' , alignItems:'center'}}>
              <TextInput placeholder= "Text Message"></TextInput>
              <View style={{borderBottomWidth:1 , borderBottomColor:'black' , width:100 , opacity:0.5}}></View>
              </View>
            </View>
          </View>
        </BottomSheet>
      </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: '#ffffff',
  },
  bottomNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
