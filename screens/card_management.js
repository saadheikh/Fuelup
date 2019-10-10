import React from 'react';
import { Button , View, Text ,Image, ImageBackground , ActivityIndicator , StyleSheet,Alert,AsyncStorage , TouchableOpacity , StatusBar, Switch, Dimensions} from 'react-native';
import { Card } from 'react-native-elements';

import { BackHandler } from 'react-native';
import userdata from './model/otpdata';


export default class card_management extends React.Component {
  state = {isSwitchOn: false}
  constructor(props){
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state={
      fontLoaded:false ,
      accountwidth: '100%' ,
      accountheight: 100 ,
      limitwidth: 0 ,
      limitheight:0 ,
      frequencywidth:0,
      frequencyheight:0 ,
      accopacity: '100%',
      limitopacity: 0 ,
      frequencyopacity : 0 ,
      acccolor : '#FF4500',
      limitcolor:'orange' ,
      frequencycolor:'orange',
      title:"Account Details",
      cardNo : '' ,
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
      cardLimit : '',
      totalTransaction: '' ,
      dailytrans: '',
      weeklytransaction :'' ,
      monthlytransaction :'' ,
      nonfuelmonthly:'' ,
      dailyfuel :'',
      weeklyfuel:'' ,
      days_allowrd :'',
      tokennumber :'' ,
      isLoading : true 

    }
    
}


_retrieveData = async () => {
  console.log("called" , "calledoncards")
  try {
    const value = await AsyncStorage.getItem('tokenNo');
    if (value !== null) {
      console.log("token_in_transaction" ,value);
      this.setState({
        tokennumber : value ,
      })
      // We have data!!
      this.getInfo()
    // this.getDatafromClass()
    }
    else{
      alert("Empty")
    }
  } catch (error) {
    alert(error)
    // Error retrieving data
  }
};


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
     alert(userdata.getCard_name())
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
       

       
       totalTransaction : userdata.getTransaction_Limit() ,
       dailytrans : userdata.getDaily_Trans(),
       weeklytransaction : userdata.getWeekly_Trans() ,
       monthlytransaction : userdata.getMonthly_Type() ,


       nonfuelmonthly : userdata.getNon_Fuel(),
       dailyfuel : userdata.getDaily_Fuel(),
       weeklyfuel : userdata.getWeekly_Fuel() ,
       days_allowrd : userdata.getDays_Allowed() ,
       isLoading:false 
  
   })
  }
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


cardActivate = async () => {
try{

 // let response = await fetch (`http://172.191.1.137:8080/AGCM_PROD/AG_Servlet/FUEL?messageType=CARD_STATUS_UPDATE&channel=Mobile&msisdn=03212556100&imei=90909090&identity=03212556100&cardNo=8096160900000043&currentStatus=A&newStatus=I&tokenNo=${this.state.tokennumber}`)
 let response = await fetch (`http://172.191.1.137:8080/AGCM_PROD/AG_Servlet/FUEL?messageType=CARD_STATUS_UPDATE&channel=Mobile&msisdn=03212556100&imei=90909090&identity=03212556100&cardNo=8096160900000043&currentStatus=A&newStatus=I&tokenNo=191009101420102047`)
  
 
 const completeresponse = await response.json();
  console.log("activatereposnse" , completeresponse)
  if(completeresponse.code == '0000'){
    alert(completeresponse.detailMessage)
  }
  else {
    alert(completeresponse.detailMessage)
  }

}
catch(error){
  alert(error)
}


}


carddeActivate = async () => {
  try{
  
    let response = await fetch (`http://172.191.1.137:8080/AGCM_PROD/AG_Servlet/FUEL?messageType=CARD_STATUS_UPDATE&channel=Mobile&msisdn=03212556100&imei=90909090&identity=03212556100&cardNo=8096160900000043&currentStatus=I&newStatus=A&tokenNo=${this.state.tokennumber}`)
    const completeresponse = await response.json();
    console.log("activatereposnse" , completeresponse)
    if(completeresponse.code == '0000'){
      alert(completeresponse.detailMessage)
    }
    else {
      alert(completeresponse.detailMessage)
    }
  }
  catch(error){
    alert(error)
  }
  
  
  }

