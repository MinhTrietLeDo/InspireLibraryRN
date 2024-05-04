import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {sizeText, windowHeight, windowWidth} from '../../config/courseStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import {
  fetchCategories,
  fetchPDFsFromCategory,
  fetchPdfMetadata,
  handleSearch,
} from '../../config/request';

const HomeScreen = ({navigation}) => {
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState('');

  const isAndroid = Platform.OS === 'android';

  const [searchInput, setSearchInput] = useState('');
  const [displayName, setDisplayName] = useState('User');
  const [pdfs, setPdfs] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCurrentUserDetails();
    fetchPdfMetadata().then(setPdfs);
    loadCategories();

    console.log('ACTIVE TAB:', activeTab);
  }, []);

  // const loadCategories = async () => {
  //   const fetchedCategories = await fetchCategories();
  //   setCategories(fetchedCategories);
  //   if (fetchedCategories.length > 0) {
  //     setActiveTab(fetchedCategories[0]); // Set the first category as the active tab initially
  //   }
  // };

  const loadCategories = async () => {
    const fetchedCategories = await fetchCategories();
    console.log('Fetched categories:', fetchedCategories);

    // Map fetched category strings to objects with a 'name' property
    const categoriesAsObjects = fetchedCategories.map(category => ({
      name: category,
    }));

    // Prepend the "All" category to the transformed list
    const allCategories = [{name: 'All'}, ...categoriesAsObjects];
    setCategories(allCategories);

    // Set "All" as the active tab initially
    if (allCategories.length > 0) {
      setActiveTab(allCategories[0]); // Ensure this is an object with a 'name' property
    } else {
      console.error('No categories fetched or first category has no name');
    }
  };

  const onRefresh = useCallback(() => {
    console.log('MMMMMMMMMMHHHHHM, REFRESHING!!');
    setRefreshing(true);
    getCurrentUserDetails();
    fetchPdfMetadata().then(setPdfs);
    loadCategories();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, [refreshing]);

  const getCurrentUserDetails = () => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      console.log('123123123123123123123123', user);
      if (user) {
        console.log('Auth State:', user.email, user.displayName);
        if (user.name === null) {
          // console.log('NULL');
          setDisplayName(user.email);
        } else {
          setDisplayName(user.displayName);
        }
      } else {
        console.log('User has signed out or no user.');
      }
    });

    return () => unsubscribe();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        scrollEnabled={false}
        style={{width: '100%', maxHeight: windowHeight * 0.9}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.welcomeText}>
          <Text style={{fontSize: sizeText.h26, fontWeight: 'bold'}}>
            Welcome back, {displayName}!
          </Text>
          <Text style={{fontSize: sizeText.h40, fontWeight: 'bold'}}>
            What do you want to read today?
          </Text>
        </View>
        <View style={styles.subContainer}>
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={(windowHeight + windowWidth) * 0.02}
            />
            <TextInput
              placeholder="Search ..."
              autoCapitalize="none"
              onChangeText={searchInput => setSearchInput(searchInput)}
              value={searchInput}
              style={styles.textInput}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onEndEditing={() => {
                if (Platform.OS === 'android') {
                  handleSearch(searchInput, setPdfs, setLoading);
                }
              }}
            />
            {isFocused && (
              <TouchableOpacity
                onPress={() => handleSearch(searchInput, setPdfs, setLoading)}>
                <AntDesign
                  name="enter"
                  size={(windowHeight + windowWidth) * 0.02}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.scrollViewContainer}>
            <View style={styles.tagContainer}>
              <FlatList
                scrollEnabled={true}
                contentContainerStyle={{
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  flexGrow: 1,
                }}
                data={categories}
                keyExtractor={(item, index) => index.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.tabsContainer}
                renderItem={({item: categories}) => {
                  console.log('Category item:', categories);
                  return (
                    <TouchableOpacity
                      key={categories} // This also needs to be specific if `category` is an object
                      style={[
                        styles.tab,
                        activeTab === categories && styles.activeTab,
                      ]}
                      onPress={() => setActiveTab(categories)}>
                      <Text style={styles.tabText}>{categories.name}</Text>
                      {activeTab === categories && (
                        <View style={styles.activeTabIndicator} />
                      )}
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>

          <View style={styles.booksContainer}>
            <View style={styles.bookScroll}>
              {/* WHAT'S NEW */}
              <Text style={{fontSize: sizeText.h40, fontWeight: 'bold'}}>
                WHAT'S NEW
              </Text>
              <View>
                {loading ? (
                  <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                  <FlatList
                    // refreshControl={
                    //   <RefreshControl
                    //     refreshing={refreshing}
                    //     onRefresh={onRefresh}
                    //   />
                    // }
                    contentContainerStyle={{
                      justifyContent: 'space-evenly',
                      alignItems: 'stretch',
                      flexGrow: 1,
                      // backgroundColor: 'black'
                    }}
                    data={pdfs}
                    numColumns={3}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        style={styles.itemContainer}
                        onPress={
                          // () => {}
                          () =>
                            navigation.navigate('BookDetails', {
                              bookId: item.id,
                            })
                        }>
                        <View
                          style={{
                            alignContent: 'center',
                            alignItems: 'center',
                          }}>
                          <View style={styles.coverContainer}>
                            <Image
                              source={{uri: item.coverImageUrl}}
                              style={styles.image}
                              resizeMode="cover"
                            />
                          </View>
                          <Text
                            style={{
                              fontSize: sizeText.h30,
                              textAlign: 'center',
                            }}>
                            {item.title}
                          </Text>
                          <Text>{item.author}</Text>
                        </View>
                      </TouchableOpacity>
                    )}
                    ListHeaderComponent={() => <View></View>}
                    ListFooterComponent={() => <View></View>}
                  />
                )}
              </View>
              {/* WHAT'S NEW */}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  subContainer: {
    // width: windowWidth * 0.99,
    maxHeight: windowHeight * 0.9,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: (windowHeight + windowWidth) * 0.02,
    padding: (windowHeight + windowWidth) * 0.003,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 10,
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
  contentContainer: {
    alignItems: 'center',
  },
  card: {
    width: windowWidth * 0.9,
    backgroundColor: 'white',
    borderRadius: (windowHeight + windowWidth) * 0.0001,
    margin: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 15},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    alignItems: 'center',
    overflow: 'hidden',
  },
  scrollViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  tagContainer: {
    paddingLeft: windowWidth * 0.02,
    paddingRight: windowWidth * 0.02,
  },
  booksContainer: {
    height: windowHeight * 0.8,
    backgroundColor: 'white',
    margin: (windowHeight + windowWidth) * 0.01,
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
  bookScroll: {
    width: '100%',
    textAlign: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  tab: {
    flexDirection: 'column',
    padding: 8,
  },
  activeTab: {
    // borderBottomWidth: 2,
    // borderBottomColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    textAlign: 'center',
    width: windowWidth * 0.2,
    height: windowHeight * 0.04,
    fontSize: sizeText.h24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTabIndicator: {
    height: windowHeight * 0.0025,
    backgroundColor: 'red',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.1,
    marginVertical: (windowHeight + windowWidth) * 0.005,
    borderRadius: (windowHeight + windowWidth) * 0.01,
  },
  coverContainer: {
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
    borderColor: 'white',
    // backgroundColor: 'white',
    margin: (windowHeight + windowWidth) * 0.01,
    // padding: 5,
    borderRadius: (windowHeight + windowWidth) * 0.01,
    borderWidth: 0,
  },
  welcomeText: {
    width: windowWidth * 0.6,
    padding: (windowHeight + windowWidth) * 0.01,
  },
  itemContainer: {
    width: windowWidth * 0.3,
    textAlign: 'center',
  },
});
