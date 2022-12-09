import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Input, Image, Button } from "react-native-elements";
import { Icon } from "react-native-elements";
import { storeData, retrieveData } from "../hooks/localStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { StatusBar } from "expo-status-bar";

const LoginScreen = ({ navigation }) => {
  const baseUrl = "https://pos-api-v1-production.up.railway.app/api";
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  // LOADNING SCREEN
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState(0);

  const submitLogin = async () => {
    // console.log(email, pass);
    // navigation.replace("Home");
    setIsLoading(true);

    // AXIOS LOGIN REQUEST
    axios
      .post(`${baseUrl}/user/login`, {
        email: email,
        password: pass,
      })
      .then(async (response) => {
        console.log(response.status);
        if (response.status === 200) {
          setIsLoading(false);
          console.log(response.data.access_token);

          try {
            await AsyncStorage.setItem("token", response.data.access_token);
            await AsyncStorage.setItem(
              "user",
              JSON.stringify(response.data.user)
            );
          } catch (error) {
            console.log("storeError:", error);
          } finally {
            console.log("Login Success");
            navigation.replace("Home");
          }

          // await AsyncStorage.setItem("USER", "login");
          // showAlert();
          // setTimeout(() => {
          // }, 2000);
        }
        const store = await AsyncStorage.getAllKeys();
        const token = await AsyncStorage.getItem("user");
        console.log(store, token);
      })
      .catch(async (error) => {
        // await AsyncStorage.setItem("USER", "login");
        // // console.log(response.status);
        // navigation.replace("Home");
        console.log("error", error);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar style="light" />
      <Image source={require("../assets/tcm.jpg")} style={styles.logo} />
      <View style={styles.inputContainer}>
        <Input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          leftIcon={<Icon name="user" type="feather" size={24} color="black" />}
        />
        <Input
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={pass}
          onChangeText={(text) => setPass(text)}
          leftIcon={
            <Icon name="key" type="ant-design" size={24} color="black" />
          }
        />
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => submitLogin()}
            title="Login"
            style={styles.inputButton}
            buttonStyle={{ backgroundColor: "#ed3833" }}
          />
        </View>
      </View>
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
    marginBottom: 20,
  },
  inputContainer: {
    width: 300,
  },
  buttonContainer: {
    width: 200,
    marginVertical: 10,
    marginHorizontal: 50,
  },
  inputButton: {
    width: "100%",
  },
});
