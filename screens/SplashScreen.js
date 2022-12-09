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
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const clearStorage = async () => {
    await AsyncStorage.clear();
  };

  const checkLogin = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };
  console.log("isLogin", isLoggedIn);
  useEffect(() => {
    checkLogin();
    setTimeout(() => {
      if (isLoggedIn === false) {
        navigation.replace("Login");
      } else {
        navigation.replace("Home");
      }
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
    height: 130,
    width: 130,
  },
  text: {
    fontSize: 25,
    color: "red",
    fontWeight: "600",
    fontFamily: "Times New Roman",
  },
});
