import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {windowHeight, windowWidth} from '../../config/courseStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('test@example.com');
  const [password, setPassword] = useState('password123!');
  const [showPassword, setShowPassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isRemember, setIsRemember] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const autofillCredentials = async () => {
      try {
        const credentials = await AsyncStorage.getItem('credentials');
        if (credentials) {
          const {username, password} = JSON.parse(credentials);
          setUsername(username);
          setPassword(password);
          setIsRemember(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    autofillCredentials();
  }, []);

  const loginFunction = async () => {
    try {
      // setIsLoading(true);
      const userCredential = await auth().signInWithEmailAndPassword(
        username,
        password,
      );
      console.log('User logged in:', userCredential);

      // Reset navigation and move to the 'Logined' screen
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Logined'}],
        }),
      );
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      // setIsLoading(false); // Optional: manage loading state
    }
  };

  const showPass = () => {
    setShowPassword(!showPassword);
  };

  const isRememberButton = async () => {
    setIsRemember(!isRemember);
    if (!isRemember) {
      await AsyncStorage.setItem(
        'credentials',
        JSON.stringify({username, password}),
      );
      console.log('remember');
    } else {
      await AsyncStorage.removeItem('credentials');
      console.log('i forgor 💀');
    }
  };

  const modalForgetPassword = () => {
    setShowModal(!showModal);
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
                style={styles.textInput}
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
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        <View style={styles.forgotAndRemember}>
          <TouchableOpacity onPress={() => isRememberButton()}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesome
                name={isRemember ? 'circle' : 'circle-o'}
                size={(windowHeight + windowWidth) * 0.01}
                style={{marginRight: 5}}
              />
              <Text>Remember Me</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => modalForgetPassword()}>
            <Text>Forgot password?</Text>
          </TouchableOpacity>
        </View>
        <View style={{margin: 10}}>
          <Button title="Login" onPress={() => loginFunction()} />
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
          <Text style={{color: 'red'}}>Register</Text>
        </TouchableOpacity>
      </View>

      {/*============ Forget Password Modal ============*/}
      <Modal
        animationType="slide"
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}>
        <Text>MODAL</Text>
      </Modal>
      {/*============ Forget Password Modal ============*/}
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
    width: windowWidth * 0.8,
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
    width: '80%',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    marginBottom: 10,
  },
  forgotAndRemember: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
  },
});

export default LoginScreen;
