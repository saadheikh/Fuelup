import React from 'react';
import { Button , View, Text , TextInput , StyleSheet, Alert , 
  ImageBackground , StatusBar , Image , TouchableOpacity ,
 Keyboard , TouchableWithoutFeedback ,Activity, Dimensions , ActivityIndicator , Linking , Share , AsyncStorage } from 'react-native';
//import {Font} from 'expo-font' ;
import * as Font from 'expo-font';
import * as Facebook from 'expo-facebook';
import * as GoogleSignIn from 'expo-google-sign-in';
import * as Google from 'expo-google-app-auth';
import Expo from 'expo';
import {SocialIcon} from 'react-native-elements' ;
import {BackHandler} from 'react-native' ;


export default class signup extends React.Component {

  
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
            isLoading:false ,
            userInfo: null ,
            token : '' ,
            result: '' , 
            latitude : '' , 
            longitude : '',
           // isLoading : false,
        
        };
      }

  

  _storeData() {
    try {
    
      AsyncStorage.setItem('longitude', this.state.longitude);
     
      console.log("datastored")
    } catch (error) {
      // Error saving data
    }
  };


  
    // getMoviesFromApiAsync =()=> {
    //   return fetch('https://facebook.github.io/react-native/movies.json')
    //     .then(response => response.json())
    //     .then(responseJson => {
    //       this.setState({
    //         isLoading: false 
    //      })
    //       alert(responseJson.movies[0].title)
    //       return responseJson.movies;
    //     })
    //     .catch(error => {
    //       this.setState({
    //         isLoading: false 
    //      })
    //       alert(error)
    //       console.error(error);
    //     });
    // }
   

