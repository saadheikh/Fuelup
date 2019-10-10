import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Marker from 'react-native-maps';
import { BackHandler  , TouchableOpacity ,StatusBar ,ActivityIndicator, Image , TextInput , ImageBackground  , Platform , NetInfo , Alert} from 'react-native';
import { BottomSheet } from 'react-native-btr';



import {
  View,
  Text,
  StyleSheet,
  Button,
  LATITUDE,
  LONGITUDE,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
} from "react-native";

export default class nearbyplaces extends React.Component {

    static navigationOptions= {
        header :null
    }

  constructor() {
      super();
      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
      this.state = {
        region: {
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
          title : '' ,
          description:''
        },
        markers: [],
        loaded: false  ,
        visible : false ,

      }

    }

    componentWillMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  
  handleBackButtonClick() {
    this.props.navigation.goBack()
    return true;
  } 

  _toggleBottomNavigationView = () => {
     
    this.setState({ visible: !this.state.visible });
  };

    componentDidMount() {
      NetInfo.getConnectionInfo().then(connectionInfo => {
        if(connectionInfo.type  == 'none'){
          this.checklogin()
        } 
        else{
          navigator.geolocation.getCurrentPosition(
            (position) => {
            console.log(position);
              this.setState({
                region: {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1,
                }
              });
            },
            (error) => this.setState({ error: error.message }),
           { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
          );

          this.getLocationsforHospital()
        }
        
        console.log(
          'Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType
        );
      });

      
      // if (this.state.latitude == 0 || this.state.latitude == null) {
       
        
      // }
      // else{
      
      //   this.getLocations()
      // }
      
    }

    checklogin = async ()=> {
      Alert.alert(
        'No Internet Connection',
        'Please check your internet connection', 
        [
          { text: 'okay', onPress: () => this.props.navigation.navigate('Testing') },
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

     
     getLocationsforshoppingmalls(){

      console.log("shoppingmall" , "shopingmall")
      return fetch('https://api.foursquare.com/v2/venues/explore?client_id=NY3ECSB4ICJKKUKBVMSSS1LFT1K5NPIO1NF01KFY15BKVSUT&client_secret=R00FZPMPPX5IOKWTYUBLDSYXNJX1EJOMQBU1ZTYANE4OAXZW&v=20180323&limit=20&ll=24.8241026,67.0439977&query=shopping_mall')
      .then(response => response.json())
      .then(responseData =>{
         var markers = [];
  
          for (var i = 0; i < 10; i++) {
            //console.log("Titles" ,  responseData.response.groups[0].items[i].venue.name)
        
             // var coords = responseData.features[i].geometry.coordinates;
              var marker = {
                  title :  responseData.response.groups[0].items[i].venue.name,
                coordinate: {
                  latitude:responseData.response.groups[0].items[i].venue.location.lat,
                  longitude: responseData.response.groups[0].items[i].venue.location.lng,
                 
                }
              }
              markers.push(marker);
            
          }
          this.setState({
            markers: markers,
            loaded: true,
          });
        }
      ).done();
    }

     getLocationsforHospital= async () => {
        this.setState({
          isLoading:true
        })
      console.log("Calling Get Config Call")
      return fetch('https://api.foursquare.com/v2/venues/explore?client_id=NY3ECSB4ICJKKUKBVMSSS1LFT1K5NPIO1NF01KFY15BKVSUT&client_secret=R00FZPMPPX5IOKWTYUBLDSYXNJX1EJOMQBU1ZTYANE4OAXZW&v=20180323&limit=20&ll=24.8241026,67.0439977&query=hospital')
      .then(response => response.json())
      .then(responseData =>{
         var markers = [];
  
          for (var i = 0; i < 10; i++) {
            //console.log("Titles" ,  responseData.response.groups[0].items[i].venue.name)
        
             // var coords = responseData.features[i].geometry.coordinates;
              var marker = {
                  title :  responseData.response.groups[0].items[i].venue.name,
                coordinate: {
                  latitude:responseData.response.groups[0].items[i].venue.location.lat,
                  longitude: responseData.response.groups[0].items[i].venue.location.lng,
                 
                }
              }
              markers.push(marker);
            
          }
          this.setState({
            markers: markers,
            loaded: true,
            isLoading:false
          });
        }
      ).done();
    }

    getLocations(){
      //NY3ECSB4ICJKKUKBVMSSS1LFT1K5NPIO1NF01KFY15BKVSUT
     // ZSDO4LGKACPZP13B5TXEDFDVHKYR0ZASSZ23TFUNYP4YJ1AB
    return fetch('https://api.foursquare.com/v2/venues/explore?client_id=HV21HZ1U2RFKDESSP2LWXSK14U5M2QD4Y0G5O1RO3T4ULH0Q&client_secret=TNXPL4PZAS4FBG3PP1II3DJWFD2D1ZN0SHMO1ZYVT52VDLDE&v=20180323&limit=20&ll=24.8241026,67.0439977&query=Restaurant')
    .then(response => response.json())

   
   // return fetch('https://api.foursquare.com/v2/venues/explore?client_id=NY3ECSB4ICJKKUKBVMSSS1LFT1K5NPIO1NF01KFY15BKVSUT&client_secret=ZSDO4LGKACPZP13B5TXEDFDVHKYR0ZASSZ23TFUNYP4YJ1AB&v=20180323&limit=10&ll=24.8241026,67.0439977&query=Restaurant')
    .then(responseData =>{
      if(Object.keys(responseData.response).length == 0 ){

        alert("Limit exceed")
      }else
      {
        var markers = [];

        console.log(responseData)
         for (var i = 0; i < 10; i++) {
           //console.log("Titles" ,  responseData.response.groups[0].items[i].venue.name)
       
            // var coords = responseData.features[i].geometry.coordinates;
             var marker = {
                 title :  responseData.response.groups[0].items[i].venue.name,
               coordinate: {
                 latitude:responseData.response.groups[0].items[i].venue.location.lat,
                 longitude: responseData.response.groups[0].items[i].venue.location.lng,
                
               }
             }
             markers.push(marker);
           
         }
         this.setState({
           markers: markers,
           loaded: true,
         });

      }
    
      
      }
    ).done();
  }

    render() {
      if (this.state.isLoading) {
        return (
          <View style={{flex: 1, paddingTop: 20 , justifyContent:'center'}}>
            <ActivityIndicator  size="large" color="#FF4500"/>
          </View>
        );
      }

    return (
    
      <View style={{flex:1 }}>
        <StatusBar hidden={false} />
                          <StatusBar barStyle={'light-content'} backgroundColor ={'#E14126'} translucent={false} /> 

                <ImageBackground source={require('./../../src/images/header_160.png')} style={{width:'100%' , height:60 , justifyContent:'center'}}>
                                    <ImageBackground source={require('./../../src/images/strip/strip.png')} style={{width:'100%' ,height:50 ,alignSelf:'center'}}>
                                            
                                <View style={{height:100  ,flex:1 , flexDirection:'row' , justifyContent:'space-between' , marginTop:5}}>
                                            
                                            <TouchableOpacity onPress={() =>this.props.navigation.goBack()}>
                                                  <Image source={require('./../../src/images/white_arow/arrow.png')}
                                                        style={{
                                                          marginTop:5 , 
                                                          marginLeft:20 ,
                                                          width : 30 , 
                                                          height : 30 ,  }}>

                                                  </Image>
                                              </TouchableOpacity>
                                  
                                              <Text style={{fontSize:20 , marginTop:5 , color:'white'}}>Near by Places</Text>
                        
                                              <View style={{flexDirection:'row'}}>
                                                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Signup')}>
                                                  <Image source={require('./../../src/images/bell/bell.png')}
                                                      style={{ marginTop:10 ,
                                                            marginLeft:20 ,
                                                              width : 20 , 
                                                            height : 20 , 
                                                                                                                    }}>
                                                  </Image>
                                                </TouchableOpacity>

                                              <TouchableOpacity onPress={()=>this.props.navigation.navigate('Signup')}>
                                                  <Image source={require('./../../src/images/switch/switch.png')}
                                                      style={{ 
                                                        marginTop:10  ,
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
                              </ImageBackground>

          
                    

                                                                      <View>
                                                                      <View style={{flexDirection:'row',marginTop:10 , justifyContent:'space-between' , marginLeft:25 , marginRight : 25}}>

                                                    <TouchableOpacity   onPress={() => this.getLocationsforHospital }
                                                    style={{alignSelf:'center'}}>

                                                      <View style={{width: 45,
                                                            height:45,
                                                            borderWidth: 1,
                                                            borderRadius: 100,
                                                            borderWidth: 10,
                                                            marginLeft:10 ,
                                                            fontSize:10 ,
                                                            borderRadius: 100,
                                                            backgroundColor:'#2E86C1' ,
                                                            borderColor: '#2E86C1',
                                                            }}>

                                                      
                                                      </View>
                                                      <Text style={{alignSelf:'center' , color:'grey'}}>Hospitals</Text>
                                                    </TouchableOpacity>


                                                    <TouchableOpacity  style={{alignSelf:'center'}}>

                                                              <View style={{width: 45,
                                                            height:45,
                                                                    borderWidth: 1,
                                                                    borderRadius: 100,
                                                                    fontSize:10 ,

                                                                    borderWidth: 10,
                                                                    borderRadius: 100,
                                                                    backgroundColor:'#EC7063' ,
                                                                    borderColor: '#EC7063',
                                                                    }}>

                                                                
                                                              </View>
                                                              <Text style={{alignSelf:'center' , color:'grey'}}>Hotels</Text>
                                                              </TouchableOpacity>

                                                              <TouchableOpacity style={{alignSelf:'center'}}>

                                                      <View style={{width: 45,
                                                            height:45,
                                                            borderWidth: 1,
                                                            borderRadius: 100,
                                                            fontSize:10 ,

                                                            borderWidth: 10,
                                                            borderRadius: 100,
                                                            backgroundColor:'#F7DC6F' ,
                                                            borderColor: '#F7DC6F',
                                                            }}>

                                                        
                                                      </View>
                                                      <Text style={{alignSelf:'center' , color:'grey'}}>Stations</Text>
                                                      </TouchableOpacity>

                                                      <TouchableOpacity onPress={() => this.getLocationsforshoppingmalls} style={{alignSelf:'center'}}>

                                                      <View style={{
                                                        width: 45,
                                                            height:45,
                                                            borderWidth: 1,
                                                            borderRadius: 100,
                                                            borderWidth: 10,
                                                            fontSize:10 ,

                                                            borderRadius: 100,
                                                            backgroundColor:'#52BE80' ,
                                                            borderColor: '#52BE80',
                                                            }}>

                                                      
                                                      </View>

                                                      <Text style={{alignSelf:'center' , color:'grey'}}>Malls</Text>
                                                      </TouchableOpacity>


                                                    </View>

                    </View>

                                              
                                      
                                          

    
        <View style={styles.container}>
        
        
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
                                  
                                  flexDirection: 'column',
                                  
                                }}>

                                <View style={{borderTopColor:'grey' , borderTopWidth:3 , width:20 ,marginTop:10, height:15 ,alignSelf:'center'}}></View>
                                <Text style={{ textAlign: 'center', padding: 20, fontSize: 20 }}>
                                Explore nearby
                                </Text>

                                <View style={{flexDirection:'row' , justifyContent:'space-between' , marginLeft:25 , marginRight : 25}}>

                                    <TouchableOpacity  
                                    style={{alignSelf:'center'}}>

                                      <View style={{width: 45,
                                            height:45,
                                            borderWidth: 1,
                                            borderRadius: 100,
                                            borderWidth: 10,
                                            marginLeft:10 ,
                                            fontSize:10 ,
                                            borderRadius: 100,
                                            backgroundColor:'#2E86C1' ,
                                            borderColor: '#2E86C1',
                                            }}>

                                      
                                      </View>
                                      <Text style={{alignSelf:'center' , color:'grey'}}>Resturants</Text>
                                    </TouchableOpacity>

                                  
                                    <TouchableOpacity  style={{alignSelf:'center'}}>

                                              <View style={{width: 45,
                                            height:45,
                                                    borderWidth: 1,
                                                    borderRadius: 100,
                                                    fontSize:10 ,

                                                    borderWidth: 10,
                                                    borderRadius: 100,
                                                    backgroundColor:'#EC7063' ,
                                                    borderColor: '#EC7063',
                                                    }}>

                                                
                                              </View>
                                              <Text style={{alignSelf:'center' , color:'grey'}}>Coffee</Text>
                                              </TouchableOpacity>

                                              <TouchableOpacity style={{alignSelf:'center'}}>

                                      <View style={{width: 45,
                                            height:45,
                                            borderWidth: 1,
                                            borderRadius: 100,
                                            fontSize:10 ,

                                            borderWidth: 10,
                                            borderRadius: 100,
                                            backgroundColor:'#F7DC6F' ,
                                            borderColor: '#F7DC6F',
                                            }}>

                                        
                                      </View>
                                      <Text style={{alignSelf:'center' , color:'grey'}}>Gas</Text>
                                      </TouchableOpacity>

                                      <TouchableOpacity style={{alignSelf:'center'}}>

                                      <View style={{
                                        width: 45,
                                            height:45,
                                            borderWidth: 1,
                                            borderRadius: 100,
                                            borderWidth: 10,
                                            fontSize:10 ,

                                            borderRadius: 100,
                                            backgroundColor:'#52BE80' ,
                                            borderColor: '#52BE80',
                                            }}>

                                      
                                      </View>

                                      <Text style={{alignSelf:'center' , color:'grey'}}>Hotels</Text>
                                      </TouchableOpacity>


                                </View>
                              
                              
                              </View>
                            </View>
          </BottomSheet>
                  
        <MapView.Animated  
          style={styles.map}
          region={this.state.region}
          showsUserLocation={true}
          >

        {/* {this.state.markers.map(marker => (
            <MapView.Marker
              coordinate={marker.coordinate}
            />
        ))} */}

                                      {this.state.markers.map((marker, index) => 
                                              ( <MapView.Marker key={index} coordinate={marker.coordinate}  title = {marker.title} description = {marker.description}
                                              /> ))}


                                              
        </MapView.Animated>
        </View>
        </View>
      );
    }
  }



  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
    },
    map: {
      width: "100%",
      height: "100%",
      
    },
    loginScreenButton:{
      alignSelf:'center' , 
      width:'60%' , 
      alignItems:'center',
      justifyContent:'center' ,
    
    marginTop:10,
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'#FF4500',
      borderRadius:5,
      borderWidth: 1,
      borderColor: '#fff'
    },
    loginText:{
        color:'white',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10
    },
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
      
    },
  })