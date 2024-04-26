import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { windowHeight, windowWidth } from '../../config/courseStyle';

const ProfileScreen = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      setDisplayName(user.displayName || '');
      setEmail(user.email || '');
    }
  }, []);

  const handleUpdateProfile = async () => {
    const user = auth().currentUser;

    try {
      //   // If the email needs to be updated, it requires a separate call
      //   if (email !== user.email) {
      //     await user.updateEmail(email);
      //     // Email updated
      //   }

      await user.updateProfile({
        displayName: displayName,
      });

      Alert.alert(
        'Profile Updated',
        'Your profile has been updated successfully.',
      );
    } catch (error) {
      console.error(error);
      Alert.alert('Update Failed', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <View>
          <Text>ProfileScreen</Text>
        </View>

        <View>
          <Button title="Update Profile" onPress={() => {}} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  profileContainer:{
    width: windowWidth * 0.8,
  }
});
