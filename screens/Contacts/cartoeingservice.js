import React from 'react' ;

import {View , ScrollView , TouchableOpacity , Text , ImageBackground , Platform , Image, Linking} from 'react-native' ;
import { BackHandler } from 'react-native';
export default class cartoeingservice extends React.Component{

    static navigationOptions = {
        header : null
    }

    constructor(props){
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
       
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
    

    render(){
        return(
            <View>

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
                                
                                            <Text style={{fontSize:20 , marginTop:5 , color:'white'}}>Car Toeing Service</Text>
                       
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

                </View>
                <ScrollView>
                    <TouchableOpacity onPress={() => {Linking.openURL(`tel:${'0300-2097203'}`)}}>
                        <View style={{flexDirection:'row' , marginTop:10}}>
                            <Text style={{   borderColor: "black",borderRadius: 4,borderWidth: 1,flex: 1, alignSelf:'center' , alignItems:'center' , justifyContent:'center' ,
                                                                    alignContent:'center' , height: 40 ,  padding:5   }}>HS Car Towing</Text>
                                
                                <Text style={{  borderColor: "black", borderRadius: 4, borderWidth: 1, flex: 1,  alignSelf:'center' ,
                     alignItems:'center' ,justifyContent:'center' ,  alignContent:'center' ,height: 40, padding:5   }}>0300-2097203</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {Linking.openURL(`tel:${'0300-843335'}`)}}>
                        <View style={{flexDirection:'row' , marginTop:10}}>
                            <Text style={{   borderColor: "black",borderRadius: 4,borderWidth: 1,flex: 1, alignSelf:'center' , alignItems:'center' , justifyContent:'center' ,
                                                                    alignContent:'center' , height: 40 ,  padding:5   }}>Asif Carrier</Text>
                                
                                <Text style={{  borderColor: "black", borderRadius: 4, borderWidth: 1, flex: 1,  alignSelf:'center' ,
                     alignItems:'center' ,justifyContent:'center' ,  alignContent:'center' ,height: 40, padding:5   }}>0300-8433335</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {Linking.openURL(`tel:${'0321-2286280'}`)}}>
                        <View style={{flexDirection:'row' , marginTop:10}}>
                            <Text style={{   borderColor: "black",borderRadius: 4,borderWidth: 1,flex: 1, alignSelf:'center' , alignItems:'center' , justifyContent:'center' ,
                                                                    alignContent:'center' , height: 40 ,  padding:5   }}>Reliance Roadside</Text>
                                
                                <Text style={{  borderColor: "black", borderRadius: 4, borderWidth: 1, flex: 1,  alignSelf:'center' ,
                     alignItems:'center' ,justifyContent:'center' ,  alignContent:'center' ,height: 40, padding:5   }}>0321-2286280</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {Linking.openURL(`tel:${'021-3434123'}`)}}>
                        <View style={{flexDirection:'row' , marginTop:10}}>
                            <Text style={{   borderColor: "black",borderRadius: 4,borderWidth: 1,flex: 1, alignSelf:'center' , alignItems:'center' , justifyContent:'center' ,
                                                                    alignContent:'center' , height: 40 ,  padding:5   }}>Auto Adviser</Text>
                                
                                <Text style={{  borderColor: "black", borderRadius: 4, borderWidth: 1, flex: 1,  alignSelf:'center' ,
                     alignItems:'center' ,justifyContent:'center' ,  alignContent:'center' ,height: 40, padding:5   }}>021-3434123</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {Linking.openURL(`tel:${'0300-221191'}`)}}>
                        <View style={{flexDirection:'row' , marginTop:10}}>
                            <Text style={{   borderColor: "black",borderRadius: 4,borderWidth: 1,flex: 1, alignSelf:'center' , alignItems:'center' , justifyContent:'center' ,
                                                                    alignContent:'center' , height: 40 ,  padding:5   }}>Auto Shade</Text>
                                
                                <Text style={{  borderColor: "black", borderRadius: 4, borderWidth: 1, flex: 1,  alignSelf:'center' ,
                     alignItems:'center' ,justifyContent:'center' ,  alignContent:'center' ,height: 40, padding:5   }}>0300-221191</Text>
                        </View>
                    </TouchableOpacity>



                </ScrollView>
             </View>
        )
    }
}