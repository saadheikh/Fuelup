import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import Marker from 'react-native-maps';

import {
  View,
  Text,
  StyleSheet,ImageBackground ,Image ,
  Button,
  LATITUDE,
  LONGITUDE,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  Alert,
  AsyncStorage,
  TouchableOpacity,
} from "react-native";

//24.978017, 67.066412

export default class finddealer extends React.Component {

  handleGetDirections = () => {
    const data = {
       source: {
        latitude: -33.8356372,
        longitude: 18.6947617
      },
      destination: {
        latitude: -33.8600024,
        longitude: 18.697459
      },
      params: [
        {
          key: "travelmode",
          value: "driving"        // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate"       // this instantly initializes navigation using the given travel mode
        }
      ]
    }
 
    getDirections(data)
  }

   static navigationOptions= {
        header :null
    }

  constructor() {
      super();
      this.state = {
        region: {
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
          title : '',
          locationInput:`PUMP`, 
        },
        //mNo:null,
         // cNo:null,
          mNo:"03212556100",
          cNo:"8096160900000043",
          currentStatus:"A",
          newStatus:"I",
          tNo:'',
        markers: [],
        loaded: false
      }
    }

    _retrieveData = async () => {
        console.log("called" , "calledoncards")
        try {
          const value = await AsyncStorage.getItem('tokenNo');
          if (value !== null) {
            console.log("token_in_dealer" ,value);
            this.setState({
                tNo : value ,
            })
            // We have data!!
            this.getRequestBranchLocation()
          }
          else{
            alert("Empty")
          }
        } catch (error) {
          alert(error)
          // Error retrieving data
        }
      };



componentWillMount(){

  _storeData = async () => {
    try {
      await AsyncStorage.setItem('ObjectValue', 'I like to save it.');
    } catch (error) {
      // Error saving data
    }
  };

}

    componentDidMount() {
        this._retrieveData()
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

     // this.getLocations()
      // this.getLocationsforHospital()
       //this.getLocationsforCar()
      //this.getLocationsforCarWorkshop()
     //this.handleGetDirections()

     //this.getRequestCardStatuswithParam(this.state.cNo,this.state.mNo,this.state.tNo,this.state.currentStatus,this.state.newStatus)
     //this.getRequestCardStatement()

    

    }

   




    getBranchesRequestParam(MobileNo){
      
      console.log(MobileNo,this.state.tNo)
      const baseUrl = "http://172.191.1.137:8080/AGCM_PROD/AG_Servlet/FUEL?messageType=GET_BRANCHES_FUEL";
      const param = `&msisdn=${MobileNo}&imei=90909090&channel=Mobile&identity=${MobileNo}&tokenNo=${this.state.tNo}`;
      return `${baseUrl}${param}`;

    }

    //http://localhost:8080/AGCM_PROD/AG_Servlet/FUEL?messageType=CARD_STATUS_UPDATE&channel=Mobile&msisdn=03212556100&imei=90909090&identity=03212556100&cardNo=7000460520000028&currentStatus=I&newStatus=A&tokenNo=1909270425359356

    getLocations(){
      console.log(this.getRequestwithParam(this.state.cNo,this.state.mNo))
      //NY3ECSB4ICJKKUKBVMSSS1LFT1K5NPIO1NF01KFY15BKVSUT
     // ZSDO4LGKACPZP13B5TXEDFDVHKYR0ZASSZ23TFUNYP4YJ1AB
    // http://172.191.1.137:8080/AGCM_PROD/AG_Servlet/FUEL?messageType=LOGIN_FUEL&identity=03212556100&cardNo=8096160900000043&imei=90909090&channel=Mobile&msisdn=03212556100&firstTimeLogin=Y
   // return fetch('https://api.foursquare.com/v2/venues/explore?client_id=NY3ECSB4ICJKKUKBVMSSS1LFT1K5NPIO1NF01KFY15BKVSUT&client_secret=R00FZPMPPX5IOKWTYUBLDSYXNJX1EJOMQBU1ZTYANE4OAXZW&v=20180323&limit=20&ll=24.8241026,67.0439977&query=Restaurant')
   // return fetch('http://172.191.1.137:8080/AGCM_PROD/AG_Servlet/FUEL?messageType=LOGIN_FUEL&identity=03212556100&cardNo=8096160900000043&imei=90909090&channel=Mobile&msisdn=03212556100&firstTimeLogin=Y')
   
   const url = this.getRequestwithParam(this.state.cNo,this.state.mNo)
   return fetch(url)

   .then(response => response.json())

   // return fetch('https://api.foursquare.com/v2/venues/explore?client_id=NY3ECSB4ICJKKUKBVMSSS1LFT1K5NPIO1NF01KFY15BKVSUT&client_secret=ZSDO4LGKACPZP13B5TXEDFDVHKYR0ZASSZ23TFUNYP4YJ1AB&v=20180323&limit=10&ll=24.8241026,67.0439977&query=Restaurant')
    .then(responseData =>{
       var markers = [];

       console.log(responseData)

       //console.log(responseData.code)

       //console.log(responseData.additonalData.userObject.tokenNo)
       const responseCode = responseData.code

       if (responseCode == "1012"){


        alert(responseData.detailMessage)

       }else {

        alert(responseData.detailMessage)

       }

      //  {responseData.map((marker, index) => 
      //   ( 

      //     console.log(marker)
      //  //marker 
        
      //   ))}

      
       //map()
       //map((marker, index)

       

        // for (var i = 0; i < 10; i++) {
        //   //console.log("Titles" ,  responseData.response.groups[0].items[i].venue.name)
      
        //    // var coords = responseData.features[i].geometry.coordinates;
        //     var marker = {
        //         title :  responseData.response.groups[0].items[i].venue.name,
        //       coordinate: {
        //         latitude:responseData.response.groups[0].items[i].venue.location.lat,
        //         longitude: responseData.response.groups[0].items[i].venue.location.lng,
               
        //       }
        //     }
        //     markers.push(marker);
          
        // }
        // this.setState({
        //   markers: markers,
        //   loaded: true,
        // });
      }
    ).done();
  }