getInfo = async ()=> {

  try {
    console.log("called" , "called");
    let response = await  fetch(`http://172.191.1.137:8080/AGCM_PROD/AG_Servlet/FUEL?messageType=OTP_VERIFICATION_FUEL&identity=03212556100&imei=90909090&channel=Mobile&msisdn=03212556100&otp=1111&cardNo=8096160900000043&tokenNo=${this.state.tokennumber}`)
      const completeresonse =  await response.json() ;
      console.log("called" , completeresonse);
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
                      accountNo : completeresonse.additonalData.cardprofile[0].accNo,
                      cardNo : completeresonse.additonalData.cardprofile[0].cardNo ,
                      cardLimit : completeresonse.additonalData.cardprofile[0].txnLimit ,


                      totalTransaction : completeresonse.additonalData.cardprofile[0].txnLimit ,
                      dailytrans : completeresonse.additonalData.cardprofile[0].dailyLimit,
                      weeklytransaction : completeresonse.additonalData.cardprofile[0].weeklyLimit ,
                      monthlytransaction : completeresonse.additonalData.cardprofile[0].monthlyLimit ,


                      nonfuelmonthly : completeresonse.additonalData.cardprofile[0].nonfuelMonthlyLimit ,
                      dailyfuel : completeresonse.additonalData.cardprofile[0].dailyFreqLimit,
                      weeklyfuel : completeresonse.additonalData.cardprofile[0].dailyFreqLimit ,
                      days_allowrd : completeresonse.additonalData.cardprofile[0].daysAllowed ,
                      isLoading:false 



                })

                if(this.state.cardStatus == 'Inactive'){
                  this.setState({
                    switchValue: false
                  })
                }
                else{
                  this.setState({
                    switchValue: true
                  })
                }
          }

          else if (completeresonse.code == '5018') {
            this.setState({
              isLoading : false 

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
              isLoading : false 

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
      isLoading : false 

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

getRequestCardStatement = async ()=> {

  const url = this.getRequestCardStatuswithParam(this.state.tokennumber,this.state.currentStatus,this.state.newStatus)
  return fetch(url)

  .then(response => response.json())

  .then(responseData =>{
    
     console.log(responseData)

     const responseCode = responseData.code

     if (responseCode == "0000"){
     //Success Case

      alert(responseData.detailMessage)
      Alert.alert(
        responseData.description,
        responseData.detailMessage, 
        [
           { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      );

     }else if (responseCode == "5018"){
     //Session Expire Case
     // alert(responseData.detailMessage)

      Alert.alert(
        responseData.description,
        responseData.detailMessage, 
        [
         // { text: 'OK', onPress: () => this.props.navigation.navigate('Testing') },
         
           { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      );

     }else if (responseCode == "2222"){

      // General Error case 
      Alert.alert(
        responseData.description,
        responseData.detailMessage, 
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      );

     }

    }
  ).done();
}


getRequestCardStatuswithParam(currentStatus,NewStatus){

  
  const baseUrl = "http://172.191.1.137:8080/AGCM_PROD/AG_Servlet/FUEL?messageType=CARD_STATUS_UPDATE&channel=Mobile";
  const param = `&msisdn=03212556100&imei=90909090&identity=03212556100&cardNo=8096160900000043&currentStatus=${currentStatus}&newStatus=${NewStatus}&tokenNo=${this.state.tokennumber}`;
  return `${baseUrl}${param}`;

}

  static navigationOptions ={
    header: null ,
    title : 'Card Management',
    headerTitleStyle: { alignSelf: 'center'  , textAlign:'center' , justifyContent:'center'  , color:'#FF4500'},
    headerStyle: {
      backgroundColor: '#FFFFFF'
    },
};


onAccountpress = () => {

  this.state.limitwidth =0
  this.state.limitheight = 0
  this.state.frequencyheight = 0
  this.state.frequencywidth = 0
  this.state.frequencyopacity = 0
  this.state.limitcolor = 'orange'
  this.state.frequencycolor ='orange'
  this.state.acccolor = "#FF4500"
  this.state.title= "Account Details"

  if(this.state.accountwidth == 0 || this.state.accountheight == 0 ){
    this.setState({
      accountwidth: '100%',
      accountheight:100
    })
  }
  else{
    this.setState({
      accountwidth: 0,
      accountwidth:0
    })
  }
  
}

onlimitPress = () => {

  this.state.accountwidth = 0
  this.state.accountheight = 0 
  this.state.frequencyheight = 0
  this.state.frequencywidth = 0
  this.state.frequencyopacity = 0 
  this.state.limitcolor = '#FF4500'
  this.state.frequencycolor ='orange'
  this.state.acccolor = "orange"
  this.state.title= "Limit Details"

  if(this.state.limitwidth == 0 || this.state.limitheight == 0){
    this.setState({
      limitwidth: '100%' ,
      limitheight: 100
    })
  }
  else{
    this.setState({
      limitwidth: 0 ,
      limitheight: 0
    })
  }
  
}

onfrequencyPress = () => {

  this.state.accountwidth = 0
  this.state.accountheight = 0 
  this.state.limitwidth =0
  this.state.limitheight = 0
  this.state.limitcolor = 'orange'
  this.state.frequencycolor ='#FF4500'
  this.state.acccolor = "orange" 
  this.state.title= "Frequency Details"

  if(this.state.frequencywidth == 0 || this.state.frequencyheight == 0){
    this.setState({
      frequencywidth: '100%' , 
      frequencyheight : 100
    })
  }
  else{
    this.setState({
      frequencywidth: 0 , 
      frequencyheight : 0
    })
  }
  
}

state = {switchValue:false}
  toggleSwitch = (value) => {
    // if (this.state.cardStatus == 'Inactive') {
    //   this.setState({
    //     switchValue : true
    //   })
      
    // }
    // else{
    //   this.setState({
    //     switchValue : false
    //   })
    //onValueChange of the switch this function will be called
      this.setState({switchValue: value})
      if (value){
        this.carddeActivate()
      console.log(value)
      }
      else{
        this.cardActivate()
        console.log(value)
    }
      //onValueChange of the switch this function will be called
      // this.setState({switchValue: value})
      // if (value){
      // console.log(value)
      // }
      // else{
      //   console.log(value)

        
      // }
      
      //state changes according to switch
      //which will result in re-render the text
   }

   onAccountDetails =() => {

    this.state.account_opacity = 0
      alert("opacity ="  + this.state.account_opacity)
  } 
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20 , justifyContent:'center'}}>
          <ActivityIndicator color='#FF4500' size="large"  />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 , flexDirection:'column'}}>
             <StatusBar barStyle={'light-content'} backgroundColor ={'#E14126'} translucent={false} /> 
                  <View style={{flex:2 , flexDirection:'column'}}>

                              <ImageBackground source={require('./../src/images/Background2_hori.png')} style={{width:'100%' , height:60 , justifyContent:'center'}}>
                                        <View style={{height:100 ,flex:1 , flexDirection:'row' , justifyContent:'space-between' ,marginTop:5}}>
                                                <TouchableOpacity onPress={() =>this.props.navigation.goBack()}>
                                                      <Image source={require('./../src/images/arrow_160.png')}
                                                            style={{
                                                              marginTop:5 , 
                                                              marginLeft:20 ,
                                                              width : 30 , 
                                                              height : 30 ,  }}>

                                                      </Image>
                                                  </TouchableOpacity>
                                      
                                                  <Text style={{fontSize:25 , color:'white'}}>Card Management</Text>
                            
                                        
                                                  
                                        <View style={{flexDirection:'row'}}>
                                                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Signup')}>
                                                      <Image source={require('./../src/images/bell_160.png')}
                                                          style={{ marginTop:10 ,
                                                                marginLeft:20 ,
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
                                                </ImageBackground>
                          
                          <View style={{justifyContent:'center' , alignContent:'center' , flexDirection:'row'}}>
                               <Text style={{justifyContent:'center' , fontSize:15 , color:'black' , fontWeight:'bold' , alignItems:'center' , alignSelf:'center' , marginTop:10,}}>Card is:</Text>
                              <Text style={{justifyContent:'center' , fontSize:15 , color:'#FF4500' , fontWeight:'bold' , alignItems:'center' , alignSelf:'center' , marginTop:10, fontWeight:'bold'}}>{this.state.cardStatus}</Text>


                          </View>
                             
                              <TouchableOpacity
                                      opacity={0.1}  underlayColor='#fff'
                                      style={{ marginTop:10 ,
                                        width:Dimensions.get('window').width / 100 * 90 , 
                                        justifyContent:'center' , alignSelf:'center' ,
                                        height:Dimensions.get('window').height / 100 * 30,
                                      backgroundColor:'#ffffff',
                                      borderRadius:15,
                                      borderWidth: 1,
                                      borderColor: '#ffffff' }}>

                                      <Image source={require('./../src/images/card.jpg')}
                                                          style={{ 
                                                            width : '100%' , 
                                                                height : '100%' , 
                                                              
                                                              }}>
                                                      </Image>

                                    </TouchableOpacity>

                                <View style={{flexDirection:'row' , marginLeft:35 , marginRight:35 , padding:5 ,marginTop:10}}>
                                    <Text> {this.state.switchValue?'Activated':'Deactivated'}</Text>
                    
                                      <Switch
                                  style={{width:50 , height:30 , backfaceVisibility:'orange' , marginBottom:20 ,  right:0 , position:'absolute'}}
                                
                                  onValueChange = {this.toggleSwitch}
                                  value = {this.state.switchValue}/>
                      
                          
                              </View>
                            
                            <View  style={{flexDirection: 'row' , justifyContent:'space-between' , marginTop:10 , marginRight:10 , marginLeft:10}}>
                                      <TouchableOpacity
                                                style={{height:25, backgroundColor:this.state.acccolor, borderRadius:5 , marginTop:5 , flex:1}}
                                                onPress={this.onAccountpress}
                                                underlayColor='#fff'>
                                                    <Text style={styles.loginText}>Acount Details</Text>

                                        </TouchableOpacity>

                                            <TouchableOpacity
                                              style={{height:25 ,backgroundColor:this.state.limitcolor, borderRadius:5 , marginTop:5 , flex:1 , marginLeft:5 , marginRight:5 }}
                                                onPress={this.onlimitPress}
                                                underlayColor='#fff'>
                                                    <Text style={styles.loginText}>Limit Details</Text>

                                        </TouchableOpacity>
                                        <TouchableOpacity
                                                style={{ height:25 , backgroundColor:this.state.frequencycolor, borderRadius:5 , marginTop:5 , flex:1}}
                                                onPress={this.onfrequencyPress}
                                                underlayColor='#fff'>
                                                    <Text h style={styles.loginText}>Fq. Details</Text>

                                        </TouchableOpacity>
                                </View>


                  </View>

                  <View style={{flex:1}}>


                 
                  </View>
              
                  <View style={{flex:1}}>
                  <View >        
                          <Card  title= {this.state.title} 
                                  titleStyle = {{color:'#FF4500'}}
                                      style={{backgroundColor:'white' }}>
                                        
                                        <View
                                          style={{flexDirection:'row' , justifyContent:'space-between',height:this.state.accountheight , width:this.state.accountwidth}}>
                                          
                                                <View style={{flexDirection: "column" }}>
                                                      <Text>Account No.</Text>
                                                      <Text>Mobile number</Text>
                                                      <Text>Card Type</Text>
                                                      <Text>Limit Type</Text>

                                                </View>

                                                <View style={{flexDirection: "column" }}>
                                                    <Text style={{color:'#FF4500' , fontWeight:'bold'}}>{this.state.accountNo}</Text>
                                                    <Text style={{color:'#FF4500' , fontWeight:'bold'}}>{this.state.cardNo}</Text>
                                                    <Text style={{color:'#FF4500' , fontWeight:'bold'}}>{this.state.cardType}</Text>
                                                    <Text style={{color:'#FF4500' , fontWeight:'bold'}}>{this.state.cardLimit}</Text>

                                                </View>

                                        </View>

                                        <View
                                          style={{flexDirection:'row' , justifyContent:'space-between' , width:this.state.limitwidth , height:this.state.limitheight}}>
                                                <View  style={{flexDirection:'column'}}>
                                                    <Text style={{color:'white'}}></Text>
                                                          <Text style={{marginTop:10}}>Transaction Limit</Text>
                                                          <Text>Daily</Text>
                                                          <Text>Weekly</Text> 
                                                          <Text>Monthly</Text>
                                                      </View>

                                                      <View style={{flexDirection:'column'}}>
                                                          <Text style={{fontWeight:'bold'}}>Allowed</Text>
                                                          <Text style={{marginTop:10 , justifyContent:'center' , alignSelf:'flex-end' ,color:'#FF4500' , fontWeight:'bold'}}>{this.state.totalTransaction}</Text>
                                                        
                                                          <Text style={{ justifyContent:'center' , alignSelf:'flex-end' ,color:'#FF4500' , fontWeight:'bold'}}>{this.state.dailytrans}</Text>
                                                          <Text style={{justifyContent:'center' , alignSelf:'flex-end' ,color:'#FF4500' , fontWeight:'bold'}}>{this.state.weeklytransaction}</Text>
                                                          <Text style={{justifyContent:'center' , alignSelf:'flex-end' ,color:'#FF4500' , fontWeight:'bold'}}>{this.state.monthlytransaction}</Text>
                                                      </View>

                                                      
                                                      {/* <View  style={{flexDirection:'column'}}>
                                                          <Text style={{fontWeight:'bold' , }}>Consumed</Text>
                                                          <Text style={{marginTop:10 , justifyContent:'center' , alignSelf:'flex-end' ,color:'#FF4500' , fontWeight:'bold'}}>10,000</Text>
                                                        
                                                          <Text style={{ justifyContent:'center' , alignSelf:'flex-end' ,color:'#FF4500' , fontWeight:'bold'}}>3,000</Text>
                                                          <Text style={{justifyContent:'center' , alignSelf:'flex-end' ,color:'#FF4500' , fontWeight:'bold'}}>2,000</Text>
                                                          <Text style={{ justifyContent:'center' , alignSelf:'flex-end' ,color:'#FF4500' , fontWeight:'bold'}}>5,000</Text>
                                                      </View> */}
                                        </View>

                                        <View
                                          style={{flexDirection:'row', justifyContent:'space-between' , width:this.state.frequencywidth , height:this.state.frequencyheight}}>
                                            <View style={{flexDirection: "column" , marginLeft:10 }}>
                                                      <Text style={{color:'white'}}>Weelyly</Text>
                                                      <Text style={{marginTop:10}}>Non-fuel Monthly</Text>
                                                      <Text>Daily</Text>
                                                      <Text>Weelyly</Text>
                                                      <Text>Days Allowed</Text>

                                                </View>

                                                <View style={{flexDirection: "column" , marginRight:20 , justifyContent:'center' , alignSelf:'center' , alignItems:'center' }}>
                                                  <Text style={{justifyContent:'center'}}>Allowed</Text>
                                                    <Text style={{color:'#FF4500' , fontWeight:'bold' , marginTop:10 , alignSelf:'flex-end'}}>{this.state.totalTransaction}</Text>
                                                    <Text style={{color:'#FF4500' , fontWeight:'bold' , alignSelf:'flex-end'}}>{this.state.dailyfuel}</Text>
                                                    <Text style={{color:'#FF4500' , fontWeight:'bold' , alignSelf:'flex-end'}}>{this.state.weeklyfuel}</Text>
                                                    <Text style={{color:'#FF4500' , fontWeight:'bold' , alignSelf:'flex-end'}}>{this.state.days_allowrd}</Text>

                                                </View>
                                        </View>
                                      
                            </Card>
                          </View>

                  </View>
                        
                            
                  <View style={{flex:1 , flexDirection:'row'}}>

                        <Image 
                                                      source={require('./../src/images/dp_160.png')}
                                                      style={{ 
                                                      width : 120 , 
                                                      height : 20 , 
                                                      margin: 5 , 
                                                      marginLeft:10 ,
                                                      position: 'absolute',
                                                      bottom:0,
                                                      left:0,}}>

                                            </Image>

                                            <Image 
                                                      source={require('./../src/images/access_logo.png')}
                                                      style={{ 
                                                      margin:5 ,
                                                      marginRight:10 ,
                                                      width : 62 , 
                                                      height : 30 , 
                                                      position: 'absolute',
                                                      bottom:0,
                                                      right:0,}}>

                                            </Image>

                        </View>
       
                   

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
       width: 320 ,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#FF4500',
        borderRadius:5,
        borderWidth: 1,
        borderColor: '#fff'
      },
      
      cardview:{
        marginRight:25,
        marginLeft:25,
       marginTop:10,
       width: 320 ,
       height:200 ,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#d3d3d3',
        borderRadius:15,
        borderWidth: 1,
        borderColor: '#d3d3d3'
      },

      loginText:{
        fontSize: 12 ,
        marginTop:3 , 
          color:'#FFffff',
          textAlign:'center',
          paddingLeft : 10,
          paddingRight : 10
      } ,
       container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    backgroundColor: '#ecf0f1',
  },
  MainContainer :{
 
    // Setting up View inside content in Vertically center.
    justifyContent: 'center',
    flex:1,
    margin: 10
     
    }
});