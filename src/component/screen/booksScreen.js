import React, {useEffect, useState} from 'react';
import {View, StyleSheet, SafeAreaView, Text, Button} from 'react-native';
import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';
import RNFS from 'react-native-fs';
import requestStoragePermission from '../../config/request';

const BooksScreen = () => {
  //   const [filePath, setFilePath] = useState('src/banners/1.jpeg');

  useEffect(() => {
    const checkFileExists = async path => {
      const fileExists = await RNFS.exists(path);
      console.log(fileExists ? 'File exists' : 'File does not exist');
      return fileExists;
    };

    // Usage
    checkFileExists('/path/to/your/file.pdf').then(exists => {
      if (exists) {
        // Proceed with upload
      } else {
        console.log('The file does not exist at the specified path.');
      }
    });

    requestStoragePermission()
  }, []);

  const uploadFile = async (filePath, storagePath) => {
    try {
      // Create a reference to the Firebase Storage location
      const reference = storage().ref(storagePath);

      // Start the file upload
      const task = await reference.putFile(filePath);

      // After uploading, get the download URL
      const downloadURL = await reference.getDownloadURL();
      console.log('File available at', downloadURL);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  };

  const handleUpload = () => {
    // Example static file path (e.g., might be bundled with app or fetched from somewhere)
    const localFilePath = '../../banners/1.jpeg';
    const firebaseStoragePath = 'uploads/test/1.jpeg';

    uploadFile(localFilePath, firebaseStoragePath)
      .then(downloadUrl => {
        if (downloadUrl) {
          console.log('File successfully uploaded to:', downloadUrl);
        }
      })
      .catch(error => {
        console.log('Failed to upload file:', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>BOOKS</Text>
        {/* <Button title="test upload" onPress={() => handleUpload()} /> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BooksScreen;
