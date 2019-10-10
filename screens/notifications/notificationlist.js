import React from 'react' ;

import { View ,Text, FlatList , TouchableOpacity ,ActivityIndicator, Image , ImageBackground } from "react-native";
import { BackHandler } from 'react-native';

export default class notificationlist extends React.Component{
    

    static navigationOptions ={
        header : null 
    }

    constructor(props){
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state={
            
            dateSource : [] ,
            tokennumber : '',
            isLoading : true
    
    
    
        }
       
      }

      componentDidMount(){
          this.getNotificationList()
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


    getNotificationList = async ()=> {

        console.log("yes")
      
        try {
          console.log("called" , "called");
          let response = await  fetch(`http://172.191.1.137:8080/AGCM_PROD/AG_Servlet/FUEL?messageType=GET_NOTIFICATIONS&msisdn=03333002120&imei=909090940&channel=Mobile&identity=03333002120&cardNo=8096150900000028&tokenNo=${this.state.tokennumber}`)
            const completeresonse =  await response.json() ;
            console.log("completerespons" , completeresonse.code)
      
              if(completeresonse.code == '0000')
                {
                    const data = completeresonse.additonalData.ActiveNotifications;
      
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


    render(){
        if (this.state.isLoading) {
            return (
              <View style={{flex: 1, paddingTop: 20 , justifyContent:'center'}}>
                <ActivityIndicator color='#FF4500' size="large"  />
              </View>
            );
          }
        return(
            <View>
              <ImageBackground source={(require('./../../src/images/white_back/back.png'))} style={{width:'100%' , height:'100%'}} >


             
                   <FlatList style={{marginBottom:25}}
                            data={ this.state.dataSource }
                            keyExtractor={(item,index)=>index}
                            renderItem={({item}) =>
                              (  <View>
                              
                                <View style={{flex:1 , flexDirection:'row' , marginTop:20 , justifyContent:"space-between" , marginLeft:10 , marginRight:10}}>
                           
                                    <View style={{flexDirection:'column' , padding:10, borderWidth:2 , borderColor:'#FF4500' , borderRadius:10 , width:'100%'} }>
                                         
                                         
                                                <Text style={{fontSize:20 , fontWeight:'bold' , color:"grey" , alignSelf:'center' }}>{item.notificationTitle}</Text>
                                                <Text style={{color:"grey" , alignSelf:'center'}}>{item.notificationTitle}</Text>
                                                <Text style={{color:"grey" , alignSelf:'center'}}>{item.message}</Text>
                                                <Text style={{alignContent:'center' , alignSelf:'center' ,alignItems:'center'}} >{item.description}</Text>
                                                <Text style={{color:'grey' ,alignSelf:'center'}}>{item.createdOn}</Text>
                                                <Text style={{color:'grey' ,  alignSelf:'center'}}>{item.productName}</Text>
                                        
                                         
                                     </View>                                                                                                                                                                       
                             
                                    

                                    </View>

                                  
                                    
                          </View> )
                            }
                            keyExtractor={(item, index) => index.toString()}
                          />
                           </ImageBackground>
            </View>
        )
    }
}