//function for checking if textinput are empty
    checknull =() =>{
      this.registerCall()

        // if (this.state.CardNumber != '' || this.state.MobileNumber != '') {
         
        //     if (this.state.MobileNumber != '') {
        //      // alert(this.state.MobileNumber + " and " + this.state.CardNumber)
        //       this.props.navigation.navigate('Otp' , 
        //       {mobilen0: this.state.MobileNumber ,

        //         cardn0 : this.state.CardNumber});
        //     } else {
        //       alert('Please Enter Mobile Number ');
        //     }
        //   } else {
        //     alert('Please Enter Card Number');
        //   }


     };

     rotatetootp(){
       this.props.navigation.navigate('NormalRegistration')
     }

    


      logInfacebook = async ()=> {
      //const { type, accessToken, user } = await Google.logInAsync(config);
      try {
        const {
          type,
          token,
          expires,
          permissions,
          declinedPermissions,
        } = await Facebook.logInWithReadPermissionsAsync('2367470516914739', {
          permissions: ['public_profile', 'email'],
        });
      
          // Get the user's name using Facebook's Graph API
          const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${token}`);
           const res =await response.json();
           console.log("facebookres"  ,res) 

           if(res.email !== null){

            this.props.navigation.navigate('NormalRegistration' , {
              googlename : res.name ,
              googlegmail: res.email
            })


           }
           else{
            alert("");
           }

        
      //    Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`); 
      // //  /console.log("response" ,response.json())
      //  //console.log("name" ,(response.json()).name)
        
      }
       catch (error) {
        console.log(error)
        alert(`Facebook Login Error: ${error}`);
      }
    }


    onButtonPress = () => {
      BackHandler.removeEventListener('hardwareBackPress', BackHandler.exitApp());
      
    }
    

    
    componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
    
    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }


      signInWithGoogleAsync = async()=>  {
      try {
        const result = await Google.logInAsync({
          androidClientId: "693878956147-mcn4s8707ofd7n3id15n9lbispacegqk.apps.googleusercontent.com",
          iosClientId: "693878956147-5qcdkcqd0pbob2pag5s8kjshhvjrnota.apps.googleusercontent.com",
          
          scopes: ['profile', 'email'],
        });
        console.log("Googleresponse" , result);
        if (result.type === 'success') {


       //   AsyncStorage.setItem("socialname" ,  result.user.name)
         // AsyncStorage.setItem("socialemail" , result.user.email)
            this.props.navigation.navigate('NormalRegistration' , {
              googlename : result.user.name ,
              googlegmail: result.user.email
            })

         
         
    
         
        } else {
          console.log("cancel");
        }
      } catch (e) {
        alert(e)
     console.log("error" , e);
      }
    }

  //   checkifempty =() =>{
      
  
  //           this.props.navigation.navigate('Otp')
  //           //this.setState({ isLoading: false })

  // };


   async getweather ()  {

    try{
      let response = await fetch("http://api.openweathermap.org/data/2.5/weather?q=karachi,Pk&APPID=17c795972452e0306fb58c7d00843133")
      
      const  responsejson = await response.json();
      console.log(responsejson)
      console.warn(responsejson)
    } catch (error){
        alert(error)
    }
  
  }

  async getmetaWeather (){

    try{
      let response = await fetch("https://www.metaweather.com/api/location/2211096/")
      
      const  {title , consolidated_weather} = await response.json();
      const {weather_state_name , the_temp} = consolidated_weather[0];

      console.log("Title" , title )
      console.log("weather_state_name" , weather_state_name )
      console.log("the_temp" , the_temp )
    } catch (error){
        alert(error)
    }
  }


  // hideLoader = () => {
  //   this.setState({ isLoading: false });
   
  // };

  // showloader = () => {
  //   this.setState({ isLoading: true });
   
  // };

  signup = async () => {
    this.setState({isLoading : true });
    var tokennnn;
    try{
    
      let response = await fetch (`http://172.191.1.137:8080/AGCM_PROD/AG_Servlet/FUEL?messageType=LOGIN_FUEL&identity=03212556100&cardNo=8096160900000043&imei=90909090&channel=Mobile&msisdn=03212556100&firstTimeLogin=Y`)
      const completeresponse = await response.json();
      console.log("activatereposnse" , completeresponse)

      if(completeresponse.code == '1012'){
        tokennnn = completeresponse.additonalData.userObject.tokenNo 
        this.setState({
          isLoading : false,
        tokennumber:tokennnn 
       });
        

            AsyncStorage.setItem('tokenNo',tokennnn);
            AsyncStorage.setItem('linkcard','yes');

            this.props.navigation.navigate('newOTP',

                    {
                     mobilen0: this.state.MobileNumber ,
                    cardn0 : this.state.CardNumber,
                    tokenNo : this.state.tokennumber,
                     // tokenNo : responseData.additonalData.userObject.tokenN
                    
                 });


               

                 
           
       
        
        
      }
      else {
        alert(completeresponse.detailMessage)
      }
    
    }
    catch(error){
      alert(error)
    }
    
    
    }

    dismisskeyboard = text => {
      this.setState({text : text});
      if(text.length == 5){
        Keyboard.dismiss()
      }
    }

    // _retrieveData = async () => {
    //   try {
    //     const value = await AsyncStorage.getItem('tokenNo');
    //     const value1 = await AsyncStorage.getItem('linkcard');
    //     if (value !== null) {
    //       // We have data!!
    //       console.log("Toeknssssasss" ,value);
    //       console.log("linkcard" ,value1);
    //     }
    //   } catch (error) {
    //     // Error retrieving data
    //   }
    // };

    


    render() {

      if (this.state.isLoading) {
        return (
          <View style={{  flex: 1,
            justifyContent: 'center',
            flexDirection: 'column'
            }}>
            <ActivityIndicator color='#FF4500' size="large" style={{alignSelf : 'center'}} />
          </View>
        );
      }
      

      return (
      
        <ImageBackground source={require('./../src/images/background.png')} style={{width: '100%', height: '100%'}}>
         <View style={{ flex: 1 , alignSelf:'center' , marginTop:20}}>

        <StatusBar hidden/>
        {/* <ActivityIndicator size="large" style={{justifyContent:'center' , alignItems:'center'}}/> */}
        <Image source={require('./../src/images/Fuel_up_logo_240.png')} style ={{width:150 , height:120 , marginBottom:40 , alignSelf:'center' , marginTop:20}}></Image>
        

        <TextInput 
    
        style={{borderBottomColor:'#FFFFFF' , borderBottomWidth : 1 , width:Dimensions.get('window').width / 100 * 70, marginTop:20 , color : 'white', padding:5 }}
        keyboardType = 'numeric'
        placeholder = "Enter Email"
        
        placeholderTextColor ='white'
        returnKeyType="done"
        onSubmitEditing ={this.dismisskeyboard}
        //onChangeText={CardNumber => this.setState({CardNumber})}
        
       // onChangeText={this.dismisskeyboard}
       
         >abc@gmail.com</TextInput>
        
        <TextInput
       
        style={{borderBottomColor:'#FFFFFF' , borderBottomWidth : 1 ,width:Dimensions.get('window').width / 100 * 70 , marginTop:20 ,  color :'white' , padding:5}}
         keyboardType = 'numeric'
        
         placeholder="Enter Password" 
         returnKeyType="done"
         placeholderTextColor ='white'
         // onChangeText ={MobileNumber => this.setState({MobileNumber})}
         
      //  onChangeText={this.dismisskeyboard}
         >********

           
         </TextInput>

         <Text style={{color:'white' , alignItems:'flex-end' , alignSelf:'flex-end'}}>Forgot password?</Text>
        

         
         <View>
                


                        <View style={{flexDirection:'row' , justifyContent:'center' , alignItems:'center'  , marginTop:50}}>
                                      <SocialIcon
                                                        onPress={this.logInfacebook}
                                                      type='facebook'
                                                    />

                                                    <SocialIcon
                                                      onPress={this.signInWithGoogleAsync}
                                                      type='google'
                                                    />


                          </View>

        
      
      
            
                      <TouchableOpacity
                                style={styles.loginScreenButton}
                          
                                onPress={this.signup}
                                underlayColor='#fff'>
                                <Text style={styles.loginText}>Signin</Text>



                  </TouchableOpacity>

                  <TouchableOpacity   onPress={() =>   this.props.navigation.navigate('NormalRegistration' , {
                  googlename : null ,
                  googlegmail: null
                })
    } style={{marginTop:10}}>

                            <View style={{flexDirection:'row' , justifyContent:'center' , alignItems:'center'}}>
                                  <Text style={{color:'white'}}>Don't have an account? Signup</Text>
                                   
                           </View>
                </TouchableOpacity>

                  <TouchableOpacity   onPress={() => this.props.navigation.navigate('Biometric')} style={{marginTop:10}}>

                            <View style={{flexDirection:'row' , justifyContent:'center' , alignItems:'center'}}>
                                  <Text style={{color:'white'}}>Login with TouchID</Text>
                                  <Image source={require('./../src/images/fingerprint_grey.png')} style ={{width:30 , height:30 , marginLeft:10 }}></Image>
                                  
                           </View>
                </TouchableOpacity>


                 
{/* 
                  <Text style={{color:'white', alignSelf:'center' , marginTop:5}}>Validate your account here</Text> */}
         </View>
         <Image source={require('./../src/images/dp2_160.png')} style ={{alignSelf: 'center' , width:95   , height:40  , bottom:0, marginBottom:5 , position:'absolute'}}></Image>
        
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
         marginTop:10,
          paddingTop:10,
          alignSelf:'center' ,
          paddingBottom:10,
          backgroundColor:'#ffffff',
          borderRadius:5,
          borderWidth: 1,
          borderColor: '#fff'
        },
        loginText:{
            color:'#FF4500',
            textAlign:'center',
            paddingLeft : 10,
            paddingRight : 10
        }
  });
  
  
  