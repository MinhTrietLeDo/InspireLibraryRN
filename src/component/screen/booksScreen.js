import React from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";

const BooksScreen = () => {

    return(
        <SafeAreaView style={styles.container}>
            <View>
                <Text>BOOKS</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1, 
    }
})

export default BooksScreen