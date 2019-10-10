import React from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { View , Text, Button , NetInfo, Image , Alert ,  TouchableOpacity,ImageBackground , StyleSheet , Share , ActivityIndicator , Platform} from 'react-native';
import {Permissions} from 'expo-permissions';
import Geocoder from 'react-native-geocoding';
import { BackHandler } from 'react-native';
import { BottomSheet } from 'react-native-btr';



export default class maps extends React.Component {

    static navigationOptions = {
        header:  null
    }

    constructor(props){
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.shareLoc = this.shareLoc.bind(this);
       
        this.state= {
        
            latitude : 0.0 , 
            longitude : 0.0 , 
            visible : false ,
            markers: [{
                title: 'hello',
                coordinates: {
                  latitude: 0,
                  longitude: 0
                },
              },
              ]
        
        };
      }

      componentDidMount() {
        NetInfo.getConnectionInfo().then(connectionInfo => {
          if(connectionInfo.type  == 'none'){
            this.checklogin()
          } 
          else{
            navigator.geolocation.getCurrentPosition(
              ({coords:{latitude , longitude}}) =>this.setState({latitude , longitude}))
          }
          
          // console.log(
          //   'Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType
          // );
        });
        
      }

      checklogin = async ()=> {
        Alert.alert(
          'No Internet Connection',
          'Please check your internet connection', 
          [
            { text: 'okay', onPress: () => this.props.navigation.navigate('Testing') },
            // {
            //   text: '',
            //   onPress: () => console.log('Cancel Pressed'),
            //   style: 'cancel',
            // },
          //   { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false }
        );
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



    // getData =() => {
    //     Geocoder.init("AIzaSyATFMFOi1Kj7DqpfFL2i1T7K19blQfudcE");

    //     Geocoder.from(41.89, 12.49)
	// 	.then(json => {
    //             var addressComponent = json.results[0].address_components[0];
    //             alert(addressComponent)
	// 	})
    //     .catch(error => console.warn(error));
    //     alert("errr")
 
    // }

       



    getnearbyplace = async ()=> {

        try{
     fetch('https://api.foursquare.com/v2/venues/explore?client_id=NY3ECSB4ICJKKUKBVMSSS1LFT1K5NPIO1NF01KFY15BKVSUT&client_secret=ZSDO4LGKACPZP13B5TXEDFDVHKYR0ZASSZ23TFUNYP4YJ1AB&v=20180323&limit=10&ll=40.7243,-74.0018&query=Restaurant')
     .then((response) => response.json())
          .then((responseJson) => {  
            //   console.log("lat" , responseJson.response.groups[0].items[0].venue.location.lat);
            //   console.log("long" , responseJson.response.groups[0].items[1].venue.location.lat);
         var i ;
         for(i = 0 ; i <10 ; i ++){
             var lat = responseJson.response.groups[0].items[i].venue.location.lat;
             console.log("newlatitude" , lat) 
             this.setState({
                 markers: {
                     coordinates:{
                        latitude :  responseJson.response.groups[0].items[i].venue.location.lat , 
                        longitude : responseJson.response.groups[0].items[i].venue.location.lng 
                     
                                 }
                     }
             
                  
                //  markers : response.map(item => ({
                //     latitude : JSON.stringify( responseJson.response.groups[0].items[i].venue.location.lat ), 
                //     longitude : JSON.stringify( responseJson.response.groups[0].items[i].venue.location.lng ) ,

                // })
                
             })
             console.log("newlong" , this,this.state.longitude) 
         }
        }
          )
    }
        catch (error){
            alert(error)
        }

    }

    shareLoc(){
        Share.share({
            message :'https://www.google.com/maps/?q=-'+  this.state.longitude + ',' +this.state.latitude
        });
    }
    
    render() {
        const {latitude , longitude} = this.state
  
        if (latitude) {
          return (    
              <View style={{flex:1}}>
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
                                
                                            <Text style={{fontSize:20 , marginTop:5 , color:'white'}}>Current Location</Text>
                       
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


                <View style={{flexDirection:'row' , justifyContent:'center' }}>
                                  
                                    <TouchableOpacity
                                                style={styles.loginScreenButton}
                                        onPress={this.shareLoc}
                                                underlayColor='#fff'>
                                                    <Text style={styles.loginText}>Share Location</Text>

                                    </TouchableOpacity>

                                    <Text style={{color:'transparent'}} >1</Text>

                </View>

             
      

                                                        <MapView 
                                                         zoomEnabled={true}
                                                         
                                                         showsUserLocation={true}
                                                         showsCompass={true}
                                                         
                                                         style={{flex:1}}
                                                         initialRegion={{
                                                           latitude ,
                                                           longitude ,
                                                           latitudeDelta: 0.01,
                                                           longitudeDelta: 0.01,
                                                         }}
                                                       >
                                        
                                        
                                        {this.state.markers.map((marker, index) => 
                                            ( <MapView.Marker key={index} coordinate={marker.coordinates} 
                                            title={marker.title} /> ))}

                                        </MapView>
                                            
                                      
              </View>
             
          );
        }
        return(
            <View style={{flex: 1, paddingTop: 20 , justifyContent:'center'}}>
            <ActivityIndicator color='#FF4500' size="large"  />
          </View>
        )
     
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
        } ,
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
  
  