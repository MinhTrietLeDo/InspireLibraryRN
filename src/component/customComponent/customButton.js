import React from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {windowHeight, windowWidth} from '../../config/courseStyle';

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
});
