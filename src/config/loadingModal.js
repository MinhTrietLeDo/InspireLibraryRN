import React from 'react';
import {Modal, ActivityIndicator, StyleSheet, View, Text} from 'react-native';

const LoadingModal = loading => {
  return (
    <Modal transparent={true} animationType="none" visible={loading}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator size="large" animating={loading} />
          <Text style={styles.loadingText}>Creating your account...</Text>
        </View>
      </View>
    </Modal>
  );
};
export default LoadingModal

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  loadingText: {
    textAlign: 'center',
  },
});
