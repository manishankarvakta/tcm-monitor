import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button } from "react-native-elements";
const baseUrl = "https://pos-api-v1-production.up.railway.app/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";

const HomeScreen = async ({ navigation }) => {
  const [user, setUser] = useState();

  useLayoutEffect(() => {}, [navigation]);

  // console.log(user);

  // console.log(user);

  const logOut = () => {
    // storeData("@user", "");
    // storeData("@access_token", "");
    navigation.replace("Login");
  };

  // console.log(user);
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Button title="Log Out" onPress={() => getUser()} />
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
