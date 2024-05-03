// import Pdf from 'react-native-pdf';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import storage from '@react-native-firebase/storage';

const ReadBookScreen = ({route}) => {
  const bookURL = route.params.bookURL;
  const [downloadURL, setDownloadURL] = useState('');
  const convertGsToHttps = async gsUrl => {
    if (!gsUrl) {
      console.error('No GS URL provided');
      return null;
    }

    try {
      const filePath = gsUrl.split('gs://')[1]; // Extract the path part from the GS URL
      if (!filePath) {
        console.error('Invalid GS URL format');
        return null; // Return null if the URL format is invalid
      }

      const fileRef = storage().refFromURL(gsUrl); // Get a reference to the storage location

      const downloadUrl = await fileRef.getDownloadURL(); // Retrieve the HTTPS URL
      console.log('Download URL:', downloadUrl);
      return downloadUrl; // Return the HTTPS URL
    } catch (error) {
      console.error('Error getting download URL:', error);
      return null; // Return null if there is an error fetching the URL
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
    <SafeAreaView>
      {/* <Pdf
        source={{uri: downloadURL}}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onError={error => {
          console.log(error);
        }}
        style={{flex: 1}}
      /> */}
    </SafeAreaView>
  );
};

export default ReadBookScreen;
