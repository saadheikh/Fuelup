import React from 'react';
import { Button , View, Text, StatusBar , Image  , NetInfo , ImageBackground ,StyleSheet,ActivityIndicator , Dimensions , TouchableOpacity,ScrollView ,  FlatList , Alert} from 'react-native';
import { BackHandler } from 'react-native';

export default class weather extends React.Component {

 static navigationOptions={
     title: "Weather"
     , header : null
 }

    constructor(props){
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

        this.state={
            temperature : '' ,
            pressure : '' ,
            humid : '' ,
            maxtemp :'' , 
            mintemp :'' ,
            predictabi: '' , 
            winspeed : '' , 
            winddirection : '' , 
            windcompass: '' ,
            sunrise: '' , 
            sunset:'' , 
            visible  : '' , 
            weather_state: '' , 
            title1: '' ,
            tz : '' ,
            nextday : '' ,
            response: [] ,
            hotweather : [] , 
            hotweatherDate : [] , 
            dataSource : [] ,
            isLoading:true  ,


        }
    }

    componentDidMount() {
      NetInfo.getConnectionInfo().then(connectionInfo => {
        if(connectionInfo.type  == 'none'){
          this.checklogin()
          this.setState({
            isLoading : false ,
          })
      
        } 
        else{
          this.getWeatherUpdate()
        }
        
        console.log(
          'Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType
        );
      });
      
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
  

    getWeatherUpdate = async ()=> {
      
       try{
           let response = await fetch("https://www.metaweather.com/api/location/2211096/")
        //    .then((response) => response.json())
        //     .then((responseJson) => {
        //      // just setState here e.g.
        //      this.setState({ dataSource: responseJson.consolidated_weather, isLoading:false,});
        //     })

            //console.log(response.json())
           // const {dataSource} = await response.json();
           const  {title , consolidated_weather , sun_rise , sun_set , timezone } = await response.json();
           const {weather_state_name , the_temp , humidity , max_temp , min_temp 
            , predictability ,visibility , wind_direction , wind_direction_compass , air_pressure, wind_speed} = consolidated_weather[0];
            //const {the_temp} = consolidated_weather[1] ;
            
            
            var i , j , list;
            for (i = 0; i < 5 ; i++) {
                 temperature = consolidated_weather[i].the_temp;
                    if(temperature > 35) {
                        this.setState({
                            hotweather  : temperature + " C`",
                            hotweatherDate : consolidated_weather[1].applicable_date 
                        })
                    
                            list  = [consolidated_weather[1].applicable_date]  ;
                        
                        date = consolidated_weather[i].applicable_date
                        // Alert.alert(
                        //     'Extreme Weather Update',
                        //     'Heat wave is expected on ' +  list ,
                        //     [
                        //       { text: 'Check Weather updates', onPress: () => this.props.navigation.navigate('Weather') },
                        //       {
                        //         text: 'Cancel',
                        //         onPress: () => console.log('Cancel Pressed'),
                        //         style: 'cancel',
                        //       },
                        //     //   { text: 'OK', onPress: () => console.log('OK Pressed') },
                        //     ],
                        //     { cancelable: false }
                        //   );
                          }

                    }

           this.setState({ 
               temperature : the_temp ,
               pressure :  air_pressure , 
               humid : humidity , 
               maxtemp : max_temp , 
               mintemp : min_temp , 
               predictabi : predictability , 
               visible : visibility ,
               winddirection : wind_direction,
               windcompass : wind_direction_compass , 
               winspeed : wind_speed , 
               weather_state : weather_state_name , 
               title1: title , 
               sunrise : sun_rise , 
               sunset : sun_set , 
               tz :  timezone , 
               dataSource : consolidated_weather ,
               isLoading:false


           })
         } catch (error){
             alert(error)
         }
  }

    
  render() {
    if (this.state.isLoading) {
        return (
          <View style={{flex: 1, paddingTop: 20 , justifyContent:'center'}}>
            <ActivityIndicator color='#FF4500' size="large"  />
          </View>
        );
      }
  
      return(
        // <View>

        //     <View style={{flexDirection:'column' , justifyContent:'center' , flex:1 }}></View>

        //                 <View style={{flexDirection:'row' , justifyContent:'space-around'}}>
        //                                         <View style={{flexDirection:'column' , justifyContent:'center' , alignItems:'center' , alignSelf:'center'}}>
        //                                                 <Text>Temperature</Text>
        //                                                 <Text>899</Text>
                                                
        //                                         </View>

        //                                         <View style={{flexDirection:'column' , justifyContent:'center' , alignItems:'center' , alignSelf:'center'}}>
        //                                                 <Text>Humidity</Text>
        //                                                 <Text>899</Text>
                                                
        //                                         </View>


        //                                         <View style={{flexDirection:'column' , justifyContent:'center' , alignItems:'center' , alignSelf:'center'}}>
        //                                                 <Text>Pressure</Text>
        //                                                 <Text>899</Text>
                                                
        //                                         </View>
        //                 </View>

                        




        // </View>

         <View>
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
                                
                                            <Text style={{fontSize:25, marginTop:5  , color:'white'}}>Weather</Text>
                       
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

         <ImageBackground source={require('./../../src/images/background.png')} style={{width:'100%' , height:'100%'}}>
                
                                <Text style={{fontSize:20 , color:'white' , alignSelf:'center'}} >{this.state.title1}</Text>
                                <Text style={{fontSize:20  ,color:'white' , alignSelf:'center'}} >{this.state.tz}</Text>
                                <Text style={{alignSelf:'center' ,color:'white' }}>{this.state.weather_state}</Text>
                                {/* <Text style={{alignSelf:'center' ,color:'white'}}>{this.state.sunrise}</Text>
                                <Text style={{alignSelf:'center' ,color:'white'}}>{this.state.sunset}</Text> */}
                                

                                <View opacity={0.5}  style={{
                                marginTop:10 ,
                                  borderBottomColor: 'white',
                                  borderBottomWidth: 1,

                                }}></View>


                         <View style={{ marginTop:20 ,
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        marginLeft:20 , marginRight:20
                                                           }}>
 <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                            
                                          <View style={{flexDirection:'column'}}>
                                                                 
                                                                  <View style={{flexDirection:'column' , alignItems:'center'}}>
                                                                    <Image style={{width:20 , height:20 , alignSelf:'center'}} source={require('./../../src/images/weather/visibility_icon.png')}></Image>
                                                                          <Text style={{alignSelf:'center' ,color:'white' , opacity:0.6 , fontSize:13}}>Visibility</Text>
                                                                          <Text style={{width:50 , height:20 , alignSelf:'center',color:'white', opacity:0.6 , fontSize:13 }}>{this.state.visible}</Text>
                                                                  
                                                                  </View>
                                                    
                                                          
                    
                                                                  <View style={{flexDirection:'column' , marginTop:10 }}>
                                                                         <Image style={{width:20 , height:20 ,alignSelf:'center'}} source={require('./../../src/images/weather/humidity_icon.png')}></Image>
                                                                          <Text style={{alignSelf:'center' ,color:'white' ,alignSelf:'center' , alignItems:'center', opacity:0.6 , fontSize:13}}>Humidity</Text>
                                                                          <Text  style={{height:20 , alignSelf:'center' ,color:'white', opacity:0.6 , fontSize:13}}>{this.state.humid}</Text>
                                                                  
                                                                  </View>


                                                                  <View style={{flexDirection:'column' , marginTop:10 }}>
                                                                       <Image style={{width:20 , height:20 , alignSelf:'center'}} source={require('./../../src/images/weather/pressure_icon.png')}></Image>
                                                                          <Text style={{alignSelf:'center' ,color:'white' , alignSelf:'center', opacity:0.6 , fontSize:13}} >Pressure</Text>
                                                                          <Text style={{width : 50 , height:20 , alignSelf:'center' ,color:'white', opacity:0.6 , fontSize:13}}>{this.state.pressure}</Text>
                                                                  
                                                                  </View>
                                         </View>

                                        <View style={{flexDirection:'column' }}>
                                                            <View style={{flexDirection:'column'}}>
                                                            <Image style={{width:20 , height:20 , alignSelf:'center'}} source={require('./../../src/images/weather/feels_icon.png')}></Image>
                                                                    
                                                                    <Text style={{alignSelf:'center' ,color:'white', opacity:0.6 , fontSize:13}}>Temperature</Text>
                                                                    <Text  style={{width:50 , height:20 , alignSelf:'center',color:'white', opacity:0.6 , fontSize:13}}>{this.state.temperature}</Text>
                                                    
                                                            </View>

                                                            <View style={{flexDirection:'column'  , marginTop:10}}>
                                                            <Image style={{width:20 , height:20 , alignSelf:'center'}} source={require('./../../src/images/weather/weekday_cion.png')}></Image>
                                                                    
                                                                    <Text style={{alignSelf:'center',color:'white', opacity:0.6 , fontSize:13}}>Max.temp</Text>
                                                                    <Text  style={{ height:20 , alignSelf:'center',color:'white', opacity:0.6 , fontSize:13}}>{this.state.maxtemp}</Text>
                                                            
                                                            </View>


                                                            <View style={{flexDirection:'column'  , marginTop:10}}>
                                                            <Image style={{width:20 , height:20 , alignSelf:'center'}} source={require('./../../src/images/weather/direction_icon.png')}></Image>
                                                                    
                                                                    <Text style={{alignSelf:'center',color:'white', opacity:0.6 , fontSize:13}}>Min. temp</Text>
                                                                    <Text  style={{width:50 , height:20 , alignSelf:'center',color:'white', opacity:0.6 , fontSize:13}}>{this.state.mintemp}</Text>
                                                            
                                                            </View>
                                         </View>

                                          <View style={{flexDirection:'column'}}>
                                                        <View style={{flexDirection:'column' ,}}>
                                                        <Image style={{width:20 , height:20 , alignSelf:'center'}} source={require('./../../src/images/weather/speed_icon.png')}></Image>
                                                                    
                                                                <Text style={{alignSelf:'center',color:'white', opacity:0.6 , fontSize:13}}>Wind Speed</Text>
                                                                <Text  style={{width:50 , height:20 , alignSelf:'center',color:'white', opacity:0.6 , fontSize:13}}>{this.state.winspeed}</Text>
                                                
                                                        </View>

                                                        <View style={{flexDirection:'column' , marginTop:10 }}>
                                                        <Image style={{width:20 , height:20 , alignSelf:'center'}} source={require('./../../src/images/weather/direction_icon.png')}></Image>
                                                                    
                                                                <Text style={{alignSelf:'center',color:'white', opacity:0.6 , fontSize:13}}>Wind Direction</Text>
                                                                <Text  style={{width:20 , height:20 , alignSelf:'center',color:'white', opacity:0.6 , fontSize:13}}>{this.state.winddirection}</Text>
                                                        
                                                        </View>


                                                        <View style={{flexDirection:'column' , marginTop:10 , justifyContent:'center' , alignItems:'center' , alignSelf:'center'}}>
                                                        <Image style={{width:20 , height:20 , alignSelf:'center'}} source={require('./../../src/images/weather/hours_icon.png')}></Image>
                                                                    
                                                                <Text style={{alignSelf:'center',color:'white', opacity:0.6 , fontSize:13}}>Wind Compass</Text>
                                                                <Text  style={{height:20 , alignSelf:'center',color:'white', opacity:0.6 , fontSize:13}}>{this.state.windcompass}</Text>
                                                        
                                                        </View>
                                          </View>

                                
                         </View>

                         </View>
                         <View opacity={0.5}  style={{
                                marginTop:10 ,
                                  borderBottomColor: 'white',
                                  borderBottomWidth: 1,

                                }}></View>

                                <View style={{flexDirection:'row' , justifyContent:'space-between' , marginLeft:20 , marginRight:20 , marginTop:10}}>
                                    <Text style={{color:'white'}}>Date</Text>
                                    <Text  style={{color:'white'}}>Temperature</Text>
                                    <Text  style={{color:'white'}} >Weather</Text>

                                </View>

                                <View opacity={0.5}  style={{
                                marginTop:10 ,
                                  borderBottomColor: 'white',
                                  borderBottomWidth: 1,

                                }}></View>
                        
                        {/* <FlatList
          data={this.state.dataSource}
          renderItem={({item}) =><Text>{item.applicable_date}</Text>}
          keyExtractor={(item, index) => index.toString}
        /> */}
                    <FlatList 
  data={this.state.dataSource} 
  renderItem={
    ({item}) =>         
                <View style={{marginTop : 20 , flexDirection:'row' , justifyContent:'space-between' , marginRight:20 , marginLeft:20 , alignItems:'center' , alignItems:'center'}}>
                        <Text style={{color:'white'}}>{item.applicable_date}</Text>
                        <Text  style={{width:50 , height:20 , justifyContent:'center' , alignSelf:'center' , alignItems:'center' , color:'white'}} >{item.the_temp}</Text>
                        <Text  style={{color:'white'}}>{item.weather_state_name}</Text>
                </View>
               
  } 
  keyExtractor={(item, index) => index.toString()}
/>                                             
                       
</ImageBackground>

          </View>
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
         marginTop:10,
          paddingTop:10,
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
  
  
  