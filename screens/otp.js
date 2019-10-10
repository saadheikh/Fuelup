import React from 'react';
import { Button , View, Text , TextInput,ActivityIndicator , StyleSheet, Alert , TouchableOpacity , StatusBar , Image , Keyboard , Dimensions} from 'react-native';
import userdata from './model/otpdata' ;
import { BackHandler } from 'react-native';



export default class otp extends React.Component {
    static navigationOptions ={
        header: null
        
    };

    constructor(props){
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

        this.state= {
            CardNumber : '' ,
            MobileNumber : '',
            OtpNumber1 :'' ,
            OtpNumber2 :'' ,
            OtpNumber3 :'' ,
            OtpNumber4 :'' ,
          
        };

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



//function for checking if textinput are empty
    checkifempty =() =>{
        if (this.state.OtpNumber1 != '') {
          if(this.state.OtpNumber2 != ''){
            if(this.state.OtpNumber3 != ''){
              if(this.state.OtpNumber4!= ''){
                  this.props.navigation.navigate('Testing')
              }
              else{
                alert('Please Enter Otp4 Number');
              }
            }
            else{alert('Please Enter Otp3 Number');}
          }
          else{alert('Please Enter Otp2 Number');}
          
          } else {
            alert('Please Enter Otp1 Number');
          }


    };

    newotpchecking = async () => {
      this.setState({isLoading : true });
  
      try{
      
       // let response = await fetch (`http://172.191.1.137:8080/AGCM_PROD/AG_Servlet/FUEL?messageType=OTP_VERIFICATION_FUEL&identity=03212556100&imei=90909090&channel=Mobile&msisdn=03212556100&otp=1111&cardNo=8096160900000043&tokenNo=1909261146179171`)
       let response = await fetch (`http://172.191.1.137:8080/AGCM_PROD/AG_Servlet/FUEL?messageType=OTP_VERIFICATION_FUEL&identity=03212556100&imei=90909090&channel=Mobile&msisdn=03212556100&otp=1111&cardNo=8096160900000043`)
        
       
        const completeresponse = await response.json();
        console.log("activatereposnse" , completeresponse)
    
        if(completeresponse.code == '0000'){

                      var cardNo = completeresponse.additonalData.cardprofile[0].cardNo  ;
                      var cardname = completeresponse.additonalData.cardprofile[0].cardName ;
                      var avaibleBlnc = completeresponse.additonalData.cardprofile[0].monthlyBalance ;
                      var cardlimitype = completeresponse.additonalData.cardprofile[0].cardType ;
                      var loyalityPoint =  completeresponse.additonalData.cardprofile[0].availiableRewardPoints ;
                      var cardStatus = completeresponse.additonalData.cardprofile[0].cardStatus ;
                      var monthlyLimit = completeresponse.additonalData.cardprofile[0].monthlyLimit ;
                      var taxAmount = completeresponse.additonalData.cardprofile[0].lastTxnAmount ;
                      var taxName = completeresponse.additonalData.cardprofile[0].lastTxnMerName.substring(0,7) ;
                      var taxName1 = completeresponse.additonalData.cardprofile[0].lastTxnMerName.substring(7) ;
                      var taxDate = completeresponse.additonalData.cardprofile[0].lastTxnDate ;
                      var  taxTime = completeresponse.additonalData.cardprofile[0].lastTxnTime ;

                      userdata.setCard_Number(cardNo)
                      userdata.setCard_name(cardname)
                      userdata.setAvail_bln(avaibleBlnc)
                      userdata.setLimit_Type(cardlimitype)
                      userdata.setLoyality_points(loyalityPoint)
                      userdata.setCard_Status(cardStatus)
                      userdata.setMonthly_Type(monthlyLimit)
                      userdata.setTax_AMT(taxAmount)
                      userdata.setTax_Loc(taxName)
                      userdata.setTax_Name(taxName1)
                      userdata.setTax_Date(taxDate)
                      userdata.setTax_Time(taxTime)
                      userdata.setMobile_Number(completeresponse.additonalData.cardprofile[0].registeredMobile);

                      userdata.setTransaction_Limit(completeresponse.additonalData.cardprofile[0].txnLimit);
                      userdata.setDaily_Trans(completeresponse.additonalData.cardprofile[0].dailyLimit);
                      userdata.setWeely_Trans(completeresponse.additonalData.cardprofile[0].weeklyLimit);
                      userdata.setMonthly_Type(completeresponse.additonalData.cardprofile[0].monthlyLimit);

                      userdata.setNon_Fuel(completeresponse.additonalData.cardprofile[0].nonfuelMonthlyLimit);
                      userdata.setDaily_Fuel(completeresponse.additonalData.cardprofile[0].dailyFreqLimit);
                      userdata.setWeekly_Fuel(completeresponse.additonalData.cardprofile[0].weeklyFreqLimit);
                      userdata.setDays_Allowed(completeresponse.additonalData.cardprofile[0].daysAllowed);


                     // alert(userdata.getCard_Number())


          this.setState({
            isLoading : false,
         
         });
         
        

      
    
              this.props.navigation.navigate('Testing')
    
                     
                       // tokenNo : responseData.additonalData.userObject.tokenN
                 
          
        }
        else {
          alert(completeresponse.detailMessage)
        }
      
      }
      catch(error){
        alert(error)
      }
      
      
      }
    

    // checkifempty =() => {
    //   this.props.navigation.navigate('Testing')
    // };

    onTextChange = text => {
      this.setState({OtpNumber1 : text});
      if(text.length == 1){
        this.input2.focus()
      }
   }
   onTextChange1 = text => {
    this.setState({OtpNumber2 : text});
    if(text.length == 1){
      this.input3.focus()
    }
 }
 onTextChange2 = text => {
  this.setState({OtpNumber3 : text});
  if(text.length == 1){
    this.input4.focus()
  }
}
onTextChange3 = text => {
  this.setState({OtpNumber4 : text});
  if(text.length == 1){
    Keyboard.dismiss()
  }
}




    
    render() {
      if (this.state.isLoading) {
        return (
          <View style={{  flex: 1,
            justifyContent: 'center',
            flexDirection: 'column'
            }}>
            <ActivityIndicator color='#FF4500' size="large" style={{alignSelf : 'center'}} />
          </View>
        );
      }
      
      
      const {navigation} = this.props ;
      const mobilen0 = navigation.getParam('mobilen0' , "N/A");
      const cardNumber = navigation.getParam('cardn0' , "N/A");

      return (
        <View style={{flex:1}}>
                                             <TouchableOpacity onPress={() =>this.props.navigation.goBack()}>
                                                <Image source={require('./../src/images/orange_arrow/arrow.png')}
                                                      style={{
                                                        marginTop:15 , 
                                                        marginLeft:10 ,
                                                        width : 30 , 
                                                        height : 30 ,  }}>

                                                </Image>
                                            </TouchableOpacity>

       
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                                           
        <Text style={{fontSize:30 , marginBottom:50 , color :'#FF4500'}}>Validate Account</Text>
        <StatusBar hidden/>


<Text style={{color :'#FF4500' , alignSelf:'flex-start' ,marginStart:60}}>Enter Card Number</Text>
        <TextInput 
        style={{borderBottomColor:'#FF4500' , borderBottomWidth : 1 ,   width:Dimensions.get('window').width / 100 * 70 , marginTop:20}}
        //style={styles.etstyle}
        keyboardType = 'numeric'
        placeholder = "Card Number"
      
      //  onChangeText={CardNumber => this.setState({CardNumber})}
        //>{JSON.stringify(cardNumber).replace('"' ,'')}</TextInput>
        
        >8096160900000043</TextInput>
<Text style={{color :'#FF4500' , alignSelf:'flex-start' ,marginStart:60 , marginTop:20}}>Enter Card Number</Text>
        <TextInput 
        style={{borderBottomColor:'#FF4500' , borderBottomWidth : 1 , width:Dimensions.get('window').width / 100 * 70, marginTop:20}}
        //style={styles.etstyle}
        keyboardType = 'numeric'
        placeholder = "Card Number"
       
       // onChangeText={MobileNumber => this.setState({MobileNumber})}
       // >{JSON.stringify(mobilen0).replace('"' ,'')}</TextInput>
         >03212556100</TextInput>
       
        <Text style={{color :'#FF4500' , alignSelf:'flex-start' ,marginStart:60 , marginTop:20}}>Enter Otp Number</Text>
       
        <View style={{flexDirection: 'row' ,width:Dimensions.get('window').width / 100 * 70 , marginTop:20,  alignItems:'stretch'}}>

            <TextInput secureTextEntry={true} ref={input1 => this.input1 = input1} onSubmitEditing={() => this.input2.focus()} textAlign={'center'} onChangeText={this.onTextChange} maxLength={1} keyboardType = 'numeric' style={{width: 62.5,borderBottomColor:'#FF4500' , borderBottomWidth : 1 , marginRight:5 }} />
            <TextInput  secureTextEntry={true} ref={input2 => this.input2 = input2} onSubmitEditing={() => this.input3.focus()} textAlign={'center'}  onChangeText={this.onTextChange1} maxLength={1} keyboardType = 'numeric' style={{width: 62.5 ,borderBottomColor:'#FF4500' , borderBottomWidth : 1  , marginRight:5 , alignSelf:'center'}} />
            <TextInput secureTextEntry={true}  ref={input3 => this.input3 = input3} onSubmitEditing={() => this.input4.focus()} textAlign={'center'}  onChangeText={this.onTextChange2} maxLength={1} keyboardType = 'numeric' style={{width: 62.5 ,borderBottomColor:'#FF4500' , borderBottomWidth : 1  , marginRight : 5 , alignSelf:'center'}}/>
            <TextInput secureTextEntry={true}  ref={input4 => this.input4 = input4} textAlign={'center'}  onChangeText={this.onTextChange3}maxLength={1} keyboardType = 'numeric' style={{width: 62.5 ,borderBottomColor:'#FF4500' , borderBottomWidth : 1  , alignSelf:'center'}}/>
     
      </View>
      
        
         <View style={{width : "80%" , marginTop: 90}}>
      

<TouchableOpacity
          style={styles.loginScreenButton}
          onPress={this.newotpchecking}
          underlayColor='#fff'>
          <Text style={styles.loginText}>Next</Text>

 </TouchableOpacity>
         </View>
      <Image source={require('./../src/images/dp_logo.png')}
         style={{ 
          width : 70 , 
          height : 20 , 
           margin: 5 , 
           marginLeft:10 ,
          position: 'absolute',
        bottom:0,
        left:0,}}></Image>

<Image source={require('./../src/images/access_logo.png')}
         style={{ 
           margin:5 ,
           marginRight:10 ,
           width : 60 , 
           height : 30 , 
          position: 'absolute',
        bottom:0,
        right:0,}}></Image>
        </View>
        </View>
      );
    }
  }


  const styles = StyleSheet.create({
    etstyle: {
         height: 35, 
         paddingLeft: 10 ,
         borderColor: 'gray',
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
          fontSize:20 ,
          backgroundColor:'#FF4500',
          borderRadius:5,
          borderWidth: 1,
          borderColor: '#fff'
        },
        loginText:{
            color:'#FFFFFF',
            textAlign:'center',
            paddingLeft : 10,
            fontSize:18 ,
            paddingRight : 10
        }
  });
  