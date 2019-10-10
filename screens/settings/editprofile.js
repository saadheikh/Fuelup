import React from 'react' ;
import {
    StyleSheet,
    View,
    AsyncStorage,
    TextInput,
    Text,
    TouchableOpacity,
    ImageBackground,Image , Dimensions , Keyboard
  } from 'react-native';
  import { BackHandler } from 'react-native';
  


export default class editprofile extends React.Component{
    static navigationOptions={
        header  :null
    }

    state={
        name : '' ,
        email : '' ,
    }

    componentDidMount(){
      this.retrieveData()
      // const value = AsyncStorage.getItem('name' , "");
      // if (value !== null) {
      //   console.log(value)
      //   // We have data!!
      //   this.setState({
      //     name : value
      //   })
      //   console.log(value);
      // }else{
      //   alert("null")
      // }
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
    
    storeData = async () => {
        try {
          Keyboard.dismiss()
          await AsyncStorage.setItem('name', this.state.name);
          await AsyncStorage.setItem('email', this.state.email);
          this.props.navigation.navigate('Testing')
        } catch (error) {
          // Error saving data
        }
      }
      
      retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('name');
          const value1 = await AsyncStorage.getItem('email');
          if (value !== null) {
            this.setState({
              name : value ,
              email : value1
            })
            // We have data!!
            console.log(value);
          }
         } catch (error) {
           // Error retrieving data
         }
      }


    render(){
        return(
            <View style={styles.MainContainer}>
                <ImageBackground source={require('./../../src/images/header_160.png')} style={{width:'100%' , height:60 , justifyContent:'center'}}>
                                  <ImageBackground source={require('./../../src/images/strip/strip.png')} style={{width:'100%' ,height:50 ,alignSelf:'center'}}>
                                           
                              <View style={{height:100  ,flex:1 , flexDirection:'row' , justifyContent:'space-between' , marginTop:5}}>
                                           
                                          <TouchableOpacity onPress={() =>this.props.navigation.goBack()}>
                                                <Image source={require('./../../src/images/white_arow/arrow.png')}
                                                      style={{
                                                        marginTop:5 , 
                                                        marginLeft:20 ,
                                                        width : 30 , 
                                                        height : 30 ,  }}>

                                                </Image>
                                            </TouchableOpacity>
                                
                                            <Text style={{fontSize:20, marginTop:10  , color:'white'}}>Edit Profile</Text>
                       
                                            <View style={{flexDirection:'row'}}>
                                               <TouchableOpacity onPress={()=>this.props.navigation.navigate('Signup')}>
                                                <Image source={require('./../../src/images/bell/bell.png')}
                                                    style={{ marginTop:10 ,
                                                          marginLeft:20 ,
                                                            width : 20 , 
                                                          height : 20 , 
                                                                                                                  }}>
                                                </Image>
                                              </TouchableOpacity>

                                             <TouchableOpacity onPress={()=>this.props.navigation.navigate('Signup')}>
                                                <Image source={require('./../../src/images/switch/switch.png')}
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

                            <ImageBackground source={require('./../../src/images/background.png')} style={{width:'100%' , height:'100%'}}>

                          
                            <TextInput
       
       style={{borderBottomColor:'#FFFFFF' , borderBottomWidth : 1 ,width:Dimensions.get('window').width / 100 * 70 ,
        marginTop:20 ,  color :'white' , padding:5 , alignSelf:'center'}}
       
        maxLength={10} 
        placeholder="Mobile Number" 
        returnKeyType="done"
        placeholderTextColor ='white'
        onChangeText ={ name  => this.setState({name})}
        
     //  onChangeText={this.dismisskeyboard}
        >{this.state.name}

          
        </TextInput>
       
        <TextInput
       
       style={{borderBottomColor:'#FFFFFF' , borderBottomWidth : 1 ,width:Dimensions.get('window').width / 100 * 70 ,
       marginTop:20 ,  color :'white' , padding:5 ,alignSelf:'center'}}
       
        maxLength={10} 
        placeholder="Enter email" 
        returnKeyType="done"
        placeholderTextColor ='white'
        onChangeText ={ email  => this.setState({email})}
        
        
     //  onChangeText={this.dismisskeyboard}
        >{this.state.email}

          
        </TextInput>
                            
                                    <TouchableOpacity style={{alignSelf:'center' , justifyContent:'center',bottom:0 , marginBottom:70 , position:'absolute' ,width:Dimensions.get('window').width / 100 * 70  , height:40 , borderColor:'white' , borderWidth:2, borderRadius:2}}
                                        onPress={this.storeData}
                                        >
                                        <Text style={{color:'white' , borderColor:'white'  , alignSelf:'center' }}> SAVE EDITS </Text>
                                    </TouchableOpacity>

                                    
                                    {/* <TouchableOpacity
                                        onPress={this.retrieveData}
                                        >
                                        <Text style={{color:'white' , borderColor:'white' ,alignSelf:'center' }}> fetch EDITS </Text>
                                    </TouchableOpacity> */}


                                                        </ImageBackground>
           
          {/* <Text style={styles.text}> {this.getValueFunction()} </Text> 
          <Text style={styles.text}> {this.getValueFunction()} </Text>  */}
          {/* <TouchableOpacity onPress={this.getValueFunction} style={styles.button}>
            <Text style={styles.buttonText}> GET VALUE </Text>
          </TouchableOpacity> */}
  
          {/* <Text style={styles.text}> {this.state.getValue} </Text> */}
        </View>
      );
    }
  } 
  
  const styles = StyleSheet.create({
    MainContainer: {
      alignItems: 'center',
      backgroundColor : '#ff4500',
      flex: 1,
    },
    HeaderText: {
      textAlign: 'center',
      fontSize : 20,
      color : '#FFFFFF',
      top:0,
      position : 'absolute',
      marginTop : 30,
      width : '100%',
      fontWeight : 'bold',
      
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
  
    text: {
      fontSize: 20,
      textAlign: 'center',
    },
  });