import React from 'react';
import {Button , View, Text , Image,NetInfo , TouchableOpacity   , StatusBar,Platform , Dimensions , ImageBackground , StyleSheet  , Alert} from 'react-native';
import { Card } from 'react-native-elements';
import { BackHandler  , AsyncStorage} from 'react-native';
import {userdata} from './../screens/model/otpdata' ;





export default class testing extends React.Component {

  static navigationOptions={
        header : null

  }

  constructor(props){
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state ={ 
      isLoading: true ,
      name : '' ,
      email : '' ,
      TokenNo : '',
      cardnumber :'' ,


    }
  }


    
 
  
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}

componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick() {
     Alert.alert(
                            'Logout',
                            'Are you sure you want to logout?',
                            [
                              { text: 'Okay', onPress: () => this.props.navigation.navigate('Signup') },
                              {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                              },
                            //   { text: 'OK', onPress: () => console.log('OK Pressed') },
                            ],
                            { cancelable: false }
                          );
  return true;
} 


checkifnet = async ()=> {
  console.log("checkifnet")

  NetInfo.getConnectionInfo().
  then(connectionInfo => {
    if(connectionInfo.type  == 'none'){
      this.checklogin()
      this.setState({
        isLoading : false ,
      })
  
    } 
    else{
      this.rotatetonearyby()
     
    }
    
})
}

rotatetonearyby = async () => {
  console.log("nearby pressed")
  this.props.navigation.navigate('Nearby')
}

checklogin = async ()=> {
  Alert.alert(
    'No Internet Connection',
    'Please check your internet connection', 
    [
      { text: 'okay', onPress: () => this.props.navigation.navigate('Registration') },
      // {
      //   text: 'Cancel',
      //   onPress: () => console.log('Cancel Pressed'),
      //   style: 'cancel',
      // },
    //   { text: 'OK', onPress: () => console.log('OK Pressed') },
    ],
    { cancelable: false }
  );
 }


componentDidMount() {
  //console.log("cardnumber", userdata.getCard_Number() )
  const {navigation} = this.props ;
        this.setState({TokenNo : navigation.getParam('tokenNo' , "N/A")});
        console.log('testing',this.state.TokenNo);


  this.retrieveData()
  NetInfo.getConnectionInfo().then(connectionInfo => {
    if(connectionInfo.type  == 'none'){
      
    } 
    else{
      navigator.geolocation.getCurrentPosition(
        ({coords:{latitude , longitude}}) =>this.setState({latitude , longitude}))
        this.getWeatherUpdate()
    }
    
    // console.log(
    //   'Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType
    // );
  });
  
}

  getWeatherUpdate = async ()=> {
      
       try{
           let response = await fetch("https://www.metaweather.com/api/location/2211096/")
      
           const  {consolidated_weather } = await response.json();
         
            
            
            var i , j , list;
            for (i = 0; i < 5 ; i++) {
                 temperature = consolidated_weather[i].the_temp;
                    if(temperature > 35) {
                        this.setState({
                            hotweather  : temperature + " C`",
                            hotweatherDate : consolidated_weather[1].applicable_date 
                        })
                    
                          date = consolidated_weather[0].applicable_date
                        Alert.alert(
                            'Extreme Weather Update',
                            'Heat wave is expected on ' +  date , 
                            [
                              { text: 'Check Weather updates', onPress: () => this.props.navigation.navigate('Signup') },
                              {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                              },
                            //   { text: 'OK', onPress: () => console.log('OK Pressed') },
                            ],
                            { cancelable: false }
                          );
                          }

                    }

         } catch (error){
             alert(error)
         }
  }


  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('name');
      if (value !== null) {
        this.setState({
          name : value
        })
        // We have data!!
        console.log(value);
      }
      else{
        console.log("N/A");
        this.setState({
          name : "Guest mode"
        })
      }
     } catch (error) {
       console.log(error)
       // Error retrieving data
     }
  }


     checklogin = async ()=> {

      console.log("called" , "calledonhome")
    try {
      const value = await AsyncStorage.getItem('linkcard');
      if (value !== null) {
        this.props.navigation.navigate('Home')
          }
      else{
        this.alert()
      }
    } catch (error) {
      alert(error)
     
    }
   }

   
