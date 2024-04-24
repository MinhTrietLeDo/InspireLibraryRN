import React from 'react';
import {View, StyleSheet, Text, Button, SafeAreaView} from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View></View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
