import React from 'react';
import { Button , View, Text } from 'react-native';

export default class detail extends React.Component {
  static navigationOptions ={
    title : 'Details Screen'
};
  render() {
      const {navigation} = this.props ;
      const mobilen0 = navigation.getParam('mobilen0' , "N/A");
      const cardNumber = navigation.getParam('cardn0' , "N/A");
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{JSON.stringify(cardNumber).replace('"' ,'')}</Text>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}