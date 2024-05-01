import {PermissionsAndroid} from 'react-native';

async function requestStoragePermission() {
    try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: "Access Storage",
            message: "This app needs access to your storage to read files",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
    
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can read the storage");
          return true; // Permission has been granted
        } else {
          console.log("Storage permission denied");
          return false; // Permission denied
        }
      } catch (err) {
        console.warn(err);
        return false; // An error occurred
      }
}

export default requestStoragePermission;
