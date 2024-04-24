import React from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";

const SettingScreen = () => {

    return(
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Setting</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1, 
    }
})

export default SettingScreen