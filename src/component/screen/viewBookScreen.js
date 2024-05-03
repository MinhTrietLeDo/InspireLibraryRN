import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Button,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';
import {fetchSingleBookDetails} from '../../config/request';
import {sizeText, windowHeight, windowWidth} from '../../config/courseStyle';
import { AddToFavButton, ReadButton } from '../customComponent/customButton';

const ViewBooksScreen = ({route}) => {
  //   const [filePath, setFilePath] = useState('src/banners/1.jpeg');
  const {bookId} = route.params;
  const [pdfDetails, setPdfDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchSingleBookDetails(bookId);
      if (result.success) {
        setPdfDetails(result.data);
      } else {
        alert(result.message);
      }
      setLoading(false);
    };

    fetchData();
  }, [bookId]);
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.coverImageContainer}>
          <Image
            source={{uri: pdfDetails.coverImageUrl}}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.textHeader}>
          <Text style={styles.header1}>{pdfDetails.title}</Text>
          <Text style={styles.header2}>{pdfDetails.author}</Text>
        </View>

        <View style={styles.scrollContain}>
          <ScrollView>
            <View>
              <Text>{pdfDetails.summary}</Text>
            </View>
          </ScrollView>
        </View>

        <View style={styles.Buttons}>
          <ReadButton
            title='Read'
          />
          <AddToFavButton 
            title= 'Add To Favorite'
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  mainContainer: {
    marginTop: windowHeight * 0.01,
    width: windowWidth * 0.9,
    // backgroundColor: 'black',
    height: windowHeight*0.89
  },
  image: {
    width: windowWidth * 0.55,
    height: windowHeight * 0.35,
    marginVertical: (windowHeight + windowWidth) * 0.005,
    borderRadius: (windowHeight + windowWidth) * 0.01,
  },
  coverImageContainer: {
    alignContent: 'center',
    alignItems: 'center',
  },
  textHeader: {
    alignContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'black',
    width: '80%',
    alignSelf: 'center',
  },
  header1: {
    fontSize: sizeText.h36,
    fontWeight: 'bold',
  },
  header2: {
    fontSize: sizeText.h30,
  },
  scrollContain: {
    height: windowHeight * 0.38,
    backgroundColor: 'white',
    marginBottom: windowHeight * 0.01,
    marginTop: windowHeight * 0.01,
    padding: 5,
    borderRadius: (windowHeight + windowWidth) * 0.01,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    alignItems: 'center',
    overflow: 'hidden',
    borderColor: 'transparent',
  },
  Buttons:{
    flexDirection: 'row', 
    justifyContent: 'space-around',
    bottom: 0,
    position: 'absolute',
    left: 0,
    right: 0
  }
});

export default ViewBooksScreen;
