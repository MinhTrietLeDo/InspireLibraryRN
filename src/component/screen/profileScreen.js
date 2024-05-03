import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {windowHeight, windowWidth} from '../../config/courseStyle';
import firestore from '@react-native-firebase/firestore';
// import { fetchUserData } from '../../config/request';

const ProfileScreen = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = auth().currentUser;
        const userProfile = await firestore()
          .collection('users')
          .doc(user.uid)
          .get();
        if (userProfile.exists) {
          setProfile(userProfile.data());
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        Alert.alert('Error', 'Unable to fetch profile data');
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  // const handleUpdate = async profile => {
  //   setLoading(true);
  //   const user = auth().currentUser;

  //   const updateFirestore = firestore()
  //     .collection('users')
  //     .doc(user.uid)
  //     .update({
  //       name: profile.name,
  //       email: profile.email,
  //       phone: profile.phone,
  //       // Additional fields can be updated similarly
  //     });

  //   const updateAuth = user.updateProfile({
  //     displayName: profile.name,
  //     // Other auth profile details can be updated here if needed
  //   });

  //   try {
  //     await Promise.all([updateFirestore, updateAuth]);
  //     Alert.alert('Profile updated successfully!');
  //   } catch (error) {
  //     console.error('Error updating profile:', error);
  //     Alert.alert('Failed to update profile.', error.message);
  //   }
  //   setLoading(false);
  // };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const user = auth().currentUser;
      await Promise.all([
        firestore().collection('users').doc(user.uid).update(profile),
        user.updateProfile({displayName: profile.name}),
      ]);
      // Alert.alert('Success', 'Profile updated successfully!');
      console.log('UPDATED')
    } catch (error) {
      console.error('Error updating profile:', error);
      // Alert.alert('Error', 'Failed to update profile.');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={profile.name}
        onChangeText={text => setProfile({...profile, name: text})}
      />
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={profile.email}
        onChangeText={text => setProfile({...profile, email: text})}
      />
      <Text style={styles.label}>Phone:</Text>
      <TextInput
        style={styles.input}
        value={profile.phone}
        onChangeText={text => setProfile({...profile, phone: text})}
      />
      <Button
        title="Update Profile"
        onPress={handleUpdate}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  input: {
    fontSize: 16,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
});

export default ProfileScreen;
