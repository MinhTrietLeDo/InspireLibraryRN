import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import {sizeText, windowHeight, windowWidth} from '../../config/courseStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({navigation}) => {
  const [searchInput, setSearchInput] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={(windowHeight + windowWidth) * 0.02} />
          <TextInput
            placeholder="Search ..."
            autoCapitalize="none"
            onChangeText={searchInput => setSearchInput(searchInput)}
            value={searchInput}
            style={styles.textInput}
          />
        </View>
        <ScrollView></ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  subContainer: {
    width: windowWidth * 0.8,
    maxHeight: windowHeight * 0.8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: (windowHeight + windowWidth) * 0.02,
    padding: (windowHeight + windowWidth) * 0.003,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 10,
  },
  textInput: {
    width: '90%',
    flex: 1,
    backgroundColor: '#F0F0F0',
    color: '#424242',
    padding: 10,
    fontSize: sizeText.h24,
    // // No borders for the input field
    // borderWidth: 0,
  },
});
