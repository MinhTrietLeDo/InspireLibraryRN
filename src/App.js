import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './component/screen/loginScreen';
import CreateAccScreen from './component/screen/createAccScreen';
import DrawerTab from './component/navigation/drawerNavigation';
import ViewBooksScreen from './component/screen/viewBookScreen';
import ReadBookScreen from './component/screen/readBookScreen';
import { requestStoragePermission } from './config/request';

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerBackVisible: false,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CreateAccount"
            component={CreateAccScreen}
            options={{
              headerBackVisible: false,
              headerShown: false,
            }}
          />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen
            name="Logined"
            component={DrawerTab}
            options={{
              headerBackVisible: false,
              headerShown: false,
              title: '',
            }}
          />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen
            name="BookDetails"
            component={ViewBooksScreen}
            options={{
              // headerBackVisible: false,
              // headerShown: false,
              title: 'Details',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="ReadBook"
            component={ReadBookScreen}
            options={{
              // headerBackVisible: false,
              // headerShown: false,
              title: 'Details',
              headerTitleAlign: 'center',
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  useEffect(() => {
    requestStoragePermission()
  }, [])
  return <RootStack />;
};

export default App;
