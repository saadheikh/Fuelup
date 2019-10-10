import React from 'react' ;
import {View , Text , ImageBackground , Image , TouchableOpacity} from 'react-native' ;
import { BackHandler } from 'react-native';
export default class setting extends React.Component{
    static navigationOptions={
        header  :null
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
                    <ImageBackground source={require('./../../src/images/header_160.png')} style={{width:'100%' , height:60 , justifyContent:'center'}}>

                                                <ImageBackground source={require('./../../src/images/strip/strip.png')} style={{width:'100%' ,height:50 ,alignSelf:'center'}}>
                                                    <View style={{flexDirection:'row' , justifyContent:'space-between' , backgroundColor:'#2082828'}}>
                                                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                                            <Image source={require('./../../src/images/white_arow/arrow.png')}
                                                                    style={{ 
                                                                    marginTop:10 ,
                                                                    marginLeft:20 ,
                                                                    width : 20 , 
                                                                    height : 20 ,  }}>

                                                            </Image>
                                                        </TouchableOpacity>

                                                        <Image source={require('./../../src/images/toolbarimage/Fuelup.png')} style ={{ height:40 }}></Image>

                                                        <View style={{flexDirection:'row'}}>
                                                                    <TouchableOpacity >
                                                                    <Image source={require('./../../src/images/bell/bell.png')}
                                                                        style={{ marginTop:10 ,
                                                                                width : 20 , 
                                                                                height : 20 , 
                                                                                                                                        }}>
                                                                    </Image>
                                                                    </TouchableOpacity>

                                                                    <TouchableOpacity >
                                                                        <Image source={require('./../../src/images/switch/switch.png')}
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

                                                </ImageBackground>


                                                <View  opacity={0.5} style={{
                                     marginTop:10 ,
                                  borderBottomColor: 'black',
                                  borderBottomWidth: 1,

                                }}></View>      


                                                          <TouchableOpacity 
                                                          style={{marginTop:10}} 
                                                          onPress={() => {this.props.navigation.navigate('Editpro')}}>
                                                             <Text style={{marginLeft:20 , marginRight:20 , fontSize:20}}>Edit Profile</Text>
                                                    
                                                           </TouchableOpacity>  

                                                    <View  opacity={0.5} style={{
                                     marginTop:10 ,
                                  borderBottomColor: 'black',
                                  borderBottomWidth: 1,

                                }}></View>   

                               
                                

            </View>
        )
    }
}