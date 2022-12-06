import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Input, Image, Button } from "react-native-elements";
import { Icon } from "react-native-elements";
// import { Icon } from "@rneui/themed";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  useLayoutEffect(() => {});

  const submitLogin = () => {
    console.log(email, pass);
    navigation.replace("Home");
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
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
        <Button
          onPress={() => submitLogin()}
          title="Login"
          style={styles.inputButton}
          buttonStyle={{ backgroundColor: "#ed3833" }}
        />
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
  inputButton: {
    width: 200,
    marginHorizontal: 50,
    marginVertical: 10,
  },
});
