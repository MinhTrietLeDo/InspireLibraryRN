import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import HomeScreen from './homeScreen';

const Drawer = createDrawerNavigator();

const DrawerTab = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerTab;