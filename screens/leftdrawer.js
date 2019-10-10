import React from 'react';
import { Button , View, Text, Alert , Image , ImageBackground , Dimensions , TouchableOpacity} from 'react-native';
import {Constants} from "expo"; 

export default class leftdrawer extends React.Component {



  checklogin = async ()=> {

   
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

  render() {
    return (
      <View style={{ flex: 1  }}>
      <ImageBackground source={require('./../src/images/Background2_hori.png')} style={{ width:'100%' , height:'100%'}}>


      <TouchableOpacity
                          
                          onPress={() => {this.props.navigation.closeDrawer()}}
                          underlayColor='#fff'>
                             <Image source={require('./../src/images/Fuel_up_logo_240.png')}
             style ={{width:150 , height:120 , marginTop:50 , justifyContent:'center' , alignSelf:'center'}}></Image>
        

                </TouchableOpacity>


       
                  <TouchableOpacity
                          
                            onPress={() => {this.props.navigation.navigate('Testing')}}
                            underlayColor='#fff'>
                               <Text style={{color:'white' , fontSize:15, fontWeight:'200' ,marginLeft:20, marginTop:50}}>Dashboard</Text>

                  </TouchableOpacity>

                              <View  opacity={0.5} style={{
                                marginTop:10 ,
                                  borderBottomColor: 'white',
                                  borderBottomWidth: 1,

                                }}></View>

                  {/* <TouchableOpacity
                          
                           // onPress={() => {this.props.navigation.navigate('View_TR')}}
                            underlayColor='#fff'>
                               <Text style={{color:'white' , fontSize:15, fontWeight:'200' ,marginLeft:20 , marginTop:15}}>View Transactions</Text>

                  </TouchableOpacity> */}

{/*                   
                  <View opacity={0.5}  style={{
                                marginTop:10 ,
                                  borderBottomColor: 'white',
                                  borderBottomWidth: 1,

                                }}></View> */}

                  <TouchableOpacity
                          
                            onPress={() => {() => this.checklogin}}
                            underlayColor='#fff'>
                               <Text style={{color:'white' , fontSize:15, fontWeight:'200' , marginLeft:20 , marginTop:15}}>Manage Card</Text>

                  </TouchableOpacity>

                  
                      <View opacity={0.5}  style={{
                                    marginTop:10 ,
                                      borderBottomColor: 'white',
                                      borderBottomWidth: 1,

                                    }}></View>


                  <TouchableOpacity
                          
                            onPress={() => {this.props.navigation.navigate('Nearby')}}
                            underlayColor='#fff'>
                               <Text style={{color:'white' , fontSize:15, fontWeight:'200' , marginLeft:20 , marginTop:15}}>Find a Dealer</Text>

                  </TouchableOpacity>
                  <View opacity={0.5}  style={{
                                marginTop:10 ,
                                  borderBottomColor: 'white',
                                  borderBottomWidth: 1,

                                }}></View>
                  <TouchableOpacity
                          
                          onPress={() => {this.props.navigation.navigate('Maps')}}
                          underlayColor='#fff'>
                             <Text style={{color:'white' , fontSize:15, fontWeight:'200' , marginLeft:20 , marginTop:15}}>Share Location</Text>

                </TouchableOpacity>

                  
                  <View  opacity={0.5} style={{
                                marginTop:10 ,
                                  borderBottomColor: 'white',
                                  borderBottomWidth: 1,

                                }}></View>

                <TouchableOpacity
                          
                          onPress={() => {this.props.navigation.navigate('Weather')}}
                          underlayColor='#fff'>
                             <Text style={{color:'white' , fontSize:15, fontWeight:'200' , marginLeft:20 , marginTop:15}}>Weather Update</Text>

                </TouchableOpacity>
                <View opacity={0.5}  style={{
                              marginTop:10 ,
                                borderBottomColor: 'white',
                                borderBottomWidth: 1,

                              }}></View>


                  <TouchableOpacity
                          
                            onPress={() => {this.props.navigation.closeDrawer()}}
                            underlayColor='#fff'>
                               <Text style={{color:'white' , fontSize:15, fontWeight:'200' , marginLeft:20 , marginTop:15}}>Complaint Management</Text>

                  </TouchableOpacity>


                  
                  <View opacity={0.5}  style={{
                                marginTop:10 ,
                                  borderBottomColor: 'white',
                                  borderBottomWidth: 1,

                                }}></View>

                                
                  <TouchableOpacity
                         
                          onPress={() => {this.props.navigation.navigate('Signup')}}
                          underlayColor='#fff'>
                            

                             <Text style={{color:'white' ,fontSize:15, fontWeight:'200', marginLeft:20 , marginTop:15 }}>Logout</Text>
                       
                </TouchableOpacity>



<View opacity={0.5}  style={{
                                marginTop:10 ,
                                  borderBottomColor: 'white',
                                  borderBottomWidth: 1,

                                }}></View>
                                
                        




        
        {/* <Button
          title="Go to Home"
          onPress={() => this.props.navigation.closeDrawer()}
        /> */}

        </ImageBackground>
      </View>
    );
  }
}