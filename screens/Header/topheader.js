import React from 'react';
import { View, Text , Butto , ImageBackground , StatusBar  , Dimensions, TouchableOpacity , Image} from 'react-native' ;

export default class DetailsScreen extends React.Component {
    static navigationOptions ={
        header : null
    }
    render() {
      return (
        <View style={{ flex: 1}}>
             <StatusBar hidden={false} />
                        <StatusBar barStyle={'light-content'} backgroundColor ={'#E14126'} translucent={false} /> 
                        <ImageBackground source={require('./../../src/images/headerback/background.png')} style ={{height : 80 , width: Dimensions.get('window').width}}>
                                    
                                    <View style={{flexDirection:'row' , justifyContent:'space-between' , marginLeft:10 ,  marginRight:10 , height:80}}>
                                                    <Image source={require('./../../src/images/white_arow/arrow.png')} 
                                                     style={{width:30 , height:20}}></Image>

                                                     <Text style={{color:'white' , fontSize:20}}>Heading</Text>

                                                    <View style={{flexDirection:'row' , height:80}}>
                                                                <Image source={require('./../../src/images/bell/bell.png')} 
                                                                style={{width:20 , height:10}}></Image>

                                                                    <Image source={require('./../../src/images/switch/switch.png')} 
                                                                style={{width:20 , height:10}}></Image>

                                                    </View>
                                                    



                                            </View>
                           
                              </ImageBackground>
                  
             
        </View>
      );
    }
  }
  