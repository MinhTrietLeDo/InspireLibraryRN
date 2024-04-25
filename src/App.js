import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './component/screen/loginScreen';
import CreateAccScreen from './component/screen/createAccScreen';
// import {initDB} from './config/database';
import DrawerTab from './component/navigation/drawerNavigation';

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
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return <RootStack />;
};

export default App;
