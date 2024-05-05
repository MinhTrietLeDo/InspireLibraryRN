import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Platform,
  TextInput
} from 'react-native';
import {windowHeight, windowWidth} from '../../config/courseStyle';
import {fetchFavorites} from '../../config/request';
import {sizeText} from '../../config/courseStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const BooksScreen = ({navigation}) => {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);


  useEffect(() => {
    fetchFavoriteBook();
  }, []);

  const fetchFavoriteBook = async () => {
    fetchFavorites().then(favoriteBooks => {
      setFavoriteBooks(favoriteBooks);
      setLoading(false);
    });
  };

  const onRefresh = useCallback(() => {
    console.log('MMMMMMMMMMHHHHHM, REFRESHING!!');
    setRefreshing(true);
    fetchFavoriteBook();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, [refreshing]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContain}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={(windowHeight + windowWidth) * 0.02} />
          <TextInput
            placeholder="Search ..."
            autoCapitalize="none"
            onChangeText={searchInput => setSearchInput(searchInput)}
            value={searchInput}
            style={styles.textInput}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onEndEditing={() => {
              // if (Platform.OS === 'android') {
              //   handleSearch(searchInput, setPdfs, setLoading);
              // }
            }}
          />
          {isFocused && (
            <TouchableOpacity
              // onPress={() => handleSearch(searchInput, setPdfs, setLoading)}
              >
              <AntDesign
                name="enter"
                size={(windowHeight + windowWidth) * 0.02}
              />
            </TouchableOpacity>
          )}
        </View>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={{
              // justifyContent: 'space-evenly',
              alignItems: 'stretch',
              flexGrow: 1,
              // backgroundColor: 'black',
              width: windowWidth * 0.9,
            }}
            data={favoriteBooks}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() =>
                  navigation.navigate('BookDetails', {
                    bookId: item.id,
                  })
                }>
                <View style={styles.BooksTitle}>
                  <View style={styles.coverContainer}>
                    <Image
                      source={{uri: item.coverImageUrl}}
                      style={styles.image}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={styles.Metadata}>
                    <Text
                      style={{
                        fontSize: sizeText.h40,
                        // textAlign: 'center',
                        fontWeight: 'bold',
                        width: windowWidth * 0.7,
                      }}>
                      {item.title}
                    </Text>
                    <Text style={{fontSize: sizeText.h26}}>{item.author}</Text>
                  </View>
                </View>
                <View style={styles.seperate} />
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  mainContain: {
    width: windowWidth * 0.9,
    alignItems: 'center',
  },
  image: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.1,
    marginVertical: (windowHeight + windowWidth) * 0.005,
    borderRadius: (windowHeight + windowWidth) * 0.01,
  },
  seperate: {
    height: windowHeight * 0.0015,
    borderColor: 'black',
    backgroundColor: 'black',
    borderRadius: (windowHeight + windowWidth) * 0.1,
  },
  itemContainer: {
    width: '100%',
    textAlign: 'center',
  },
  Metadata: {
    marginLeft: 10,
    height: windowHeight * 0.2,
    alignContent: 'center',
    alignSelf: 'center',
    // backgroundColor: 'black',
    justifyContent: 'center',
  },
  BooksTitle: {
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: (windowHeight + windowWidth) * 0.02,
    padding: (windowHeight + windowWidth) * 0.003,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: windowHeight*0.1,
    justifyContent: 'space-evenly',
  },
  textInput: {
    // width: '50%',
    flex: 1,
    backgroundColor: '#F0F0F0',
    color: '#424242',
    padding: 10,
    fontSize: sizeText.h24,
  },
});

export default BooksScreen;
