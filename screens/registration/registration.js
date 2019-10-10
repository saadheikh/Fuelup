import React from 'react';
import { Button , View, Text , TextInput , StyleSheet, Alert , 
  ImageBackground , StatusBar , Image , TouchableOpacity ,
 Keyboard , TouchableWithoutFeedback ,Activity, Dimensions , ActivityIndicator , Linking , Share , AsyncStorage } from 'react-native';
//import {Font} from 'expo-font' ;
import * as Font from 'expo-font';
import Expo from 'expo';



export default class registration extends React.Component {

  
      static navigationOptions ={
          header: null ,
          tabBarVisible: false , 
          gesturesEnabled: false   , 
          drawerLockMode: 'locked-closed' , 
          drawerWidth: "0%",
          edgeWidth: -100 ,
      
      };

    constructor(props){
        super(props);
      
       
        this.state= {
            CardNumber : '' ,
            MobileNumber : '',
            userInfo: null ,
            token : '' ,
            result: '' , 
            latitude : '' , 
            longitude : '',
            dataSource : [],
            isLoading : false,
            tokennumber: ''
        
        };
      }

      _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('tokenNo');
          const value1 = await AsyncStorage.getItem('linkcard');
          if (value !== null) {
            // We have data!!
            console.log("Toeknssssasss" ,value);
            console.log("linkcard" ,value1);
          }
        } catch (error) {
          // Error retrieving data
        }
      };

     

      registerCall(){
        var toke , mobileno1;
        this.setState({isLoading : true });
        const url = this.getRequestwithParam(this.state.CardNumber,this.state.MobileNumber)
       
        return fetch(url)
        .then(response => response.json())
         .then(responseData =>{
           console.log("response" , responseData)
 
            const responseCode = responseData.code
            toke = responseData.additonalData.userObject.tokenNo
            mobileno1 = responseData.additonalData.userObject.identity
            if (responseCode == "1012"){

                this.setState({
                  isLoading : false,
                tokennumber:toke 
               });
                try {
    
                    AsyncStorage.setItem('tokenNo',toke);
                    AsyncStorage.setItem('linkcard','yes');
                    AsyncStorage.setItem('mobile',mobileno1);
                   
                   
               
                  } catch (error) {
                    // Error saving data
                  }   
                // console.log('tokenNo',responseData.additonalData.userObject.tokenNo);  
                  
                  // this.props.navigation.navigate('newOTP' , 
                  // {
                  //   mobilen0: this.state.MobileNumber ,
                  //    cardn0 : this.state.CardNumber,
                  //    tokennumber : recieveTokenNo ,
                    
                  //   });

                //this.checknull()
                this.props.navigation.navigate('newOTP', 

                   {
                     mobilen0: this.state.MobileNumber ,
                    cardn0 : this.state.CardNumber,
                    tokenNo : this.state.tokennumber,
                    // tokenNo : responseData.additonalData.userObject.tokenN
                    
                });

             //   this._retrieveData()
                
       
            }
            if (responseCode == "0001"){
            
              alert(responseData.detailMessage)
     
          }
         else if (responseData.code == "2222"){
            
            alert(responseData.detailMessage)
   
        }
            else {
             alert(responseData.detailMessage)
       
            }
           }
         ).done();
       }
      getRequestwithParam(cardNo,MobileNo){

        console.log(cardNo,MobileNo)
  
        const baseUrl = "http://172.191.1.137:8080/AGCM_PROD/AG_Servlet/FUEL?messageType=LOGIN_FUEL";
        //const param = `&identity=${MobileNo}&cardNo=${cardNo}&imei=90909090&channel=Mobile&msisdn=${MobileNo}&firstTimeLogin=Y`;
        const param = `&identity=03212556100&cardNo=8096160900000043&imei=90909090&channel=Mobile&msisdn=03212556100&firstTimeLogin=Y`;
        return `${baseUrl}${param}`;
  
      }


  _storeData() {
    try {
    
      AsyncStorage.setItem('longitude', this.state.longitude);
     
      console.log("datastored")
    } catch (error) {
      // Error saving data
    }
  };


     checknull =() =>{
      this.registerCall();
        // if (this.state.CardNumber != '' || this.state.MobileNumber != '') {
         
        //     if (this.state.MobileNumber != '') {
        //      // alert(this.state.MobileNumber + " and " + this.state.CardNumber)
        //     //   this.props.navigation.navigate('Otp' , 
        //     //   {mobilen0: this.state.MobileNumber , cardn0 : this.state.CardNumber});
        //     this.registerCall();

        //     } else {
        //       alert('Please Enter Mobile Number ');
        //     }
        //   } else {
        //     alert('Please Enter Card Number');
        //   }


     };


    render() {
        if (this.state.isLoading) {
            return (
              <View style={{  flex: 1,
                justifyContent: 'center',
                flexDirection: 'column'
                }}>
                <ActivityIndicator style={{alignSelf : 'center'}} />
              </View>
            );
          }
      return (
      
        <ImageBackground source={require('./../../src/images/white_back/back.png')} style={{width: '100%', height: '100%'}}>
         <TouchableOpacity onPress={() =>this.props.navigation.goBack()}>
                                                <Image source={require('./../../src/images/white_arow/arrow.png')}
                                                      style={{
                                                        marginTop:10 , 
                                                        marginLeft:7 ,
                                                        width : 30 , 
                                                        height : 30 ,  
                                                        }}>

                                                </Image>
                                            </TouchableOpacity>

         <View style={{ flex: 1 , alignSelf:'center'}}>

        <StatusBar hidden/>
        <ActivityIndicator size="large"  animating={this.state.isLoading}  style={{justifyContent:'center' , alignItems:'center'}}/>
        <Image source={require('./../../src/images/card/card.png')} style ={{width:120 , height:120 , marginBottom:10 , alignSelf:'center' , marginTop:5}}></Image>
        <Text style = {styles.headerText}>Link Card</Text>

        <TextInput 
    
        style={{borderBottomColor:'#FF4500' , borderBottomWidth : 1 , width:Dimensions.get('window').width / 100 * 70, marginTop:20 , color : 'orange', padding:5 }}
        keyboardType = 'numeric'
        placeholder = "Card Number"
        maxLength={16} 
        placeholderTextColor ='#FF4500'
        returnKeyType="done"
        onSubmitEditing ={this.dismisskeyboard}
        onChangeText={CardNumber => this.setState({CardNumber})}
        >8096160900000043</TextInput>
        
        <TextInput
       
        style={{borderBottomColor:'#FF4500' , borderBottomWidth : 1 
        ,width:Dimensions.get('window').width / 100 * 70 , marginTop:20 ,  color :'orange' , padding:5}}
         keyboardType = 'numeric'
         maxLength={11} 
         placeholder="Mobile Number" 
         returnKeyType="done"
         placeholderTextColor ='#FF4500'
          onChangeText ={MobileNumber => this.setState({MobileNumber})}
         >03212556100

           
         </TextInput>

         <View>
            
                      <TouchableOpacity
                                style={styles.loginScreenButton}
                                 onPress={this.checknull}
                                underlayColor='#fff'>
                                <Text style={styles.loginText}>Register</Text>
                      </TouchableOpacity>
         </View>
        
        </View>
                      

  </ImageBackground>

       
      );
    }
  }


  const styles = StyleSheet.create({
    etstyle: {
      color : 'white' , 
         height: 35, 
         paddingLeft: 10 ,
         borderColor: 'white',
        borderWidth: 0.5 ,
        width: 250 ,
        margin : 10 ,
        justifyContent: 'center' },

        loginScreenButton:{
          marginRight:25,
          marginLeft:25,
          width:'100%' , 
         marginTop:20,
          paddingTop:10,
          alignSelf:'center' ,
          paddingBottom:10,
          backgroundColor:'#FF4500',
          borderRadius:5,
          borderWidth: 1,
          borderColor: '#FF4500'
        },
        loginText : {
            color:'#FFFFFF',
            textAlign:'center',
            paddingLeft : 10,
            paddingRight : 10
        },
        headerText : {
            color : '#ff4500',
            fontSize : 25,
            alignSelf : 'center',
            fontWeight : 'bold'
        }
  });
  