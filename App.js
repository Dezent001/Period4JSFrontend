import React from 'react';
import { Button, Platform, ScrollView } from 'react-native';
import { TabNavigator, DrawerNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Tabs from './Tabs';

const TabsInDrawer = DrawerNavigator({
  Tabs: {
    screen: Tabs,
    navigationOptions: {
      drawer: () => ({
        label: 'Simple Tabs',
        icon: ({ tintColor }) => (
          <MaterialIcons
            name="filter-1"
            size={24}
            style={{ color: tintColor }}
          />
        ),
      }),
    },
  },
});

export default TabsInDrawer;