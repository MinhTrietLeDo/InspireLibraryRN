// import Pdf from 'react-native-pdf';
import React, {useEffect, useState} from 'react';
import {Alert, SafeAreaView} from 'react-native';
import storage from '@react-native-firebase/storage';
import Pdf from 'react-native-pdf';

const ReadBookScreen = ({route, navigation}) => {
  const bookURL = route.params.bookURL;
  const [downloadURL, setDownloadURL] = useState('');
  const convertGsToHttps = async gsUrl => {
    if (!gsUrl) {
      console.error('No GS URL provided');
      return null;
    }

    try {
      const filePath = gsUrl.split('gs://')[1];
      if (!filePath) {
        console.error('Invalid GS URL format');
        Alert.alert('Error', 'Please try again later!', [{
            text: 'OK',
            onPress: () => navigation.goBack(),
        }]);
        return null;
      }

      const fileRef = storage().refFromURL(gsUrl);

      const downloadUrl = await fileRef.getDownloadURL();
      console.log('Download URL:', downloadUrl);
      return downloadUrl; // Return the HTTPS URL
    } catch (error) {
      console.error('Error getting download URL:', error);
      return null;
    }
  };

  useEffect(() => {
    const gsUrl = bookURL;
    convertGsToHttps(gsUrl)
      .then(downloadUrl => {
        if (downloadUrl) {
          console.log('HTTPS URL:', downloadUrl);
          setDownloadURL(downloadUrl);
        } else {
          console.log('Failed to convert GS URL');
        }
      })
      .catch(error => {
        console.error('Error in converting URL:', error);
      });
  }, []);

  return (
    <Pdf
      trustAllCerts={false}
      source={{uri: downloadURL}}
      onLoadComplete={(numberOfPages, filePath) => {
        console.log(`Number of pages: ${numberOfPages}`);
      }}
      onError={error => {
        console.log(error);
      }}
      style={{flex: 1}}
    />
  );
};

export default ReadBookScreen;
