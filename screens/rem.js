import React, { Component } from 'react';
import { ImageBackground } from 'react-native';

//import react in our code.

import {
  StyleSheet,
  View,
  AsyncStorage,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView ,
} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { DatePickerDialog } from 'react-native-datepicker-dialog';
import moment from 'moment';
import { BackHandler } from 'react-native';


export default class rem  extends React.Component {

    static navigationOptions = {
        header : null
    }
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
        cnic : '',
        mother_name : '',
        place_of_birth : '',
        dataSource : [],
        showAlert: false,
        isLoading : true,
        alerts: [
            {'name': 'Licence Renewal', 'id': 1, 'date' : '10/12/2019','displaydate':'10/12/2019'},
            {'name': 'Vehicle Tax Date', 'id': 2, 'date' : '11/12/2019','displaydate':'11/12/2019'},
            {'name': 'Vehicle Insurance Date', 'id': 3, 'date' : '12/12/2019','displaydate':'12/12/2019'},
            {'name': 'Vehicle Tracker', 'id': 4, 'date' : '13/12/2019','displaydate':'13/12/2019'},
            {'name': 'Spark Plug replacement', 'id': 5, 'date' : '14/12/2019','displaydate':'14/12/2019'},
            {'name': 'Oil Change', 'id': 6, 'date' : '14/12/2019','displaydate':'14/12/2019'}
         ],
         mNo : '03212556100',
         tNo : '',
         cNo : '8096160900000043',
         dobText: '',
      dobDate: null,
      dobText : '',
      journeyText: '',
      journeyDate: null,
      currentIndex : '-1',
      };
  }

  componentDidMount(){

    this.getReminder()
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
  

  getReminder(){

    console.log(this.getReminderRequestParam(this.state.mNo,this.state.tNo,this.state.cNo))
    const url = this.getReminderRequestParam(this.state.mNo,this.state.tNo,this.state.cNo)
    return fetch(url)
  
    .then(response => response.json())
  
    .then(responseData =>{
    
      console.log(responseData)
      this.setState({isLoading : false});     
  if (responseData.code == "0000"){
    // 02 24 48
      this.update(0,responseData.additonalData.reminders[0].drivingLicence,responseData.additonalData.reminders[0].drivingLicence.substring(0,2)+'/'+responseData.additonalData.reminders[0].drivingLicence.substring(2,4)+'/'+responseData.additonalData.reminders[0].drivingLicence.substring(4,8));
      this.update(1,responseData.additonalData.reminders[0].vehicleTax,responseData.additonalData.reminders[0].vehicleTax.substring(0,2)+'/'+responseData.additonalData.reminders[0].vehicleTax.substring(2,4)+'/'+responseData.additonalData.reminders[0].vehicleTax.substring(4,8));
      this.update(2,responseData.additonalData.reminders[0].vehicleInsurance,responseData.additonalData.reminders[0].vehicleInsurance.substring(0,2)+'/'+responseData.additonalData.reminders[0].vehicleInsurance.substring(2,4)+'/'+responseData.additonalData.reminders[0].vehicleInsurance.substring(4,8));
      this.update(3,responseData.additonalData.reminders[0].vehicleInsurance,responseData.additonalData.reminders[0].vehicleInsurance.substring(0,2)+'/'+responseData.additonalData.reminders[0].vehicleInsurance.substring(2,4)+'/'+responseData.additonalData.reminders[0].vehicleInsurance.substring(4,8));
      this.update(4,responseData.additonalData.reminders[0].sparkPlug,responseData.additonalData.reminders[0].sparkPlug.substring(0,2)+'/'+responseData.additonalData.reminders[0].sparkPlug.substring(2,4)+'/'+responseData.additonalData.reminders[0].sparkPlug.substring(4,8));
      this.update(5,responseData.additonalData.reminders[0].oilChange,responseData.additonalData.reminders[0].oilChange.substring(0,2)+'/'+responseData.additonalData.reminders[0].oilChange.substring(2,4)+'/'+responseData.additonalData.reminders[0].oilChange.substring(4,8));
      // const newArray = [this.state.alerts];
      // newArray[1].date = responseData.additonalData.reminders[0].vehicleTax;
      // newArray[4].date = responseData.additonalData.reminders[0].sparkPlug;
      // newArray[5].date = responseData.additonalData.reminders[0].oilChange;
      // this.setState({alerts : newArray});
      // const oilChangeDate = responseData.additonalData.reminders[0].oilChange
      // console.log(oilChangeDate)
      // const sparkPlugChangeDate = responseData.additonalData.reminders[0].sparkPlug
      // console.log(sparkPlugChangeDate)
      // const VehicleTaxDate = responseData.additonalData.reminders[0].vehicleTax
      // console.log(VehicleTaxDate)
  
    // alert(
    //   responseData.description,
    //   responseData.detailMessage, 
  
     
    //   [
    //    // { text: 'OK', onPress: () => this.props.navigation.navigate('Testing') },
       
    //      { text: 'OK', onPress: () => console.log('OK Pressed') },
    //   ],
    //   { cancelable: false }
    // );
     
  } else if (responseData.code == "5018"){
  
    alert(
      responseData.description,
      responseData.detailMessage, 
      [
       // { text: 'OK', onPress: () => this.props.navigation.navigate('Testing') },
       
         { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false }
    );
  }else if (responseData.code == "2222"){
    alert(
      responseData.description,
      responseData.detailMessage, 
      [
       // { text: 'OK', onPress: () => this.props.navigation.navigate('Testing') },
       
         { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false }
    );
  }
  
      }
    ).
    catch((error) => {
       console.error("catch"+error);
       }).done();
    
  
  }
  getReminderRequestParam(MobileNo,tokenNo,cardNo){
      
    console.log(MobileNo,tokenNo,cardNo)
    const baseUrl = "http://172.191.1.137:8080/AGCM_PROD/AG_Servlet/FUEL?messageType=GET_REMINDERS";
    const param = `&msisdn=${MobileNo}&imei=90909090&channel=Mobile&identity=${MobileNo}&cardNo=${cardNo}&tokenNo=${tokenNo}`;
    return `${baseUrl}${param}`;

  }
  setReminder(){
    this.setState({isLoading : true});
    console.log(this.setReminderRequestParam(this.state.mNo,this.state.tNo,this.state.cNo))
    const url = this.setReminderRequestParam(this.state.mNo,this.state.tNo,this.state.cNo)
    return fetch(url)
  
    .then(response => response.json())
  
    .then(responseData =>{
      this.setState({isLoading : false});
      console.log(responseData)
     
  if (responseData.code == "0000"){

    alert(
     'Reminders has been updated' ,
      'Reminders has been updated', )
  
     
    //   [
    //    // { text: 'OK', onPress: () => this.props.navigation.navigate('Testing') },
       
    //      { text: 'OK', onPress: () => console.log('OK Pressed') },
    //   ],
    //   { cancelable: false }
    // );
     
  } else if (responseData.code == "5018"){
  
    alert(
      responseData.description,
      responseData.detailMessage, 
      [
       // { text: 'OK', onPress: () => this.props.navigation.navigate('Testing') },
       
         { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false }
    );
  }else if (responseData.code == "2222"){
    alert(
      responseData.description,
      responseData.detailMessage, 
      [
       // { text: 'OK', onPress: () => this.props.navigation.navigate('Testing') },
       
         { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false }
    );
  }
  
      }
    ).done();
  }
  setReminderRequestParam(MobileNo,tokenNo,cardNo){
    //http://localhost:8080/AGCM_PROD/AG_Servlet/FUEL?messageType=SET_REMINDERS&msisdn=03333002120&imei=909090940&channel=Mobile&identity=03333002120&cardNo=8096150900000028&tokenNo=19100404175310533&vehTax=19102019&sparkPlug=20102019  
    console.log(MobileNo,tokenNo,cardNo)
    const baseUrl = "http://172.191.1.137:8080/AGCM_PROD/AG_Servlet/FUEL?messageType=SET_REMINDERS";
    const param = `&msisdn=${MobileNo}&imei=90909090&channel=Mobile&identity=${MobileNo}&cardNo=${cardNo}&tokenNo=${tokenNo}&vehTax=${this.state.alerts[1].date}&sparkPlug=${this.state.alerts[4].date}&licence=${this.state.alerts[0].date}&oilChange=${this.state.alerts[5].date}&vehInsurance=${this.state.alerts[2].date}&vehTracker=${this.state.alerts[3].date}`;
    return `${baseUrl}${param}`;

  }

  alertItemName = (item) => {
    
    alert(item.name)
 }

 update = (index,text,text2)=>{
  const newArray = [...this.state.alerts];
  newArray[index].date = text;
  newArray[index].displaydate = text2;
  this.setState({ available: newArray });
 }

 
 onDOBPress = (index) => {
  let dobDate = this.state.dobDate;

  if(!dobDate || dobDate == null){
    dobDate = new Date();
    this.setState({
      dobDate: dobDate
    });
  }
  this.state.currentIndex = index;
  //To open the dialog
  this.refs.dobDialog.open({
    date: dobDate,
    maxDate: new Date(2050, 4, 25), //To restirct future date
  });

}

/**
 * Call back for dob date picked event
 *
 */
onDOBDatePicked = (date) => {
  this.setState({
    dobDate: date,
    dobText: moment(date).format('DDMMYYYY'),
  });
  this.update(this.state.currentIndex,this.state.dobText,moment(date).format('DD/MM/YYYY'));
}



  render() {
      if (this.state.isLoading) {
        return (
          <View style={{ flex: 1}}>
            <ActivityIndicator />
          </View>
        );
      }
     
    return (
      <View style={styles.MainContainer}>
          <ImageBackground source={require('./../src/images/background.png')} style={styles.ImageBackground}>
          <Text style={styles.HeaderText}>
              Reminders
          </Text>
          <ScrollView style = {styles.ScrollViewStyle}>
               {
                 //this.onDOBPress.bind(this)
                  this.state.alerts.map((item, index) => (
                     <TouchableOpacity key = {item.id} style = {styles.item} onPress = {()=>this.onDOBPress(index)}>
                        <Text>{item.name}</Text>
                        <Text>{item.displaydate}</Text>
                     </TouchableOpacity>
                  ))
               }
            </ScrollView>
        <TouchableOpacity
          onPress={()=>this.setReminder()}
          style={styles.button}>
          <Text style={styles.buttonText}> SUBMIT </Text>
        </TouchableOpacity>
        </ImageBackground>
        {/* Place the dialog component at end of your views and assign the references, event handlers to it.*/}
        <DatePickerDialog ref="dobDialog" onDatePicked={this.onDOBDatePicked.bind(this)} />
    
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  ImageBackground:{
    alignItems:'center',
    width: '100%', 
    height: '100%'
},
  HeaderText: {
    textAlign: 'center',
    fontSize : 25,
    color : '#FFFFFF',
    top:0,
    position : 'absolute',
    marginTop : 40,
    width : '100%',
    fontWeight : 'bold',
    
  },
  ScrollViewStyle:{  
    width : '100%',  
    padding: 10,
    position : 'absolute',
    bottom : 0,
    top : 0,
    marginTop : 90,
    marginBottom : 80,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    margin: 2,
    borderColor: '#FF4500',
    borderWidth: 1,
    borderRadius : 10,
    backgroundColor: '#FFFFFF'
 },
  button: {
    width: '40%',
    height: 40,
    padding: 10,
    backgroundColor: '#ffffff',
    marginTop: 10,
    position : 'absolute',
    bottom : 0,
    marginBottom : 20,
    borderRadius : 10,
  },

  buttonText: {
    color: '#FF4500',
    textAlign: 'center',
  },

  textOne: {
    fontSize: 20,
    color : '#FFFFFF',
    width : '100%',
    marginTop : 100,
    paddingLeft : 20,

    
  },
  textTwo: {
    fontSize: 20,
    color : '#FFFFFF',
    width : '100%',
    paddingLeft : 20,
    marginTop : 10,
    
  },
  textThree: {
    fontSize: 20,
    color : '#FFFFFF',
    width : '100%',
    paddingLeft : 20,
    marginTop : 10,   
  },
  dateText:{
      alignSelf : 'flex-end'
  }
});