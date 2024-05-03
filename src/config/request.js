import {PermissionsAndroid} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const requestStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Access Storage',
        message: 'This app needs access to your storage to read files',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can read the storage');
      return true; // Permission has been granted
    } else {
      console.log('Storage permission denied');
      return false; // Permission denied
    }
  } catch (err) {
    console.warn(err);
    return false; // An error occurred
  }
};

export const fetchPdfMetadata = async () => {
  try {
    const snapshot = await firestore().collection('pdfs').get();
    const pdfData = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    console.log(pdfData); // Optional: log data to see the structure and for debugging
    return pdfData;
  } catch (error) {
    console.error('Error retrieving PDF metadata:', error);
    return []; // Return empty array on error or you may handle errors differently
  }
};


export const fetchSingleBookDetails = async (documentId) => {
  try {
    const documentSnapshot = await firestore().collection('pdfs').doc(documentId).get();
    if (documentSnapshot.exists) {
      console.log('PDF Data:', documentSnapshot.data());
      return { success: true, data: documentSnapshot.data() };
    } else {
      return { success: false, message: 'No such document exists' };
    }
  } catch (error) {
    console.error('Error fetching PDF details:', error);
    return { success: false, message: 'Error retrieving PDF details' };
  }
};

export const fetchCategories = async () => {
  try {
    const querySnapshot = await firestore().collection('pdfs').get();
    const categories = new Set();
    querySnapshot.forEach(doc => {
      if (doc.exists && doc.data().category) {
        // Split categories by commas and trim spaces
        const categoryList = doc
          .data()
          .category.split(',')
          .map(item => item.trim());
        // Add each category individually to the Set
        categoryList.forEach(category => categories.add(category));
      }
    });
    console.log('Categories:', Array.from(categories)); // Logs the array of categories
    return Array.from(categories); // Converts Set to Array to return
  } catch (error) {
    console.error('Error fetching categories:', error);
    return []; // Return an empty array on error
  }
};

export const fetchUserData = async () => {
  if (user) {
    const userProfile = await firestore()
      .collection('users')
      .doc(user.uid)
      .get();
    if (userProfile.exists) {
      const userData = userProfile.data();
      setName(userData.name || '');
      setBio(userData.bio || '');
    }
  }
};

export const handleSearch = async (searchQuery, setResults, setLoading) => {
  if (searchQuery) {
    setLoading(true); // Assuming you manage loading state outside
    try {
      const querySnapshot = await firestore()
        .collection('pdfs')
        .where('title', '>=', searchQuery)
        .where('title', '<=', searchQuery + '\uf8ff')
        .get();

      if (!querySnapshot.empty) {
        const fetchedResults = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setResults(fetchedResults); // Assuming you manage results state outside
      } else {
        console.log('No results found.');
        setResults([]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Search error:', error);
      setLoading(false);
    }
  }
};

export default requestStoragePermission;
