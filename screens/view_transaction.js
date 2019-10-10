
import React from 'react';
import { Button , FlatList , View, Text , Image, ImageBackground, ActivityIndicator, AsyncStorage, Alert,Platform , StyleSheet , TouchableOpacity , StatusBar , Dimensions, ScrollView} from 'react-native';
import {Card , CardItem} from 'react-native-elements' ;
import { BackHandler } from 'react-native';

export default class view_transaction extends React.Component {

  constructor(props){
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state={
        trans_date : '' ,
        trans_time : '' ,
        trans_amount : '' ,
        merchantname : '' ,
        dateSource : [] ,
        tokennumber : '',
        isLoading : true



    }
   
  }

  _retrieveData = async () => {
    console.log("called" , "tokenintransac")
    try {
      const value = await AsyncStorage.getItem('tokenNo');
      if (value !== null) {
        console.log("token_in_transaction" ,value);
        this.setState({
          tokennumber : value ,
        })
        // We have data!!
        this.Transations()
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

  static navigationOptions ={
    header:null ,
    drawerLockMode: 'locked-closed' ,
    title : 'View Transaction',
    headerTitleStyle: { alignSelf: 'center'  , textAlign:'center' , justifyContent:'center'  , color:'#FF4500'},
    headerStyle: {
      backgroundColor: '#FFFFFF'
    },
};

Transations = async ()=> {

  console.log("yes")

  try {
    console.log("called" , "called");
    let response = await  fetch(`http://172.191.1.137:8080/AGCM_PROD/AG_Servlet/FUEL?messageType=MINISTATEMENT_FUEL&msisdn=03212556100&imei=90909090&channel=Mobile&cardNo=8096160900000043&identity=03212556100&tokenNo=${this.state.tokennumber}`)
      const completeresonse =  await response.json() ;
      console.log("completerespons" , completeresonse.code)

        if(completeresonse.code == '0000')
          {
              const data = completeresonse.additonalData.ministatement ;

              this.setState({
                dataSource : data ,
                isLoading : false
              })

              // for(i = 0  ; i < data.length ; i++) {
              //   this.setState({
              //       trans_date:  data.txnDate ,
              //       trans_time: data.txnTime  ,
              //       trans_amount : data.txnAmount ,
              //       merchantname : data.merchantName  ,
              //       dateSource : data 

              //   })

              // }
                
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


  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20 , justifyContent:'center'}}>
          <ActivityIndicator color='#FF4500' size="large"  />
        </View>
      );
    }
    return (
      <View style={{ flex: 1}}>
        <StatusBar hidden={false} />
          
        <StatusBar barStyle={'light-content'} backgroundColor ={'#E14126'} translucent={false} /> 
        
                       <ImageBackground source={require('./../src/images/header_160.png')} style={{width:'100%' , height:60 , justifyContent:'center'}}>
                            <ImageBackground source={require('./../src/images/strip/strip.png')} style={{width:'100%' ,height:50 ,alignSelf:'center'}}>
                                           
                              <View style={{height:100  ,flex:1 , flexDirection:'row' , justifyContent:'space-between' , marginTop:5}}>
                                           
                                          <TouchableOpacity onPress={() =>this.props.navigation.goBack()}>
                                                <Image source={require('./../src/images/white_arow/arrow.png')}
                                                      style={{
                                                        marginTop:5 , 
                                                        marginLeft:20 ,
                                                        width : 30 , 
                                                        height : 30 ,  }}>

                                                </Image>
                                            </TouchableOpacity>
                                
                                            <Text style={{fontSize:25 , color:'white'}}>Transactions</Text>
                       
                                            <View style={{flexDirection:'row'}}>
                                               <TouchableOpacity onPress={()=>this.props.navigation.navigate('Signup')}>
                                                <Image source={require('./../src/images/bell/bell.png')}
                                                    style={{ marginTop:10 ,
                                                          marginLeft:20 ,
                                                            width : 20 , 
                                                          height : 20 , 
                                                                                                                  }}>
                                                </Image>
                                              </TouchableOpacity>

                                             <TouchableOpacity onPress={()=>this.props.navigation.navigate('Signup')}>
                                                <Image source={require('./../src/images/switch/switch.png')}
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

                 <Card style={{height:500}}> 

                  <View style={{flexDirection:'row' , justifyContent:'space-around'}}>
                                   <View style={styles.container}>
                                    <View style={styles.progressLayer}></View>
                                         </View>


                       <View style={{flexDirection:'column'}}>
            
                              <View 
                                    style={{flexDirection:"row" }}>
                                        <Text style={{color:'red' , fontSize:30 , fontWeight:'bold'}}>7,345</Text>
                                        <Text style={{marginTop:20 , fontSize :10, color:'red'}}> .00 PKR</Text>
                              </View>
                              <Text style={{fontSize:12}}>Available balance</Text>
                      
                                <View style={{flexDirection:"row" , marginTop:10}}>
                                      <Text style={{fontSize:12 }}>Limit Type</Text>
                                      <Text style={{color:'red' , fontSize:12 , fontWeight:'bold'}}> Amount</Text>
                                </View>

                                <View style={{flexDirection:"row"}}>
                                      <Text style={{fontSize:12, alignSelf:'center' , fontWeight:'100'}}>Monthly Limit</Text>
                                      <Text style={{color:'red' , fontSize:12  , fontWeight:'bold'}}> 16,000 PKr</Text>
                              </View>

                         </View>
                   </View>      

                </Card>

        
                 <View 
                      style={{width : '100%' , marginTop: 10 , justifyContent:'center' , alignSelf:'center'}}>
                          
                                        <TouchableOpacity
                                              style={styles.loginScreenButton}
                                              onPress={this.checkifempty}
                                              underlayColor='#fff'>
                                                <View style={{flexDirection:'row' , alignItems:'center' , justifyContent:'center'}}>
                                                <Image source={require('./../src/images/icon6_160.png')}
                                                      style={{
                                                      
                                                        marginLeft:20 ,
                                                        width:22,height:25
                                                         }}>

                                                </Image>
                                             <Text style={{color:'white' , marginLeft:5 ,  fontSize:20 , alignSelf:'center'}}>Recent Transactions</Text>
                                             </View>
                                         </TouchableOpacity>
                       
                 </View>
                              {/* <ScrollView style={{marginBottom:30}}>                            
                                 <View
                                     style={{flexDirection:'row' , justifyContent:'space-between' , marginLeft:10 , marginRight:10}}>
                                      <View  style={{flexDirection:'column' }}>

                                                      
                                            <Text style={{marginTop:10}}>01/01/18</Text>
                                            <Text style={{marginTop:10}}>05/01/18</Text>
                                            <Text style={{marginTop:10}}>06/01/18</Text>
                                            <Text style={{marginTop:10}}>07/01/18</Text>
                                            <Text style={{marginTop:10}}>08/01/18</Text>
                                            <Text style={{marginTop:10}}>08/01/18</Text>
                                           

                                        </View>

                                        <View  style={{flexDirection:'column' }}>
                                      
                                      <Text style={{marginTop:10}}>15.00</Text>
                                      <Text style={{marginTop:10}}>17.00</Text>
                                      <Text style={{marginTop:10}}>18.00</Text>
                                      <Text style={{marginTop:10}}>19.00</Text>
                                      <Text style={{marginTop:10}}>20.00</Text>
                                      <Text style={{marginTop:10}}>21.00</Text>

                                     

                                  </View>

                                        
                                  <View  style={{flexDirection:'column' }}>
                                      
                                      <Text style={{marginTop:10}}>location</Text>
                                      <Text style={{marginTop:10}}>location</Text>
                                      <Text style={{marginTop:10}}>location</Text>
                                      <Text style={{marginTop:10}}>location</Text>
                                      <Text style={{marginTop:10}}>location</Text>
                                       <Text style={{marginTop:10}}>location</Text>
                               

                                  </View>
                                  </View>
                                  </ScrollView> */}

{/*                 
                  <FlatList style={{marginBottom:30 , marginTop:10}}
                                 data={this.state.dataSource} 
                              renderItem={({item}) =>
                              <View>
                              
                                    <View style={{flex:1 , flexDirection:'row',justifyContent:'space-between' , marginTop:20 , marginLeft:20 , marginRight:20}}>
                               
                                        <View style={{flexDirection:'row' , alignItems: 'center'}}>
                                              <Image source={require('./../src/images/ic_calendar.png')}
                                                      style={{ width:22,height:25  }}>
                                              </Image>
                                              <Text style={{marginLeft:8 , color:"grey"}}>{item.txnDate}</Text>
                                         </View>                                                                                                                                                                       
                                 
                                         <Text style={{fontWeight:'bold' , width:20}} >{this.state.trans_amount}</Text>
                                         <Text style={{color:'grey'}}>FranklinSq, UK</Text>

                                        </View>

                                        <View opacity={0.3}  style={{  marginTop:5 , borderBottomColor: 'grey',  borderBottomWidth: 1,  }}></View>

                              </View>
                            
                                           }/>   */}


                          <FlatList style={{marginBottom:25}}
                            data={ this.state.dataSource }
                            keyExtractor={(item,index)=>index}
                            renderItem={({item}) =>
                              (  <View>
                              
                                <View style={{flex:1 , flexDirection:'row' , marginTop:20 , justifyContent:"space-between" , marginLeft:10 , marginRight:10}}>
                           
                                    <View style={{flexDirection:'row' , alignItems: 'center'}}>
                                          <Image source={require('./../src/images/ic_calendar.png')}
                                                  style={{ width:22,height:25  }}>
                                          </Image>
                                          <View style={{flexDirection:'column'}}>
                                                <Text style={{marginLeft:8 , color:"grey"}}>{item.txnDate}</Text>
                                                <Text style={{marginLeft:8 , color:"grey"}}>{item.txnTime}</Text>

                                          </View>
                                         
                                     </View>                                                                                                                                                                       
                             
                                           <Text style={{fontWeight:'bold'  , fontSize:20 , alignContent:'center' , alignSelf:'center' ,alignItems:'center'}} >{item.txnAmount}</Text>


                                     <View style={{flexDirection:'column'}}>
                                              <Text style={{color:'grey'}}>{item.merchantName.substring(0,7)}</Text>
                                              <Text style={{color:'grey'}}>{item.merchantName.substring(7 , 14)}</Text>
                                              </View>
                                     

                                    </View>

                                    <View opacity={0.3}  style={{  marginTop:5 , borderBottomColor: 'grey',  borderBottomWidth: 1,  }}></View>
                                    
                          </View> )
                            }
                            keyExtractor={(item, index) => index.toString()}
                          />

                          <Image 
                              source={require('./../src/images/dp_160.png')}
                              style={{width : 120 ,height : 20 , margin: 5 ,  marginLeft:10 ,
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
                                  right:0,}}
                           ></Image>

      </View>
    );
  }
}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 10 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

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
        alignSelf:'center',
       marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#FF4500',
       
        borderColor: '#fff' , 
        width:Dimensions.get('window').width / 100 * 100 ,
      },
      loginText:{
          color:'#FFffff',
          textAlign:'center',
          paddingLeft : 10,
          paddingRight : 10
      } ,
      item: {
        padding: 10,
        fontSize: 18,
        height: 44,
      },
      container: {
        width: 100,
        height: 100,
        borderWidth: 10,
         borderRadius: 100,
         borderWidth: 10,
         borderRadius: 100,
         borderColor: 'grey',
         justifyContent: 'center',
         alignItems: 'center' 
       
      },
      progressLayer: {
        width: 100,
        height: 100,
         borderWidth: 10,
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'red',
    borderTopColor: 'red'  ,
    borderRadius:100
        
      },  appBar: {
        backgroundColor:'#FF4500',
        height: APPBAR_HEIGHT,
      },
});