  //Card Status 


//Get Branch Location
getRequestBranchLocation(){

    try{
  console.log(this.getBranchesRequestParam(this.state.mNo))
  const url = this.getBranchesRequestParam(this.state.mNo)
  return fetch(url)

  .then(response => response.json())

  .then(responseData =>{
  
    console.log(responseData)
    var markers = [];

if (responseData.code == "0000"){

   const data = responseData.additonalData.branches
   console.log(data)
    for (var i = 0; i < data.length; i++) {

            var marker = {
               // title :  responseData.additonalData.branches[i].branchName,
                //description:responseData.additonalData.branches[i].address,

                
                title : responseData.additonalData.branches[i].address,
              coordinate: {
                latitude:parseFloat(responseData.additonalData.branches[i].latitude),
                longitude:parseFloat(responseData.additonalData.branches[i].longitude),
               
              }
            }
            markers.push(marker);
          
        }
        this.setState({
          markers: markers,
          loaded: true,
        });
} else if (responseData.code == "5018"){

  Alert.alert(
    responseData.description,
    responseData.detailMessage, 
    [
     // { text: 'OK', onPress: () => this.props.navigation.navigate('Testing') },
     
       { text: 'OK', onPress: () => this.props.navigation.navigate('Signup') },
    ],
    { cancelable: false }
  );
}else if (responseData.code == "2222"){
  Alert.alert(
    responseData.description,
    responseData.detailMessage, 
    [
     // { text: 'OK', onPress: () => this.props.navigation.navigate('Testing') },
     
       { text: 'OK', onPress: () => console.log('OK Pressed') },
    ],
    { cancelable: false }
  );
}

    }
  ).done();
}
catch(error){
    Alert.alert(
        Error,
        error, 
        [
          { text: 'okay', onPress: () => this.props.navigation.navigate('Signup') },
    
        ],
        { cancelable: false }
      );
}
}





  getCall(){

 const url = this.getRequestwithParam(this.state.cNo,this.state.mNo)
 console.log(url)
 return fetch(url)
 .then(response => response.json())
  .then(responseData =>{
     var markers = [];



 // _storeData = async () => {
    //   try {
    //     await AsyncStorage.setItem('ResponceValue', responseData);
    //   } catch (error) {
    //     // Error saving data
    //   }
    // };
     
     //console.log(responseData)
     //console.log(responseData.additonalData.userObject.tokenNo)
     const responseCode = responseData.code

     if (responseCode == "1012"){


      alert(responseData.detailMessage)

     }else {

      alert(responseData.detailMessage)

     }
    }
  ).done();
}








  getLocationsforHospital(){

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
        });
      }
    ).done();
  }

 

  getLocationsforCar(){
    return fetch('https://api.foursquare.com/v2/venues/explore?client_id=NY3ECSB4ICJKKUKBVMSSS1LFT1K5NPIO1NF01KFY15BKVSUT&client_secret=R00FZPMPPX5IOKWTYUBLDSYXNJX1EJOMQBU1ZTYANE4OAXZW&v=20180323&limit=20&ll=24.8241026,67.0439977&query=car_rental')
     .then(response => response.json())
    .then(responseData =>{
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
    ).done();
  }

  getLocationsforCarWorkshop(){
    return fetch('https://api.foursquare.com/v2/venues/explore?client_id=NY3ECSB4ICJKKUKBVMSSS1LFT1K5NPIO1NF01KFY15BKVSUT&client_secret=R00FZPMPPX5IOKWTYUBLDSYXNJX1EJOMQBU1ZTYANE4OAXZW&v=20180323&limit=20&ll=24.8241026,67.0439977&query=car_dealer')
    .then(response => response.json())
    .then(responseData =>{
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
    ).done();
  }


  getLocationsforCarAtm(){
    return fetch('https://api.foursquare.com/v2/venues/explore?client_id=NY3ECSB4ICJKKUKBVMSSS1LFT1K5NPIO1NF01KFY15BKVSUT&client_secret=ZSDO4LGKACPZP13B5TXEDFDVHKYR0ZASSZ23TFUNYP4YJ1AB&v=20180323&limit=10&ll=24.8241026,67.0439977&query=park')
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




  render() {

  return (


      <View style={{flex:1,}}>

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
                                
                                            <Text style={{fontSize:20 , marginTop:5 , color:'white'}}>Near by Dealers </Text>
                       
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

      <MapView  
      
        provider={ PROVIDER_GOOGLE }
        style={styles.map}
        region={this.state.region}
        //onRegionChange={ region => this.setState({region}) }
        //onRegionChangeComplete={ region => this.setState({region}) }
        showsUserLocation={true}>
       {/* <MapViewDirections
         origin={origin}
         destination={destination}
         apikey={GOOGLE_MAPS_APIKEY}
       /> */}
          
  
       {/* {this.state.markers.map(marker => (
          <MapView.Marker
            coordinate={marker.coordinate}
          />
       ))} */}

                                    {this.state.markers.map((marker, index) => 
                                            ( <MapView.Marker key={index} coordinate={marker.coordinate}  title = {marker.title}
                                            /> ))}

                                    
       </MapView>
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
  inputContainer:{

  },
  input:{

  },
  button:{

  }
})