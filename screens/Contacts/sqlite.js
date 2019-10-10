import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,Linking , 
  TouchableOpacity , ImageBackground , Image
} from "react-native";
import Constants from "expo-constants";
import { SQLite } from "expo-sqlite";
import { BackHandler } from 'react-native';

const db = SQLite.openDatabase("db.db");

class Items extends React.Component {
  state = {
    items: null
  };

 

  componentDidMount() {
    this.update();
  }

  render() {
    const { done: doneHeading } = this.props;
    const { items } = this.state;
    const heading = doneHeading ? "" : "Personal Contacts";

    if (items === null || items.length === 0) {
      return null;
    }

    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeading}>{heading}</Text>
        {items.map(({ id, done, value }) => (
          <TouchableOpacity
            key={id}
            onPress={() => this.props.onPressItem(value)}
            style={{
              backgroundColor: done ? "#1c9963" : "#fff",
              borderColor: "#000",
              borderWidth: 1,
              padding: 8
            }}
          >
            <Text style={{ color: done ? "#fff" : "#000" }}>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  update() {
    db.transaction(tx => {
      tx.executeSql(
        `select * from items where done = ?;`,
        [this.props.done ? 1 : 0],
        (_, { rows: { _array } }) => this.setState({ items: _array })
      );
    });
  }
}

export default class sqlite extends React.Component {

  static navigationOptions ={
    header : null 
  }
  state = {
    text: null
  };

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

  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists items (id integer primary key not null, done int, value text);"
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
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
                                
                                            <Text style={{fontSize:20 , marginTop:5 , color:'white'}}>Emergency Contacts</Text>
                       
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

                        <Text style={styles.heading}></Text>
                        <View style={styles.flexRow}>
                                <TextInput
                                  onChangeText={text => this.setState({ text })}
                                  onSubmitEditing={() => {
                                    this.add(this.state.text);
                                    this.setState({ text: null });
                                  }}
                                  placeholder="Add your Personal Number"
                                  style={styles.input}
                                  value={this.state.text}
                                />
                        </View>
                        <ScrollView style={styles.listArea}>
                          <Items
                            done={false}
                            ref={todo => (this.todo = todo)}
                          onPressItem ={ id => (Linking.openURL(`tel:${id}`))}
                            // onPressItem={id =>
                            //   db.transaction(
                            //     tx => {
                            //       tx.executeSql(`update items set done = 1 where id = ?;`, [
                            //         id
                            //       ]);
                            //     },
                            //     null,
                            //     this.update
                            //   )
                            // }
                          />
                          <Items
                            done={true}
                          ref={done => (this.done = done)}
                            onPressItem={id =>
                              db.transaction(
                                tx => {
                                  tx.executeSql(`delete from items where id = ?;`, [id]);
                                },
                                null,
                                this.update
                              )
                            }
                          />
                           <Text style={{marginLeft:20 , fontSize:20 , marginBottom: 10}}>Important Contacts</Text>

                           <TouchableOpacity onPress={() => {Linking.openURL(`tel:${'15'}`)}}>
                                <View  style={{flexDirection:'row' , justifyContent:'center' , marginLeft:20 , marginRight:20}}>
                                      <Text style={styles.input1}>Police</Text>
                                      <Text  style={styles.input1}>15</Text>
                                </View>

                           </TouchableOpacity>

                           <TouchableOpacity onPress={() => {Linking.openURL(`tel:${'1915'}`)}}>
                                  <View style={{flexDirection:'row' , justifyContent:'center' , marginLeft:20 , marginRight:20}}>
                                        <Text style={styles.input1}>Traffic Police</Text>
                                        <Text style={styles.input1}>1915</Text>
                                  </View>


                           </TouchableOpacity>
                          
                           

                           <TouchableOpacity onPress={() => {Linking.openURL(`tel:${'130'}`)}}>
                              <View style={{flexDirection:'row' , justifyContent:'center' , marginLeft:20 , marginRight:20}}>
                                    <Text style={styles.input1}>Highway Police</Text>
                                    <Text style={styles.input1}>130</Text>
                              </View>

                           </TouchableOpacity>


                           <TouchableOpacity onPress={() => {Linking.openURL(`tel:${'1020'}`)}}>
                          <View style={{flexDirection:'row' , justifyContent:'center' , marginLeft:20 , marginRight:20}}>
                                          <Text style={styles.input1}>Edhi Ambulance</Text>
                                          <Text style={styles.input1}>1020</Text>
                                    </View>
                            
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {Linking.openURL(`tel:${'021-111-111-134'}`)}}>
                <View style={{flexDirection:'row' , justifyContent:'center' , marginLeft:20 , marginRight:20}}>
                                 <Text style={styles.input1}>Chippa Ambulance</Text>
                                 <Text style={styles.input1}>021-111-111-134</Text>
                           </View>
                  
                </TouchableOpacity>
                        
                         
                         

                                {/* <View styles={{flexDirection:'column' , marginLeft:20 , marginRight:20}}>
                                        <Text styles={{borderColor:'black' , marginRight:16 , marginLeft:16}}>Police             : 15</Text>
                                        <Text styles={styles.input}>Traffic Police     : 1915</Text>
                                        <Text styles={styles.input}>Highway Police     : 130</Text>
                                        <Text styles={styles.input}>Edhi Ambulance     : 1020</Text>
                                        <Text styles={styles.input}>Chippa             : 021 111-111-134</Text>
                                        <Text styles={styles.input}>Aman               : 021 111-111-823</Text>
                                        </View> */}
                            
                        </ScrollView>

      
      </View>
    );
  }

  add(text) {
    // is text empty?
    if (text === null || text === "") {
      return false;
    }

    db.transaction(
      tx => {
        tx.executeSql("insert into items (done, value) values (0, ?)", [text]);
        tx.executeSql("select * from items", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      this.update
    );
  }

  update = () => {
    this.todo && this.todo.update();
    this.done && this.done.update();
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    // paddingTop: Constants.statusBarHeight
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  flexRow: {
    flexDirection: "row"
  },
  input1: {
    borderColor: "black",
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    alignSelf:'center' ,
    alignItems:'center' ,
    justifyContent:'center' ,
    alignContent:'center' ,
    height: 40,
   
    padding:5                     
    
  },
  input: {
    borderColor: "black",
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    height: 40,
    marginLeft: 16,
    marginRight:16 ,
    padding: 8
  },
  listArea: {
    backgroundColor: "#f0f0f0",
    flex: 1,
    paddingTop: 16
  },
  sectionContainer: {
    marginBottom: 16,
    marginHorizontal: 16
  },
  sectionHeading: {
    fontSize: 18,
    marginBottom: 8
  }
});