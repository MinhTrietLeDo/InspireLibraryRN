import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {windowHeight, windowWidth} from '../config/courseStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  useEffect(() => {
    
  }, []);

  const loginFunction = async () => {};

  const showPass = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>LOGIN</Text>
      <View style={styles.loginContainer}>
        <View style={styles.inputContainer}>
          <View style={styles.input}>
            <Feather
              name="user"
              size={(windowHeight + windowWidth) * 0.02}
              //   color="#666"
              style={{marginRight: 5}}
            />
            <TextInput
              onChangeText={username => setUsername(username)}
              value={username}
              placeholder="Username"
              autoCapitalize="none"
              style={styles.textInput}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.input2}>
            <View style={styles.input}>
              <Ionicons
                name="lock-closed-outline"
                size={(windowHeight + windowWidth) * 0.02}
                // color="#666"
                style={{marginRight: 5}}
              />
              <TextInput
                onChangeText={password => setPassword(password)}
                value={password}
                placeholder="Password"
                autoCapitalize="none"
                secureTextEntry={showPassword}
              />
            </View>
            <TouchableOpacity onPress={() => showPass()}>
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={(windowHeight + windowWidth) * 0.02}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={{justifyContent: 'flex-end', flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => rememeberMe()}>
            <Text>Forgot?</Text>
          </TouchableOpacity>
        </View> */}
        <View style= {{margin:10}}>
            <Button
                title="Login"
                onPress={() => {}}
            />
        </View>
        
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text>New to the app? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
            <Text style={{color: 'red'}}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  loginContainer: {
    marginTop: windowHeight * 0.01,
  },
  inputContainer: {
    // backgroundColor: 'black',
    width: windowWidth * 0.7,
    borderBottomColor: 'black',
    // borderRadius: (windowHeight + windowWidth) * 0.01,
    borderBottomWidth: (windowHeight + windowWidth) * 0.0005,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    // width: '100%'
  },
});

export default LoginScreen;
