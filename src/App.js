import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './component/loginScreen';
import CreateAccScreen from './component/createAccScreen';
import { initDB } from './config/database';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  useEffect(() => {
    const initializeDatabase = async () => {
      await initDB();
    };

    initializeDatabase();
  }, []);

  return <RootStack />;
};

export default App;
