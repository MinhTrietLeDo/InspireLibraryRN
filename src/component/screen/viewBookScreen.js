import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Button,
  ActivityIndicator,
  Image,
  ScrollView,
  RefreshControl,
  Alert,
  Dimensions
} from 'react-native';
import {
  fetchSingleBookDetails,
  handleAddToFavorites,
  checkIfFavorite,
} from '../../config/request';
import {sizeText, windowHeight, windowWidth} from '../../config/courseStyle';
import {AddToFavButton, ReadButton} from '../customComponent/customButton';

const ViewBooksScreen = ({route, navigation}) => {
  //   const [filePath, setFilePath] = useState('src/banners/1.jpeg');
  const {bookId} = route.params;
  const [pdfDetails, setPdfDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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
    checkIfFavorite(bookId, setIsFavorite, setLoading);
  }, [bookId]);
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const addToFavorites = async () => {
    const result = await handleAddToFavorites(
      bookId,
      setIsFavorite,
      setLoading,
    );
    console.log(result);
    if (result.message === 'PDF added to favorites') {
      Alert.alert('Alert', 'Added to favorite!', [
        {
          text: 'OK',
          onPress: () => checkIfFavorite(bookId, setIsFavorite, setLoading),
        },
      ]);
    }
    if (result.message === 'PDF removed from favorites') {
      Alert.alert('Alert', 'Removed from favorite!', [
        {
          text: 'OK',
          onPress: () => checkIfFavorite(bookId, setIsFavorite, setLoading),
        },
      ]);
    } else {
      // alert(result.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.coverImageContainer}>
          {pdfDetails && (
            <Image
              source={{uri: pdfDetails.coverImageUrl}}
              style={styles.image}
              resizeMode="cover"
            />
          )}
        </View>
        {pdfDetails && (
          <View style={styles.textHeader}>
            <Text style={styles.header1}>{pdfDetails.title}</Text>
            <Text style={styles.header2}>{pdfDetails.author}</Text>
          </View>
        )}

        {pdfDetails && (
          <View style={styles.scrollContain}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.BasicContainer}>
                <View style={styles.TagsAndDate}>
                  <Text>Publish Date: </Text>
                  <Text>{pdfDetails.publishDate}</Text>
                </View>

                <View style={styles.TagsAndDate}>
                  <Text>Category: </Text>
                  <Text>{pdfDetails.category}</Text>
                </View>
              </View>
              <View style={styles.SummaryContainer}>
                <Text style={{fontSize: sizeText.h40, fontWeight: 'bold'}}>
                  Summary:
                </Text>
                <Text
                  style={{
                    fontSize: sizeText.h26,
                    textAlign: 'justify',
                    padding: 5,
                  }}>
                  {pdfDetails.summary}
                </Text>
              </View>
            </ScrollView>
          </View>
        )}

        <View style={styles.Buttons}>
          <ReadButton
            title="Read"
            loading={loading}
            onPress={() =>
              navigation.navigate('ReadBook', {bookURL: pdfDetails.pdfUrl})
            }
          />
          <AddToFavButton
            title={isFavorite ? 'Remove from Favorite' : 'Add to Favorite'}
            onPress={() => addToFavorites()}
            loading={loading}
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
    width: windowWidth * 0.93,
    // backgroundColor: 'black',
    // maxHeight: windowHeight * 0.85,
    justifyContent: 'space-between',
    overflow: 'hidden'
  },
  image: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.3,
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
    height: windowHeight * 0.41,
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
  Buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // position: 'absolute',
    // // bottom: Dimensions.get('window').height/100*5,
    // left: 0,
    // right: 0,
    // bottom: 0,
    // // top:"100%",
    overflow: "hidden"
  },
  BasicContainer: {
    // flexDirection: 'row',
    justifyContent: 'space-evenly',
    // backgroundColor: 'black',
    width: windowWidth * 0.85,
    alignContent: 'center',
    alignSelf: 'center',
  },
  TagsAndDate: {
    flexDirection: 'row',
  },
  SummaryContainer: {
    marginTop: windowHeight * 0.01,
  },
});

export default ViewBooksScreen;
