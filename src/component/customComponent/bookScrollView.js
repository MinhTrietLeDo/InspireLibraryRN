import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const BookComponent = ({items})  => {
  return (
    <View style={styles.itemsList}>
      {items.map((item, index) => {
        return (
          <View key={index}>
            <Text style={styles.itemtext}>{item.name}</Text>
          </View>
        );
      })}
    </View>
  );
}

export default BookComponent

const styles = StyleSheet.create({
  itemsList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  itemtext: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});