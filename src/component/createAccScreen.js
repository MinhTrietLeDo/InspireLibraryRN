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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {addUser, initDB, doesUserExist} from '../config/database';

const CreateAccScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {}, []);

  const handleRegister = async () => {
    await initDB();
    const userExists = await doesUserExist(username);
    if (userExists) {
      setErrorMessage('Account existed');
      // console.log('Account existed')
    } else {
      return addUser(username, password)
        .then(userId => {
          console.log(`User created with ID: ${userId}`);
          return 'Account successfully created.';
        })
        .catch(error => {
          console.error('Error creating user:', error);
          return 'Error creating account.';
        });
    }
    const {valid, message} = validatePassword(password, confirmPassword);
    if (!valid) {
      setErrorMessage(message);
      return message;
    }
  };

  const showPass = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = (password, confirmPassword) => {
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

    if (password !== confirmPassword) {
      return {valid: false, message: `Passwords do not match.`};
    }

    return {valid: true, message: 'Password is valid.'};
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Register</Text>
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
                onChangeText={password => setConfirmPassword(password)}
                value={confirmPassword}
                placeholder="Re-enter Password"
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
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        <View style={{margin: 10}}>
          <Button title="Register" onPress={() => handleRegister()} />
        </View>
      </View>

      <View style={{flexDirection: 'row'}}>
        <Text>Have Account? </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{color: 'red'}}>Sign in</Text>
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
    // width: '100%'
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default CreateAccScreen;
