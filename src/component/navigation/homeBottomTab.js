import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/homeScreen';
import {windowHeight, windowWidth} from '../../config/courseStyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SettingScreen from '../screen/settingScreen';
import BooksScreen from '../screen/booksScreen';

const Tab = createBottomTabNavigator();

const HomeBottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
        tabBarActiveTintColor: 'black',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopColor: 'transparent',
          height: windowHeight * 0.07,
          position: 'absolute',
          borderTopLeftRadius: (windowHeight + windowWidth) * 0.03,
          borderTopRightRadius: (windowHeight + windowWidth) * 0.03,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.05,
          shadowRadius: 20,
          elevation: 20,
        },
      }}>
      <Tab.Screen
        component={HomeScreen}
        name="HomeScreen"
        options={{
          headerBackVisible: false,
          headerShown: false,
          headerTitleAlign: 'center',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        component={BooksScreen}
        name="Books"
        options={{
          headerBackVisible: false,
          headerShown: false,
          headerTitleAlign: 'center',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="book-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        component={SettingScreen}
        name="Setting"
        options={{
          headerBackVisible: false,
          headerShown: false,
          headerTitleAlign: 'center',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeBottomTab;
