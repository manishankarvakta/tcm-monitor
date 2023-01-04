import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Onboarding from "react-native-onboarding-swiper";
import { Image } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OnbordingScreen = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(false);
  const checkLogin = async () => {
    const token = await AsyncStorage.getItem("token");
    // console.log(token);
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };
  useEffect(() => {
    checkLogin();
  }, []);
  return (
    <Onboarding
      onSkip={() =>
        isLogin === true
          ? navigation.replace("Home")
          : navigation.replace("Login")
      }
      onDone={() =>
        isLogin === true
          ? navigation.replace("Home")
          : navigation.replace("Login")
      }
      pages={[
        {
          backgroundColor: "#ed3833",
          image: (
            <Image
              style={{ height: 180, width: 235 }}
              source={require("../assets/report.png")}
            />
          ),
          title: "Today's Sale",
          subtitle: "Anylitics of todays Sale",
        },
        {
          backgroundColor: "#ed3833",
          image: (
            <Image
              style={{ height: 180, width: 235 }}
              source={require("../assets/list.png")}
            />
          ),
          title: "List Of Invoice",
          subtitle: "List of todays sale invoice",
        },
        {
          backgroundColor: "#ed3833",
          image: (
            <Image
              style={{ height: 180, width: 200 }}
              source={require("../assets/invoice.png")}
            />
          ),
          title: "Invoice Details",
          subtitle: "View Details of Invoice",
        },
      ]}
    />
  );
};

export default OnbordingScreen;

const styles = StyleSheet.create({});