alert(){

  Alert.alert(
    'Signup First',
    'Please create an account to use Fuelup services', 
    [
      { text: 'Signup', onPress: () => this.props.navigation.navigate('Registration') },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ],
    { cancelable: false }
  );
}
  render(){


    return(
      <View style={{ flex: 1,}}>
        <StatusBar hidden={false} />
               
               <StatusBar barStyle={'light-content'} backgroundColor ={'#E14126'} translucent={false} /> 
                        <View style={styles.appBar} />
        
                             <View  style={{flex:4 , width:'100%'}}>
                                     <ImageBackground source={require('./../src/images/headerback/background.png')} style={{width:'100%' , height:'100%'}}>

                                          <ImageBackground source={require('./../src/images/strip/strip.png')} style={{width:'100%' ,height:50 ,alignSelf:'center'}}>
                                               <View style={{flexDirection:'row' , justifyContent:'space-between' , backgroundColor:'#2082828'}}>
                                                  <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                                                        <Image source={require('./../src/images/hamburger_icon.png')}
                                                              style={{ 
                                                                marginTop:10 ,
                                                                marginLeft:20 ,
                                                                width : 20 , 
                                                                height : 20 ,  }}>

                                                        </Image>
                                                    </TouchableOpacity>
                                        
                                                    <Image source={require('./../src/images/toolbarimage/Fuelup.png')} style ={{ height:40 }}></Image>
                                  
                                                    <View style={{flexDirection:'row'}}>
                                                              <TouchableOpacity onPress={()=>this.props.navigation.navigate('NotificationLimit')}>
                                                                <Image source={require('./../src/images/bell/bell.png')}
                                                                    style={{ marginTop:10 ,
                                                                            width : 20  , 
                                                                          height : 20 , 
                                                                                                                                  }}>
                                                                </Image>
                                                              </TouchableOpacity>

                                                              <TouchableOpacity onPress={()=>this.props.navigation.navigate('Signup')}>
                                                                  <Image source={require('./../src/images/switch/switch.png')}
                                                                      style={{ 
                                                                        marginTop:10 ,
                                                                            marginLeft:20 ,
                                                                              width : 20 , 
                                                                            height : 20 , 
                                                                            marginRight:10
                                                                          }}>
                                                                  </Image>
                                                                </TouchableOpacity>

                                                        </View>
                                  

                                            </View>
                                        </ImageBackground>

                                        <View style={{marginTop:15}}>


                                       
                                   <View style={{ width: 100,  height: 100, borderWidth: 10,  borderRadius: 100,
                                                        borderWidth: 2,
                                                        borderRadius: 100,
                                                        borderColor: 'white',
                                                        justifyContent: 'center',
                                                        alignItems: 'center' ,
                                                        alignSelf:'center',
                                                        marginTop:10
                                                        
                                                 }}>
                                                         <Image source={require('./../src/images/icon1_320.png')}
                                                  style ={{width:'100%' , height:'100%' , alignSelf:'center'}}>
                                         </Image>
                                                 </View>
                                                 </View>
                                       

                                         <Text style={{alignSelf:'center' , color:'white' , marginTop:10,fontSize:15}}>{this.state.name}</Text>
                                         <Text style={{alignSelf:'center' , color:'white' , fontSize:10}}>abc@fuelup.com</Text>
                            
                                        {/* <ImageBackground imageStyle={{borderRadius:10}} source={require('./../src/images/button1_480.png')} style ={{flex:1 , marginLeft:20 , width: '95%' , height:80 , marginTop:10 }}>
                                                  <View style={{flexDirection:'row'}}>
                                                            <Image source={require('./../src/images/icon1_320.png')}
                                                                style ={{width:60 , height:60  , marginLeft:20 , marginTop:10}}>
                                                            </Image>

                                                            <View style={{marginLeft:10 , justifyContent : 'center'}}>
                                                                  <Text>Welcome</Text>
                                                                  <Text style={{marginTop:5}}>Access group</Text>
                                                                <Text style={{fontWeight:'100' , fontSize:10}}>Last Login: 12/12/2019 09:00 am</Text>
                                                            </View>
                                                    </View>
                                         </ImageBackground> */}

                                     
                                          
                                        
                                    </ImageBackground>
                          
                      </View>


                      <View  style={{flex:6 , width:'100%'}}>

                              <View style={{flex:4 , flexDirection:'column' , justifyContent:'space-around' , marginRight:30 , marginLeft:30}}>
                                     
                                         
                                     <View style={{flexDirection:'row' , justifyContent:'space-around'}} >
                                             
                                             
                                             <TouchableOpacity onPress={this.checklogin}>
                                                              <View style={{flexDirection:'column'}}>
                                                                      <Image source={require('./../src/images/pin/pin.png')} style={{width:27 , height:25 , alignSelf:'center'}}></Image>
                                                                      <Text style={{alignSelf:'center', color:'grey'}}>Manage</Text>
                                                                      <Text style={{alignSelf:'center', color:'grey', fontSize:10}}>Card</Text>
                                                                    
                                                              </View>
                                            </TouchableOpacity>
                                      
                                            <TouchableOpacity onPress={this.checkifnet}>
                                              
                                                
                                                                <View style={{flexDirection:'column'}}>
                                                                        <Image source={require('./../src/images/card/card.png')} style={{width:26 , height:25 , alignSelf:'center'}}></Image>
                                                                        <Text style={{alignSelf:'center', color:'grey'}}>Nearby</Text>
                                                                        <Text style={{alignSelf:'center', color:'grey', fontSize:10}}>Places</Text>
                                                                </View>
                                            </TouchableOpacity>    


                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Reminder')}>

                                                                <View style={{flexDirection:'column'}}>
                                                                                              <Image source={require('./../src/images/file/file.png')} style={{width:20 , height:24 , alignSelf:'center'}}></Image>
                                                                                              <Text style={{alignSelf:'center', color:'grey', fontSize:15}}>Manage</Text>
                                                                                              <Text style={{alignSelf:'center', color:'grey', fontSize:10}}>Reminder</Text>
                                                                </View>


                                            </TouchableOpacity>
                                                                  

                              </View> 
                                    
                                      <View  style={{flexDirection:'row' , justifyContent:'space-around'}} >
                                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Maps')}>
                                                                <View style={{flexDirection:'column'}}>
                                                                            <Image source={require('./../src/images/pin/pin.png')} style={{width:27 , height:25 , alignSelf:'center'}}></Image>
                                                                            <Text style={{alignSelf:'center' , color:'grey' , fontSize:15}}>Share</Text>
                                                                            <Text style={{alignSelf:'center' , color:'grey' , fontSize:10}}>Location</Text>
                                                                          
                                                                    </View>
                                                    </TouchableOpacity>


                                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Weather')}>
                                                                <View opacity={0.3}  style={{borderRRightColor: 'grey', borderRightWidth: 1, }}></View>
                                                                                <View style={{flexDirection:'column'}}>
                                                                                        <Image source={require('./../src/images/loc/loc.png')} style={{width:18 , height:28 , alignSelf:'center'}}></Image>
                                                                                        <Text style={{alignSelf:'center' , color:'grey', fontSize:15}}>Check</Text>
                                                                                        <Text style={{alignSelf:'center', color:'grey', fontSize:10}}>Weather</Text>
                                                                                </View>
                                                                    <View opacity={0.3}  style={{borderRRightColor: 'grey', borderRightWidth: 1, }}></View>

                                                    </TouchableOpacity>
                                             
                                                        

                                                      <TouchableOpacity onPress= {() => this.props.navigation.navigate('Trafficpdate')}>
                                                                  <View style={{flexDirection:'column'}}>
                                                                                      <Image source={require('./../src/images/file/file.png')} style={{width:20 , height:24 , alignSelf:'center'}}></Image>
                                                                                      <Text style={{alignSelf:'center', color:'grey', fontSize:15}}>Traffic</Text>
                                                                                      <Text style={{alignSelf:'center', color:'grey', fontSize:10}}>Update</Text>
                                                                   </View>


                                                      </TouchableOpacity>
                                                                 

                                      </View>    
  

                                      <View style={{flexDirection:'row' , justifyContent:'space-around'}} >

                                                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('CarToeing')}}>
                                                                      <View style={{flexDirection:'column'}}>
                                                                                            <Image source={require('./../src/images/pin/pin.png')} style={{width:27 , height:25 , alignSelf:'center'}}></Image>
                                                                                            <Text style={{alignSelf:'center', color:'grey', fontSize:15}}>Car Toeing</Text>
                                                                                            <Text style={{alignSelf:'center', color:'grey', fontSize:10}}>Service</Text>
                                                                                          
                                                                        </View>


                                                          </TouchableOpacity>


                                                          
                                                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('SQLite')}}>

                                                                        <View style={{flexDirection:'column'}}>
                                                                                              <Image source={require('./../src/images/card/card.png')} style={{width:26 , height:25 , alignSelf:'center'}}></Image>
                                                                                              <Text style={{alignSelf:'center', color:'grey', fontSize:15}}>Emergency</Text>
                                                                                              <Text style={{alignSelf:'center', color:'grey', fontSize:10}}>Contacts</Text>
                                                                                              
                                                                        </View>


                                                          </TouchableOpacity>
                                                                        
                                                      
                                                                        
                                                          <TouchableOpacity onPress={() => {this.props.navigation.navigate('Settings')}}>

                                                                        <View style={{flexDirection:'column'}}>
                                                                                                <Image source={require('./../src/images/file/file.png')} style={{width:20 , height:24 , alignSelf:'center'}}></Image>
                                                                                                <Text style={{alignSelf:'center', color:'grey', fontSize:15}}>Settings</Text>
                                                                                               
                                                                         </View>

                                                        </TouchableOpacity>
                                                                       

                                      </View>    
                                      
                              </View>



                        </View>



      </View>
    );
  }
}


const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 10 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor:'#FF4500',
    height: APPBAR_HEIGHT,
  },
  content: {
    flex: 1,
    backgroundColor: '#FF4500',
  },
});