import React from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {sizeText, windowHeight, windowWidth} from '../../config/courseStyle';

const CustomButton = ({onPress, title, loading}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.button}
      disabled={loading}>
      {loading ? (
        <ActivityIndicator size="small" color="#FFFFFF" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

export const ReadButton = ({onPress, title}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.readButton}
      >
      {/* {loading ? (
        <ActivityIndicator size="small" color="#FFFFFF" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )} */}
      <Text style={styles.text2}>{title}</Text>
    </TouchableOpacity>
  );
};

export const AddToFavButton = ({onPress, title}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.addToFavButton}
      >
      {/* {loading ? (
        <ActivityIndicator size="small" color="#FFFFFF" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )} */}
      <Text style={styles.text2}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: (windowHeight + windowWidth) * 0.012,
    backgroundColor: '#1E6738',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  text2: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: sizeText.h26,
    fontWeight: 'bold'
  },
  readButton:{
    backgroundColor: '#D45555',
    borderRadius: 5,
    padding: (windowHeight + windowWidth) * 0.012,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth*0.35
  },
  addToFavButton:{
    backgroundColor: 'black',
    borderRadius: 5,
    padding: (windowHeight + windowWidth) * 0.012,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth*0.35
  }
});
