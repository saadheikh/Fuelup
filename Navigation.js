import React from 'react';
import { Button , View, Text , SafeAreaView ,ScrollView} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createDrawerNavigator , DrawerItems} from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
//import details from './details' ;
import detail from './screens/detail' ;
import home from './screens/home' ;
import signup from './screens/signup' ;
import otp from './screens/otp' ;
import leftdrawer from './screens/leftdrawer' ;
import card_management from './screens/card_management';
import view_transaction from './screens/view_transaction';
import testing from './screens/testing' ;
import complaint from './screens/complaint' ;
import { Ionicons } from '@expo/vector-icons' ;
import maps from './screens/maps/maps' ;
import weather from './screens/weather/weather';
import nearbyplaces from './screens/maps/nearbyplaces';
import emergence from './screens/Contacts/emergence';
import biometric from './screens/biometric';
import topheader from './screens/Header/topheader' ;
import sqlite from './screens/Contacts/sqlite';
import testingmap from './screens/maps/testingmap';
import trafficupdate from './screens/maps/trafficupdate';
import setting from './screens/settings/setting';

import cartoeingservice from './screens/Contacts/cartoeingservice' ;
import editprofile from './screens/settings/editprofile';
import registration from './screens/registration/registration';
import kyc from './screens/registration/kyc';
import newotp from './screens/otp';
import finddealer from './screens/maps/finddealer';
import rem from './screens/rem' ;
import notificationlist from './screens/notifications/notificationlist';
import normalregistration from './screens/registration/normalregistration';

 
const RootStack = createStackNavigator(
  {
    
    Home: home,
    Details: detail,
    Testing : testing ,
    Complaint: complaint , 
    Weather : weather , 
    Nearby : nearbyplaces ,
    Emergency : emergence ,
    Biometric : biometric ,
    TopHeader : topheader , 
    SQLite : sqlite ,
    Editpro : editprofile ,
    Expomaps : testingmap ,
    CarToeing : cartoeingservice , 
    Trafficpdate  :trafficupdate ,
    Registration : registration ,
    FindDealer : finddealer ,
    NormalRegistration : normalregistration ,
    NotificationLimit : notificationlist ,
    Reminder : rem ,
    newOTP : newotp ,
    KYC : kyc , 
    Settings: setting ,
    Maps: maps , 
    Signup:{
      screen: signup ,
      navigationOptions:{
        gesturesEnabled:'false' ,
        drawerLockMode: 'locked-closed' , 
        tabBarVisible: false
      }
    },
    View_TR : {
      screen:view_transaction ,
      navigationOptions:{
          drawerLockMode:'locked-closed' ,
          gesturesEnabled:false 
      }
    },
    Otp : otp , 
    Card_Management : card_management ,
  },
  {
    initialRouteName: 'Signup',
  
  } ,
  {
    drawerLockMode:'locked-closed'
  }
);

 const DrawerNavigation =  createDrawerNavigator({
   Home: RootStack ,
   Transactions:{
     screen: view_transaction ,
     navigationOptions:{
      drawerLockMode: 'locked-closed',
      gesturesEnabled:'false' ,
     }
   },
   Management : card_management ,
   Logout : signup
 },
 {
   contentComponent:leftdrawer
 });


 class IconWithBadge extends React.Component {
  render() {
    const { name, badgeCount, color, size } = this.props;
    return (
      <View style={{ width: 24, height: 24, margin: 5 }}>
        <Ionicons name={name} size={size} color={color} />
        {badgeCount > 0 && (
          <View
            style={{
              // /If you're using react-native < 0.57 overflow outside of the parent
              // will not work on Android, see https://git.io/fhLJ8
              position: 'absolute',
              right: -6,
              top: -3,
              backgroundColor: 'red',
              borderRadius: 6,
              width: 12,
              height: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
              {badgeCount}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const HomeIconWithBadge = props => {
  // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
  return <IconWithBadge {...props} badgeCount={3} />;
};

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;

  // iconName = `ios-information-circle${focused ? '' : '-outline'}`;
  // IconComponent = HomeIconWithBadge;

  if (routeName === 'Home') {
    iconName = `ios-information-circle${focused ? '' : '-outline'}`;
    // We want to add badges to home tab icon
    IconComponent = HomeIconWithBadge;
  } else if (routeName === 'Settings') {
    iconName = `ios-options`;
  }
  else if (routeName === 'Dealer') {
    iconName = `ios-locate`;
  }
  else if (routeName === 'Card_Management') {
    iconName = `ios-card`;
  }

  // You can return any component that you like here!
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

//  const TabNavigator = createBottomTabNavigator({
//   Home: DrawerNavigation,
//   Card:card_management,
//   Transactions:view_transaction,
//   Dealer: testing
// },

// {
//   initialRouteName: 'Home',
// });

const bottomtab =
  createBottomTabNavigator(
    {
      Home: { screen: DrawerNavigation  , navigationOptions:{ tabBarVisible:false}},
      Settings: { screen: view_transaction },
      Dealer: { screen: maps },
      Card_Management: { screen: card_management },
      
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) =>
          getTabBarIcon(navigation, focused, tintColor),
      }),
      tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      },
    }
);


//const AppContainer = createAppContainer(DrawerNavigation);
const AppContainer = createAppContainer(bottomtab);

export default class Navigation extends React.Component {
  render() {
    return <AppContainer />;

  }
}
