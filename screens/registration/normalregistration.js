import React from 'react' ;
import {View , Text , Image , ImageBackground , AsyncStorage , TextInput , Dimensions , TouchableOpacity , StyleSheet} from 'react-native' ;
import { BackHandler } from 'react-native';

export default class normalregistration extends React.Component{
    

    static navigationOptions ={

        header : null

    }

    constructor(props){
        super(props);
        
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state={
            socialname :'' ,
            socialemail : '' 
        }
    }


    gettinggoogledata = async ()=>{
        try{
            const value = await AsyncStorage.getItem('socialname');
            const value1 = await AsyncStorage.getItem('socialemail');
      if (value !== null) {
        this.setState({
          socialname : value ,
          socialemail : value1 
        })
        // We have data!!
        console.log(value);
      }
        }
        catch(error){
            alert(error)
        }
    }

    componentDidMount(){

        if (this.props.navigation.state.params.googlename !== null){
            var params = this.props.navigation.state.params.googlename;
            var params1 = this.props.navigation.state.params.googlegmail;
            console.log("soicalname" , params) 
            this.setState({
                socialemail : params1 , 
                socialname : params
    
            })
    
        }
        else if (this.props.navigation.state.params.googlename == null) {
            
            this.setState({
                socialemail : '' , 
                socialname : ''
    
            })
        }{
            
        }
       
      
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





    render(){
       
        

        return(
            <View>

                        <ImageBackground source={require('./../../src/images/white_back/back.png')} style={{width:'100%' , height:'100%'}}>
                                    <View style={{flex:1 , alignSelf:'center' , alignItems:'center' , marginTop: 50 }}>
                                            <Text style={{color: '#FF4500' , fontSize:30 , fontWeight:'bold'}}>Signup</Text>
                        
                                            <TextInput 
    
                                                        style={{ marginTop:50 ,borderColor:'#FF4500', borderRadius:5 ,fontWeight:'100' , color:'#FF4500',borderWidth : 1 , width:Dimensions.get('window').width / 100 * 80, padding:5 }}
                                                        
                                                        placeholder = "Enter Email"
                                                        returnKeyType = { "next" }
                                                        placeholderTextColor ='grey'

                                                       
                                                        onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                                        //onChangeText={CardNumber => this.setState({CardNumber})}
                                                         // onChangeText={this.dismisskeyboard}
                                                    
                                                        >{this.state.socialemail}</TextInput>
                                            


                                              <TextInput 

                                                        style={{borderColor:'#FF4500' , color:'#FF4500', borderRadius:5  , fontWeight:'100', borderWidth : 1 , width:Dimensions.get('window').width / 100 * 80, marginTop:10 , padding:5 }}

                                                        placeholder = "Enter Username"
                                                        returnKeyType = { "next" }
                                                        placeholderTextColor ='grey'
                                                        
                                                        ref={(input) => { this.secondTextInput = input; }}
                                                        onSubmitEditing={() => { this.secondTextInput1.focus(); }}
                                                        //onSubmitEditing ={this.dismisskeyboard}
                                                        //onChangeText={CardNumber => this.setState({CardNumber})}
                                                        
                                                    // onChangeText={this.dismisskeyboard}
                                                    
                                                        >{this.state.socialname}</TextInput>

                                                            <TextInput 
                                                                
                                                                style={{borderColor:'#FF4500', borderRadius:5 ,fontWeight:'100' , color:'#FF4500',borderWidth : 1 , width:Dimensions.get('window').width / 100 * 80, marginTop:10 , padding:5 }}
                                                                
                                                                placeholder = "Enter Mobile Number"
                                                                returnKeyType = { "next" }
                                                                placeholderTextColor ='grey'
                                                               
                                                                ref={(input) => { this.secondTextInput1 = input; }}
                                                                 onSubmitEditing={() => { this.secondTextInput2.focus(); }}
                                                                //onChangeText={CardNumber => this.setState({CardNumber})}
                                                                // onChangeText={this.dismisskeyboard}

                                                                ></TextInput>



                                                            <TextInput 

                                                                style={{borderColor:'#FF4500' , color:'#FF4500' , borderRadius:5 , fontWeight:'100', borderWidth : 1 , width:Dimensions.get('window').width / 100 * 80, marginTop:10 , padding:5 }}

                                                                placeholder = "Enter Cnic"
                                                                returnKeyType = { "next" }
                                                                placeholderTextColor ='grey'

                                                               
                                                                ref={(input) => { this.secondTextInput2 = input; }}
                                                                onSubmitEditing={() => { this.secondTextInput3.focus(); }}
                                                                //onChangeText={CardNumber => this.setState({CardNumber})}
                                                                
                                                            // onChangeText={this.dismisskeyboard}

                                                                ></TextInput>

                                                            <TextInput 
                                                                
                                                                style={{borderColor:'#FF4500', borderRadius:5 ,fontWeight:'100' , color:'#FF4500',borderWidth : 1 , width:Dimensions.get('window').width / 100 * 80, marginTop:10 , padding:5 }}
                                                                
                                                                placeholder = "Enter City"
                                                                returnKeyType = { "next" }
                                                                placeholderTextColor ='grey'

                                                               
                                                                ref={(input) => { this.secondTextInput3 = input; }}
                                                                 onSubmitEditing={() => { this.secondTextInput4.focus(); }}
                                                                //onChangeText={CardNumber => this.setState({CardNumber})}
                                                                // onChangeText={this.dismisskeyboard}

                                                                ></TextInput>



                                                            <TextInput 

                                                                style={{borderColor:'#FF4500', borderRadius:5  , color:'#FF4500' , fontWeight:'100', borderWidth : 1 , width:Dimensions.get('window').width / 100 * 80, marginTop:10 , padding:5 }}

                                                                placeholder = "Enter Country"
                                                                returnKeyType = { "next" }
                                                                placeholderTextColor ='grey'

                                                                
                                                                ref={(input) => { this.secondTextInput4 = input; }}
                                                                onSubmitEditing={() => { this.secondTextInput5.focus(); }}
                                                                //onSubmitEditing ={this.dismisskeyboard}
                                                                //onChangeText={CardNumber => this.setState({CardNumber})}
                                                                
                                                            // onChangeText={this.dismisskeyboard}

                                                                ></TextInput>

                                                            <TextInput 
                                                                
                                                                style={{borderColor:'#FF4500', borderRadius:5 ,fontWeight:'100' , color:'#FF4500',borderWidth : 1 , width:Dimensions.get('window').width / 100 * 80, marginTop:10 , padding:5 }}
                                                                
                                                                placeholder = "Enter Address"
                                                                returnKeyType = { "done" }
                                                                placeholderTextColor ='grey'

                                                                
                                                                ref={(input) => { this.secondTextInput5 = input; }}
                                                             
                                                                //onChangeText={CardNumber => this.setState({CardNumber})}
                                                                // onChangeText={this.dismisskeyboard}

                                                                ></TextInput>



                                                            

                                                                <TouchableOpacity
                                                                                                style={styles.loginScreenButton}
                                                                                        
                                                                                                onPress={() => {this.props.navigation.navigate('Testing')}}
                                                                                                underlayColor='#fff'>
                                                                                                <Text style={styles.loginText}>Signup</Text>



                                                                                </TouchableOpacity>

                                                      

                                                           
                                    </View>

                        </ImageBackground>
            </View>
        )
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
            width:'90%' , 
       
          padding:10,
          alignSelf:'center' ,
         borderColor:'#FF4500',
         backgroundColor:'#FF4500' ,
         borderRadius:10,
         bottom: 0 , 
         position:'absolute' , 
         marginBottom:30
        },
        loginText:{
            color:'white',
            textAlign:'center',
            paddingLeft : 10,
            paddingRight : 10
        }
  });