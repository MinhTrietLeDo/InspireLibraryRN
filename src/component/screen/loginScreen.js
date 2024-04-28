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
  Alert,
} from 'react-native';
import {windowHeight, windowWidth} from '../../config/courseStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import CustomButton from '../customComponent/customButton';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isRemember, setIsRemember] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

    // checkFirebaseAuthAvailability()
  }, []);

  // CHECK FIREBASE
  const checkFirebaseAuthAvailability = async () => {
    try {
      const testAuth = await auth().signInAnonymously();
      await auth().signOut();
      console.log('Firebase Auth is available.', testAuth);
      return true;
    } catch (error) {
      console.error('Firebase Auth is not available:', error);
      return false;
    }
  };

  const validateEmail = username => {
    console.log('AAAYTFAHGFSĐ', username);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(username)) {
      return {valid: true, message: 'Email is valid.'};
    } else {
      return {valid: false, message: 'Please enter a valid email address.'};
    }
  };

  const validatePassword = password => {
    const minLength = 8;
    const specialCharRegex = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

    if (password.length < minLength) {
      return {
        valid: false,
        message: `Password must be at least ${minLength} characters long.`,
      };
    }

    if (!specialCharRegex.test(password)) {
      return {
        valid: false,
        message: `Password must contain at least one special character.`,
      };
    }

    return {valid: true, message: 'Password is valid.'};
  };

  const loginFunction = async () => {
    const emailValidation = validateEmail(username);
    if (!emailValidation.valid) {
      setErrorMessage(emailValidation.message);
      return;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      setErrorMessage(passwordValidation.message);
      return;
    }
    console.log(emailValidation, passwordValidation);

    try {
      setIsLoading(true);
      const userCredential = await auth().signInWithEmailAndPassword(
        username,
        password,
      );
      console.log('User logged in:', userCredential);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Logined'}],
        }),
      );
    } catch (error) {
      console.error('Login error:', error);
      if (error.code === 'auth/invalid-credential') {
        setErrorMessage('Wrong password!');
      } else if (error.code === 'auth/too-many-requests') {
        setErrorMessage('Too many unsuccessful login. Please try again later!');
      } else {
        setErrorMessage(
          'An unexpected error occurred. Please try again later.',
        );
      }
      console.error('Login error:', error);
    } finally {
      setIsLoading(false)
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

  const forgotPassword = async () => {
    try {
      await auth().sendPasswordResetEmail(username);
      // console.log('FORGOR PASWOD: ', result);
      Alert.alert(
        'Email Sent',
        'A password reset email has been sent to your email address.',
        [{text: 'OK'}],
      );
    } catch (error) {
      console.error(error);
    }
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
        <View>
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
        </View>
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
          <CustomButton loading= {isLoading} title="Login" onPress={() => loginFunction()} />
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
        <View style={styles.container}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Enter your email to reset password:
            </Text>
            <TextInput
              placeholder="Email address"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={username => setUsername(username)}
              value={username}
              style={styles.textInput}
            />
            <Button
              title="Send Reset Link"
              onPress={() => {
                forgotPassword(username);
                setShowModal(false);
              }}
            />
            <Button title="Close" onPress={() => setShowModal(false)} />
          </View>
        </View>
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
    backgroundColor: 'white',
  },
  loginContainer: {
    marginTop: windowHeight * 0.01,
  },
  inputContainer: {
    width: windowWidth * 0.8,
    borderBottomColor: 'black',
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
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
