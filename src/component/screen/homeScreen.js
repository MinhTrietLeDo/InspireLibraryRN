import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {sizeText, windowHeight, windowWidth} from '../../config/courseStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({navigation}) => {
  const categories = ['Self-help', 'Novel', 'Science', 'Romance', 'Crime'];

  const [searchInput, setSearchInput] = useState('');
  const [activeTab, setActiveTab] = useState(categories[0]);
  const books = [{id: '1', title: 'Atomic Habits', author: 'James Clear'}];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={(windowHeight + windowWidth) * 0.02} />
          <TextInput
            placeholder="Search ..."
            autoCapitalize="none"
            onChangeText={searchInput => setSearchInput(searchInput)}
            value={searchInput}
            style={styles.textInput}
          />
        </View>
        <View style={styles.scrollViewContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tabsContainer}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={category}
                style={[styles.tab, activeTab === category && styles.activeTab]}
                onPress={() => setActiveTab(category)}>
                <Text style={styles.tabText}>{category}</Text>
                {activeTab === category && (
                  <View style={styles.activeTabIndicator} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.booksContainer}>
          <ScrollView style={styles.bookScroll}>
            {/* WHAT'S NEW */}
            <Text style={{fontSize: sizeText.h40, fontWeight: 'bold'}}>
              WHAT'S NEW
            </Text>
            <View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View>
                  <Text>123</Text>
                </View>
              </ScrollView>
            </View>
            {/* WHAT'S NEW */}

            <Text>========================</Text>

            {/* MOST POPULAR */}
            <Text style={{fontSize: sizeText.h40, fontWeight: 'bold'}}>
              MOST POPULAR
            </Text>
            <View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View>
                  <Text>123</Text>
                </View>
              </ScrollView>
            </View>
            {/* MOST POPULAR */}
            <Text>========================</Text>
          </ScrollView>
        </View>
      </View>
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
    width: windowWidth * 0.9,
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
  },
  textInput: {
    width: '90%',
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
  },
  booksContainer: {
    height: windowHeight * 0.5,
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
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    // backgroundColor: 'black',
    textAlign: 'center',
    width: windowWidth * 0.16,
  },
  activeTabIndicator: {
    height: 2,
    backgroundColor: 'red',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
