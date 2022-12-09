import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState("");
  const getUser = async () => {
    console.log("getUser");
    const store = await AsyncStorage.getAllKeys();
    const userData = await AsyncStorage.getItem("user");
    // console.log(store == null ? "" : store, userData == null ? "" : userData);
    setUser(JSON.parse(userData));
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <Text>Welcome</Text>
      <Text style={{ fontSize: 30, fontWeight: "600" }}>{user?.name}</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
