import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {windowHeight, windowWidth} from '../../config/courseStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import LoadingModal from '../../config/loadingModal';

const CreateAccScreen = ({navigation}) => {
  const [username, setUsername] = useState('minttriet1705@gmail.com');
  const [password, setPassword] = useState('12345678@');
  const [confirmPassword, setConfirmPassword] = useState('12345678@');
  const [showPassword, setShowPassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {}, []);

  const handleRegister = async () => {
    const emailValidation = validateEmail(username);
    if (!emailValidation.valid) {
      setErrorMessage(emailValidation.message);
      return;
    }

    const passwordValidation = validatePassword(password, confirmPassword);
    if (!passwordValidation.valid) {
      setErrorMessage(passwordValidation.message);
      return; // Exit the function early if validation fails
    }
    console.log(emailValidation, passwordValidation);

    const timeoutId = setTimeout(() => {
      console.log('Timeout reached, the operation took too long to complete.');
      // Optionally, set an error message in state to inform the user
      setErrorMessage('The operation timed out. Please try again.');
    }, 10000); // Set timeout to 10 seconds, adjust as needed

    try {
      console.log('Starting account creation');
      const result = await auth().createUserWithEmailAndPassword(
        username,
        password,
      );
      console.log('Firebase user creation result:', result);
      Alert.alert(
        'Account Created',
        'Your account has been created successfully!',
        [{text: 'OK', onPress: () => navigation.goBack()}],
      );
    } catch (error) {
      console.log('Error during Firebase user creation:', error);
      setErrorMessage(error.message);
    } finally {
      clearTimeout(timeoutId);
    }
  };

  const showPass = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = username => {
    console.log('AAAYTFAHGFSĐ', username);
    // This regular expression is a general pattern for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test the email against the regex pattern
    if (emailRegex.test(username)) {
      // If email matches the pattern, it's a valid email format
      return {valid: true, message: 'Email is valid.'};
    } else {
      // If email doesn't match the pattern, it's an invalid email format
      return {valid: false, message: 'Please enter a valid email address.'};
    }
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
      {isLoading ? <LoadingModal loading={isLoading} /> : null}
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
    marginBottom: 10,
  },
});

export default CreateAccScreen;
