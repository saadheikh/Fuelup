import React from 'react';
import { Button , View, Text , TouchableOpacity , Image , ImageBackground , StyleSheet , Dimensions } from 'react-native';

export default class complaint extends React.Component {
  static navigationOptions ={
    title : 'Complaint Management'
};
  render() {
    
    return (
      <View style={{flexDirection:'row' , justifyContent:'space-around' , alignItems:'center'}}>
                                 <TouchableOpacity
                                                                      style={styles.loginScreenButton}
                                                                      onPress={() => {
                                                                        this.props.navigation.navigate('Card_Management')
                                                                      }}
                                                                      underlayColor='#fff'>
                                                                          <ImageBackground imageStyle={{borderRadius:10}} source={require('./../src/images/button3_320.png')} style ={{borderRadius: 10 , width:130 , height:80}}>
                                                                              <Image source={require('./../src/images/icon7_160.png')} style ={{marginTop:10 , alignSelf:'center' , width:35 , height:30}}></Image>
                                                                              <Text style={styles.loginText}>Card Management</Text>

                                                                          </ImageBackground>

                                                              </TouchableOpacity>
                                                              <TouchableOpacity
                                                                      style={styles.loginScreenButton}
                                                                      onPress={() => {
                                                                        this.props.navigation.navigate('Complaint')
                                                                      }}
                                                                      underlayColor='#fff'>
                                                                          <ImageBackground imageStyle={{borderRadius:10}} source={require('./../src/images/button3_320.png')} style ={{borderRadius: 10 , width:130 , height:80}}>
                                                                              <Image source={require('./../src/images/icon8_160.png')} style ={{marginTop:10 , alignSelf:'center' , width:35 , height:30}}></Image>
                                                                              <Text style={styles.loginText}>Complaint Management</Text>

                                                                          </ImageBackground>


                                                              </TouchableOpacity>
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
            alignItems:'center' ,
          marginRight:5 ,
          width : Dimensions.get('window').width / 100 * 50 ,
          height: Dimensions.get('window').height / 100 * 30 ,
          backgroundColor:'#FFFFFF',
          borderRadius:5,
          borderWidth: 1,
          borderColor: '#fff' , 
          flex:1 
        },
        loginText:{
            color:'#C61700',
            alignSelf:'center' , 
            justifyContent : 'center' ,
            alignContent:'center',
            alignItems:'center' ,
            textAlign:'center',
            textAlignVertical:'center' ,
            paddingLeft : 10,
            paddingRight : 10,
            marginTop:10 ,
            fontSize:10
        }
  });