import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Image } from "react-native-elements";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Login");
    }, 3000);
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Image source={require("../assets/tcm.jpg")} style={styles.logo} />
      <Text style={styles.text}>TCM</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 150,
    width: 150,
    // marginBottom: 20,
  },
  text: {
    // width: "100%",
    fontSize: 25,
    color: "red",
    fontWeight: "500",
    fontFamily: "Times New Roman",
  },
});
