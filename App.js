import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import SplashScreen from "./screens/SplashScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import SalesScreen from "./screens/SalesScreen";
import UserProfile from "./screens/UserProfile";
import InvoiceScreen from "./screens/InvoiceScreen";
import OnbordingScreen from "./screens/OnbordingScreen";

const Stack = createStackNavigator();

const globalOptions = {
  headerStyle: {
    backgroundColor: "#ed3833",
  },
  headerTitleAlign: "center",
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

export default function App() {
  const [isFirst, setIsFirst] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("alreadyLaunched", "false");
        setIsFirst(false);
      } else {
        setIsFirst(false);
      }
    });
  }, []);

  // console.log(isFirst);
  if (isFirst === null) {
    return null;
  } else if (isFirst === false) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={globalOptions}>
          <Stack.Screen
            name="Onbord"
            options={{ headerShown: false }}
            component={OnbordingScreen}
          />

          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Sales" component={SalesScreen} />
          <Stack.Screen name="Profile" component={UserProfile} />
          <Stack.Screen name="Invoice" component={InvoiceScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={globalOptions}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Sales" component={SalesScreen} />
          <Stack.Screen name="Profile" component={UserProfile} />
          <Stack.Screen name="Invoice" component={InvoiceScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
