OTP 

import React from 'react';
import { Button , View, Text , TextInput ,ActivityIndicator, 
  StyleSheet, Alert , TouchableOpacity , StatusBar , Image , 
  Keyboard , Dimensions , AsyncStorage} from 'react-native';

  import userdata from './../model/otpdata' ;

export default class newotp extends React.Component {
    static navigationOptions ={
        header: null
        
    };
    constructor(props){
      super(props);
      this.state= {
          CardNumber : '' ,
          MobileNumber : '',
          OtpNumber1 :'' ,
          OtpNumber2 :'' ,
          OtpNumber3 :'' ,
          OtpNumber4 :'' ,
          dataSource : [],
          TokenNo : '',
          isLoading : false,      
      };

  }

    componentDidMount(){
      const { params } = this.props.navigation.state;
          const mobilen0 = params ? params.mobilen0 : null;
          const cardNumber = params ? params.cardNo : null;
          const tokenNo = params ? params.tokenNo : null;
          console.log('tokennonewptp',tokenNo);
        // retrieveData = async () => {
        //     try {
        //       const value = await AsyncStorage.getItem('tokenNo');
        //       if (value !== null) {
        //         this.setState({
        //           TokenNo : value
        //         })
        //         // We have data!!
        //         console.log(value);
        //       }
        //       else{
        //         console.log("N/A");
        //         this.setState({
        //           name : "Guest mode"
        //         })
        //       }
        //      } catch (error) {
        //        console.log(error)
        //        // Error retrieving data
        //      }
        //   }
        const {navigation} = this.props ;

        this.setState({

          TokenNo:  JSON.stringify(navigation.getParam('tokenNo', 'N/A')) 

        })

        console.log('tokenotp',this.state.TokenNo);
         

        this.setState({TokenNo : navigation.getParam('tokenNo' , "N/A")});
        this.setState({CardNumber : navigation.getParam('cardn0','N/A')});
        this.setState({});


       
    }
    
    otpCall(){
        this.setState({isLoading : true });
        const url = this.getRequestwithParam(this.state.CardNumber,this.state.MobileNumber,this.state.TokenNo)
        console.log("newotp")
        return fetch(url)
        .then(response => response.json())
         .then(responseData =>{

          
 
            const responseCode = responseData.code
       
            if (responseCode == "0000"){


             // var cardnumber = userdata.setCard_Number( responseData.additonalData.cardprofile[0].cardNo) ;
                console.log("cardpn" ,responseData.additonalData.cardprofile[0].cardNo)
            
              AsyncStorage.setItem('tokenNo',tokennnn);
                       
            }
            else {
             
             this.setState({isLoading : false });
             this.props.navigation.navigate('Testing',
             {
               tokenNo : this.state.TokenNo,
             });
            }
           }
         ).done();
       }
      getRequestwithParam(cardNo,MobileNo,tokenNo){

        console.log(cardNo,MobileNo)
  
        const baseUrl = "http://172.191.1.137:8080/AGCM_PROD/AG_Servlet/FUEL?messageType=OTP_VERIFICATION_FUEL";
        const param = `&identity=${MobileNo}&imei=90909090&channel=Mobile&msisdn=${MobileNo}&otp=1111&cardNo=${cardNo}&tokenNo=${tokenNo}`;
        return `${baseUrl}${param}`;
  
      }

//function for checking if textinput are empty
    checkifempty =() =>{
        if (this.state.OtpNumber1 != '') {
          if(this.state.OtpNumber2 != ''){
            if(this.state.OtpNumber3 != ''){
              if(this.state.OtpNumber4!= ''){
                //this.props.navigation.navigate('KYC')       
                  this.otpCall();
                  
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

newotpchecking = async () => {
  this.setState({isLoading : true });
  var cardNo;
  try{
  
    let response = await fetch (`http://172.191.1.137:8080/AGCM_PROD/AG_Servlet/FUEL?messageType=OTP_VERIFICATION_FUEL&identity=03212556100&imei=90909090&channel=Mobile&msisdn=03212556100&otp=1111&cardNo=8096160900000043&tokenNo=1909261146179171`)
    const completeresponse = await response.json();
    console.log("activatereposnse" , completeresponse)

    if(completeresponse.code == '0000'){
      cardNo = completeresponse.additonalData.cardprofile[0].cardNo 
      this.setState({
        isLoading : false,
     
     });


     alert("yes")
     alert(userdata.setCard_Number(cardNo))
     console.log("cardnumbronotp" ,userdata.setCard_Number(cardNo) )
          

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




    
    render() { 

      // const {navigation} = this.props ;
      // const mobilen0 = navigation.getParam('mobilen0' , "03212556100");
      // const cardNumber = navigation.getParam('cardn0' , "8096160900000043");
      // const tokenn0 = navigation.getParam('MYTOKEN' , "N/A");
     console.log("underrender" , JSON.stringify(tokenn0));

        if (this.state.isLoading) {
            return (
              <View style={{  flex: 1,
                justifyContent: 'center',
                flexDirection: 'column'
                }}>
                <ActivityIndicator style={{alignSelf : 'center'}} />
              </View>
            );
          }
          
          // const {navigation} = this.props ;
          // const mobilen0 = navigation.getParam('mobilen0' , "N/A");
          // const cardNumber = navigation.getParam('cardn0' , "N/A");
      

      //this.setState({TokenNo : TokenNo});

      return (
        <View style={{flex:1}}>
                                             <TouchableOpacity onPress={() =>this.props.navigation.goBack()}>
                                                <Image source={require('./assets/arrow.png')}
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
        maxLength={16} 
       // onChangeText={CardNumber => this.setState({CardNumber})}
        // >{JSON.stringify().replace('"' ,'')}</TextInput>
      >8096160900000043</TextInput>


<Text style={{color :'#FF4500' , alignSelf:'flex-start' ,marginStart:60 , marginTop:20}}>Enter Mobile Number</Text>
        <TextInput 
        style={{borderBottomColor:'#FF4500' , borderBottomWidth : 1 , width:Dimensions.get('window').width / 100 * 70, marginTop:20}}
        //style={styles.etstyle}
        keyboardType = 'numeric'
        placeholder = "Card Number"
        maxLength={11} 
      //  onChangeText={MobileNumber => this.setState({MobileNumber})}
        // >{JSON.stringify(tokenn0).replace('"' ,'')}</TextInput>
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
          //onPress={this.otpCall}
          onPress={this.newotpchecking}
          underlayColor='#fff'>
          <Text style={styles.loginText}>Next</Text>

 </TouchableOpacity>
         </View>
      <Image source={require('./../../src/images/dp_logo.png')}
         style={{ 
          width : 70 , 
          height : 20 , 
           margin: 5 , 
           marginLeft:10 ,
          position: 'absolute',
        bottom:0,
        left:0,}}></Image>

<Image source={require('./../../src/images/access_logo.png')}
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