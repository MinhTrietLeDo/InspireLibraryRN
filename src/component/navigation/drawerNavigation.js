import {
  DrawerContentScrollView,
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {windowHeight, windowWidth} from '../../config/courseStyle';
import {SafeAreaView, StyleSheet, View, Alert} from 'react-native';
import HomeBottomTab from './homeBottomTab';

const Drawer = createDrawerNavigator();

const CustomDrawer = (props, {navigation}) => {
  const handleLogOut = () => {};

  return (
    <DrawerContentScrollView {...props}>
      <SafeAreaView style={styles.container}>
        <DrawerItemList {...props} />
        <View style={styles.botContainer}>
          <View style={styles.splitBottom} />
          <DrawerItem
            label="Logout"
            onPress={() => handleLogOut()}
            icon={({color, size}) => (
              <MaterialCommunityIcons
                name="exit-to-app"
                color={color}
                size={(windowHeight + windowWidth) * 0.022}
              />
            )}
          />
        </View>
      </SafeAreaView>
    </DrawerContentScrollView>
  );
};

const DrawerTab = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} screenOptions={{}} />}>
      <Drawer.Screen
        name="Home"
        component={HomeBottomTab}
        options={{
          headerStyle:{
            backgroundColor: 'transparent'
          },
          // headerShown: false,
          title: 'Home',
          headerTitleAlign: 'center',
          headerTitle:'',
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="home"
              size={(windowHeight + windowWidth) * 0.02}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'black',
    height: windowHeight * 0.97,
    margin: (windowHeight + windowWidth) * 0.001,
    justifyContent: 'space-between',
    alignContent: 'center',
    padding: (windowHeight + windowWidth) * 0.005
  },
  split: {
    borderWidth: (windowHeight + windowWidth) * 0.0005,
    width: windowWidth * 0.5,
    marginTop: windowHeight * 0.01,
    borderColor: '#D3D3D3',
  },
  splitBottom: {
    borderWidth: (windowHeight + windowWidth) * 0.0005,
    width: windowWidth * 0.5,
    marginTop: windowHeight * 0.01,
    borderColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  botContainer: {
    // top: windowHeight * 0.01,
    // position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default DrawerTab;