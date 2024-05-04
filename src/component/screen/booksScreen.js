import React, {useEffect, useState} from 'react';
import {View, StyleSheet, SafeAreaView, Text, Button} from 'react-native';
import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';
import RNFS from 'react-native-fs';
import requestStoragePermission from '../../config/request';
import { windowWidth } from '../../config/courseStyle';

const BooksScreen = ({navigation}) => {
  useEffect(() => {
    

   
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style= {styles.mainContain}>
        <Text>BOOKS</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainContain:{
    width: windowWidth*0.9,
    alignItems: 'center',
    // justifyContent: ''
  }
});

export default BooksScreen;
