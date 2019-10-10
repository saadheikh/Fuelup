import React from 'react';
import { Button , View, Text , Image  , NetInfo , TouchableOpacity,ActivityIndicator , StatusBar, AsyncStorage , Dimensions , Alert ,  ImageBackground , StyleSheet} from 'react-native';
import {DrawerActions} from 'react-navigation-drawer' ;
import { Card } from 'react-native-elements';
import { BackHandler } from 'react-native';
import userdata from './model/otpdata';


export default class home extends React.Component {

  static navigationOptions={
      title : 'Fuel up'  ,
      header: null ,
      headerTitleStyle: { alignSelf: 'center'  , textAlign:'center' , justifyContent:'center'  , color:'#FF4500'},
    headerStyle: {
      backgroundColor: '#FFFFFF'
    },
 
};  


constructor(props){
  super(props);
  this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  
  this.state={
    cardNo : 'N/A' ,
    accountNo : '' ,
    cardName:'' ,
    cardType: '' ,
    cardStatus : '' ,
    limitType: '' ,
    monthlyLimit: '' ,
    avaibleBlnc : '' ,
    loyalityPoint: '' ,
    taxAmount : '' ,
    taxName: '' ,
    taxName1 : '' ,
    taxDate: '' ,
    taxTime :'' ,
    tokennumber : '',
    isLoading:true  ,
    


}
 
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
  console.log("finDealer")
  this.props.navigation.navigate('FindDealer')
}

checklogin = async ()=> {
  Alert.alert(
    'No Internet Connection',
    'Please check your internet connection', 
    [
      { text: 'okay', onPress: () => this.props.navigation.navigate('Signup ') },
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

 session = async ()=> {
  Alert.alert(
    'Session Expired',
    'Please Signup again', 
    [
      { text: 'okay', onPress: () => this.props.navigation.navigate('Signup') },
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

_retrieveData = async () => {
  console.log("called" , "calledonhome")
  try {
    const value = await AsyncStorage.getItem('tokenNo');
    const value1 = await AsyncStorage.getItem('linkcard');
    if (value !== null) {
      console.log("token_in_home" ,value);
      this.setState({
        tokennumber : value ,
      })
      // We have data!!
     // this.getInfo()
  this.getDatafromClass()
    }
    else{
      alert("Empty")
    }
  } catch (error) {
    alert(error)
    // Error retrieving data
  }
};


componentDidMount(){
  this._retrieveData()


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

getInfo = async ()=> {

  console.log("yes")

  try {
    console.log("called" , "called");
    let response = await  fetch(`http://172.191.1.137:8080/AGCM_PROD/AG_Servlet/FUEL?messageType=OTP_VERIFICATION_FUEL&identity=03212556100&imei=90909090&channel=Mobile&msisdn=03212556100&otp=1111&cardNo=8096160900000043&tokenNo=${this.state.tokennumber}`)
      const completeresonse =  await response.json() ;
      console.log(completeresonse)
        if(completeresonse.code == '0000')
          {
                this.setState({
                      cardName : completeresonse.additonalData.cardprofile[0].cardName ,
                      avaibleBlnc : completeresonse.additonalData.cardprofile[0].monthlyBalance ,
                      cardType : completeresonse.additonalData.cardprofile[0].cardType ,
                      loyalityPoint : completeresonse.additonalData.cardprofile[0].availiableRewardPoints ,
                      cardStatus : completeresonse.additonalData.cardprofile[0].cardStatus ,
                      monthlyLimit : completeresonse.additonalData.cardprofile[0].monthlyLimit ,
                      taxAmount : completeresonse.additonalData.cardprofile[0].lastTxnAmount ,
                      taxName : completeresonse.additonalData.cardprofile[0].lastTxnMerName.substring(0,7) ,
                      taxName1 : completeresonse.additonalData.cardprofile[0].lastTxnMerName.substring(7) ,
                      taxDate : completeresonse.additonalData.cardprofile[0].lastTxnDate ,
                      taxTime : completeresonse.additonalData.cardprofile[0].lastTxnTime ,
                      isLoading: false


                })
          }

          else if (completeresonse.code == '5018') {
            this.setState({
              isLoading: false
            })
            
            Alert.alert(
              completeresonse.description,
              completeresonse.detailMessage, 
              [
                { text: 'okay', onPress: () => this.props.navigation.navigate('Signup') },
          
              ],
              { cancelable: false }
            );
            
          }

          else if (completeresonse.code == '1111') {
            this.setState({
              isLoading: false
            })
            Alert.alert(
              completeresonse.description,
              completeresonse.detailMessage, 
              [
                { text: 'okay', onPress: () => this.props.navigation.navigate('Signup') },
          
              ],
              { cancelable: false }
            );
            
          }

      console.log("response" , completeresonse);
  }
  catch (error){
    this.setState({
      isLoading: false
    })
    console.log(error) 
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

getDatafromClass = async ()=>{
 var cardlimimboltsy ;

  if (userdata.getLimit_Type() == 'Quantity') {
    cardlimimboltsy = "LTR"
  }
  else{
    cardlimimboltsy = "PKR"
  }

  if (userdata.getCard_name() == null || userdata.getCard_name() == '') {
    this.session()  
    this.setState({
      isLoading: false
    })  
  }
  else{
    this.setState({
      cardName : userdata.getCard_name(),
      avaibleBlnc :  userdata.getAvail_bln(),
      cardType : userdata.getLimit_Type() ,
      loyalityPoint :userdata.getLoyality_points() ,
      cardStatus : userdata.getCard_Status() ,
      monthlyLimit : userdata.getMonthly_Type() ,
      limitType: cardlimimboltsy ,
      taxAmount :userdata.getTax_AMT()  ,
      taxName : userdata.getTax_Loc() ,
      taxName1 : userdata.getTax_Name() ,
      taxDate : userdata.getTax_Date() ,
      taxTime : userdata.getTax_Time() ,
      isLoading: false
  
  
  })
  }

  // var cardname = userdata.getCard_name;
  // var avaiblnce = userdata.getAvail_bln;
  // var limitType = userdata.getLimit_Type ;
  // var loyalitypoints = userdata.getLoyality_points;
  // var cardstatus = userdata.getCard_Status ;
  // var monthlylimit = userdata.getMonthly_Type ;
  // var taxamount  = userdata.getTax_AMT ;
  // var taxname1 = userdata.getTax_Loc ;
  // var taxname2 = userdata.getTax_Name ;
  // var taxtime = userdata.getTax_Time ;
  
 

}

  openDrawer1 = () => {
    this.props.navigation.navigate.openDrawer(); 
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
        <View style={{ flex: 1}}>
                      <StatusBar hidden={false} />
                        <StatusBar barStyle={'light-content'} backgroundColor ={'#E14126'} translucent={false} /> 

                          <View style={{flex: 1.3, flexDirection: 'column'}}>
                                <ImageBackground source={require('./../src/images/headerback/background.png')} style ={{flex:2 , width: Dimensions.get('window').width}}>
                                      <View style={{flexDirection:'row' , justifyContent:'space-between' , backgroundColor:'#2082828' , marginTop:10}}>
                                                  <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                                        <Image source={require('./../src/images/white_arow/arrow.png')}
                                                              style={{ 
                                                                marginTop:10 ,
                                                                marginLeft:20 ,
                                                                width : 20 , 
                                                                height : 20 ,  }}>

                                                        </Image>
                                                    </TouchableOpacity>
                                        
                                                    <Image source={require('./../src/images/toolbarimage/Fuelup.png')} style ={{ height:40 }}></Image>
                                  
                                                    <View style={{flexDirection:'row'}}>
                                                              <TouchableOpacity onPress={()=>this.props.navigation.navigate('Signup')}>
                                                                <Image source={require('./../src/images/bell_160.png')}
                                                                    style={{ marginTop:10 ,
                                                                            width : 20 , 
                                                                          height : 20 , 
                                                                                                                                  }}>
                                                                </Image>
                                                              </TouchableOpacity>

                                                              <TouchableOpacity onPress={()=>this.props.navigation.navigate('Signup')}>
                                                                  <Image source={require('./../src/images/logout_icon.png')}
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
                            
                                        <ImageBackground imageStyle={{borderRadius:10}} source={require('./../src/images/button1_480.png')} style ={{flex:1 , marginLeft:20 , width: '95%' , height:80 , marginTop:10 }}>
                                                  <View style={{flexDirection:'row'}}>
                                                            <Image source={require('./../src/images/icon1_320.png')}
                                                                style ={{width:60 , height:60  , marginLeft:20 , marginTop:10}}>
                                                            </Image>

                                                            <View style={{marginLeft:10 , justifyContent : 'center'}}>
                                                                  <Text>Welcome</Text>
                                                                  <Text style={{marginTop:5}}>{this.state.cardName}</Text>
                                                                <Text style={{fontWeight:'100' , fontSize:10}}>Last Login: 12/12/2019 09:00 am</Text>
                                                            </View>
                                                    </View>
                                         </ImageBackground>

                                         <View style={{marginLeft: 20  , position:'absolute' , bottom:0 , marginBottom:10}}>
                                              
                                                <View style={{flex:1 , flexDirection:'row'}}>
                                                    <Text style={{color:'white' , marginLeft:10 , fontSize: 25 , fontWeight:'bold'}}>{this.state.avaibleBlnc}</Text>
                                                    <Text style={{color:'white' , marginLeft:5 , fontSize: 15 , fontWeight:'100' , marginTop:10}}>{this.state.limitType}</Text>
                                                </View>
                                                <Text style={{color : 'white' , marginLeft:10 , fontSize:15 , fontWeight:'100' }}>Available Balance</Text>
                                     
                                          </View>

                                           <View style={{marginLeft: 20 ,right:0  , position:'absolute' , bottom:0 , marginBottom:10}}>
                                              
                                                <ImageBackground source={require('./../src/images/button4_320.png')} imageStyle={{borderRadius:10}} style={{alignSelf:'flex-end', width:120 , height:60 , marginRight:10}} >

                                                    <Text style={{color:'white' , alignSelf:'center' , fontSize:25 , justifyContent:'center' ,alignItems:'center', marginTop:5  , fontWeight:'bold'}}>{this.state.loyalityPoint}</Text>
                                                      <Text style={{alignSelf:'center' , bottom:0 , position:'absolute' , alignItems:'center', marginBottom:3 , justifyContent:'center' , fontSize:10}}>your loyality poinits</Text>
                                                </ImageBackground>

                                          </View>

                                    

                              </ImageBackground>
                  
             
              
                        <View style={{flex: 3.5 , width: Dimensions.get('window').width , backgroundColor: 'white'}} >

                                                   <Card 
                                                      style={{width:Dimensions.get('window').width / 100 * 90 , flex:1 }} >
                                        
                                                        <View style={{flexDirection:'row' }}>
                                                              <Text style={{color:'#4F4F4F' , fontWeight:'200' ,fontSize:12 }}>Limit Type:</Text>
                                                              <Text style={{width : 20 , color:'#E14126' , marginLeft:5 , fontSize:10 , fontWeight:'bold'}}>{this.state.limitType}</Text>
                                                              <Text style={{color:'#4F4F4F' , fontWeight:'200' ,fontSize:12 , right:0,marginRight:40 ,position:'absolute'}}>Monthly Limit:</Text>
                                                              <Text style={{color:'#E14126' , marginLeft:10 , position:'absolute' , fontSize:12, right:0  , fontWeight:'bold'}}>{this.state.monthlyLimit}</Text>

                                                        </View>
                                                          
                                                          
                                                        <View style={{flexDirection:'row'  , marginBottom:15}}>
                                                              <Text style={{color:'#4F4F4F' , fontSize:12 , fontWeight:'200'}}>Card Status:</Text>
                                                              <Text style={{color:'#E14126' , marginLeft:10 , fontSize:12 , fontWeight:'bold'}}>{this.state.cardStatus}</Text>
                                                        </View>

                                                        <View style={{flexDirection:'row', marginBottom:10  }}>
                                                              <Text style={{ fontSize:12 , color:'#4F4F4F'}}>Last Fuel Consumption Details</Text>
                                                              
                                                           </View>

                                                        <View style={{flexDirection:'row' , justifyContent:'space-between'}}>

                                                                    <View style={{flexDirection:'row'}}>
                                                                        <Image source={require('./../src/images/icon2_160.png')} style ={{width:15 , height:20}}></Image>
                                                                        <View style={{flexDirection:'column' ,  marginLeft:5}}>
                                                                                            <Text  style={{ fontSize:12 , color:'#4F4F4F' , fontWeight:'bold'}}>{this.state.taxAmount}</Text>
                                                                                            <Text  style={{ fontSize:10 , color:'#4F4F4F' }}>pkr</Text>
                                                                                      </View>
                                                                    </View>
                                                                      
                                                                      <View style={{flexDirection:'row'}}>
                                                                            <Image source={require('./../src/images/icon3_160.png')} style ={{ width:18 , height:20 , marginTop:4 }}></Image>
                                                                              <View>
                                                                                      <View style={{flexDirection:'column' ,  marginLeft:5}}>
                                                                                            <Text  style={{ fontSize:12 , color:'#4F4F4F' , fontWeight:'bold'}}>{this.state.taxName}</Text>
                                                                                            <Text  style={{ fontSize:10 , color:'#4F4F4F' }}>{this.state.taxName1}</Text>
                                                                                      </View>
                                                                              </View>

                                                                      </View>
                                                                        
                                                                      <View style={{flexDirection:'row'}}>
                                                                              <Image source={require('./../src/images/icon4_160.png')} style ={{ width:20 , height:20 , marginTop:4}}></Image>
                                                                                <View>
                                                                                        <View style={{flexDirection:'column', textAlign:'true',  marginLeft:5 }}>
                                                                                            <Text  style={{ fontSize:12 , color:'#4F4F4F' , fontWeight:'bold'}}>{this.state.taxDate}</Text>
                                                                                            <Text  style={{ fontSize:10 , color:'#4F4F4F' }}>{this.state.taxTime}</Text>
                                                                                        </View>
                                                                                </View>


                                                                      </View>
                                                                 
                                                         </View>

                                        

                                      </Card>


                                       <View style={{flex:2.5 ,flexDirection:'column' , marginTop:50}}>
                                         
                                                               <View style={{flex:1 , flexDirection : 'row' , justifyContent:'space-around', alignItems:'center' , marginLeft:20 , marginRight:20}}>
                                                                                <TouchableOpacity
                                                                                      style={styles.loginScreenButton}
                                                                                      onPress={this.checkifnet}
                                                                                      underlayColor='#fff'>
                                                                                        <ImageBackground  imageStyle={{borderRadius:10}} source={require('./../src/images/button3_320.png')} style ={{borderRadius: 10 , width: Dimensions.get('window').width / 100 * 40  , height: 80 , marginRight:10}}>
                                                                                              <Image source={require('./../src/images/icon5_160.png')} style ={{marginTop:10 , alignSelf:'center' , width:20 , height:30}}></Image>
                                                                                              <Text style={styles.loginText}>Find Dealer</Text>

                                                                                        </ImageBackground>

                                                                              </TouchableOpacity>

                                                                              <TouchableOpacity
                                                                                      style={styles.loginScreenButton}
                                                                                      onPress={()=> {this.props.navigation.navigate('View_TR')}}
                                                                                      underlayColor='#fff'>
                                                                                        <ImageBackground imageStyle={{borderRadius:10}} source={require('./../src/images/button3_320.png')} style ={{borderRadius: 10 , width: Dimensions.get('window').width / 100 * 40 , height: 80 , marginLeft:10}}>
                                                                                                <Image source={require('./../src/images/icon6_160.png')} style ={{marginTop:10 , alignSelf:'center' , width:35 , height:30}}></Image>
                                                                                                <Text style={styles.loginText}>View Transaction</Text>

                                                                                          </ImageBackground>

                                                                                          
                                                                              </TouchableOpacity>

                                                                    </View>


                                                                  <View style={{flex:1 ,  alignItems:'center',flexDirection : 'row' , justifyContent:'space-around' , marginBottom:50 , marginRight:20 , marginTop:40 , marginLeft:20}}>
                                                                              <TouchableOpacity
                                                                                  style={styles.loginScreenButton}
                                                                                  onPress={() => {
                                                                                    this.props.navigation.navigate('Card_Management')
                                                                                  }}
                                                                                  underlayColor='#fff'>
                                                                                      <ImageBackground imageStyle={{borderRadius:10}} source={require('./../src/images/button3_320.png')} style ={{borderRadius: 10 ,width: Dimensions.get('window').width / 100 * 40  , height:80 , marginRight:10}}>
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
                                                                                      <ImageBackground imageStyle={{borderRadius:10}} source={require('./../src/images/button3_320.png')} style ={{borderRadius: 10 , width: Dimensions.get('window').width / 100 * 40 , height:80 , marginLeft:10}}>
                                                                                          <Image source={require('./../src/images/icon8_160.png')} style ={{marginTop:10 , alignSelf:'center' , width:35 , height:30}}></Image>
                                                                                          <Text style={styles.loginText}>Complaint Management</Text>

                                                                                      </ImageBackground>


                                                                          </TouchableOpacity>

                                                                   </View>

                                         </View>                                     
                                              

                                                    

                                    </View>
                        </View>

                       
                                     <Image source={require('./../src/images/bottomleft/bottomleft.png')}
                                                    style={{ 
                                                    
                                                      width : 120 , 
                                                      height : 20 , 
                                                      margin: 5 , 
                                                      marginLeft:10 ,
                                                      position: 'absolute',
                                                    bottom:0,
                                                    left:0,}}></Image>

                                            <Image source={require('./../src/images/bottomright/bottomright.png')}
                                                    style={{ 
                                                      margin:5 ,
                                                      marginRight:10 ,
                                                      width : 62 , 
                                                      height : 30 , 
                                                      position: 'absolute',
                                                    bottom:0,
                                                    right:0,}}></Image>


                            
                                            
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
          height: Dimensions.get('window').height / 100 * 20 ,
          backgroundColor:'#FFFFFF',
          borderRadius:5,
          borderWidth: 1,
          borderColor: '#fff' , 
        
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