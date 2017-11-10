import React from 'react';
import { TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Kort from './Kort';
import Info from './Info';

const Tabs = TabNavigator(
  {
    Kort: {
      screen: Kort,
      navigationOptions: ({ navigation }) => ({
          title: 'Map',
          tabBarIcon: ({ tintColor, focused }) => (
            <Ionicons
              name={focused ? 'ios-contacts' : 'ios-contacts-outline'}
              size={26}
              style={{ color: tintColor }}
            />
          ),
      })
    },
    Info: {
      screen: Info,
      navigationOptions: ({ navigation }) => ({
        title: 'Login/Settings',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-construct' : 'ios-construct-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
    })
  },
  }
);


export default Tabs;