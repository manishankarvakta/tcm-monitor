import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { Avatar, Button } from "react-native-elements";
import { Icon } from "react-native-elements";
import { startOfToday, endOfToday, format, formatDistance } from "date-fns";
import axios from "axios";
import BASE_URL from "../utility/BaseUrl";
// import DatePicker from "react-natives-date-picker";

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState({});

  // DATE PICKER
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  // DASHBOARD DATA
  // BASE URL

  // DATE INIT
  // DATE INIT
  const [endDate, setEndDate] = useState(format(new Date(), "MM-dd-yyyy"));
  const [startDate, setStartDate] = useState(format(new Date(), "MM-dd-yyyy"));
  // const [startDate, setStartDate] = useState("04-21-2023");
  // const [endDate, setEndDate] = useState("04-22-2023");
  const [saleTotal, setSaleTotal] = useState(0);
  const [footFall, setFootFall] = useState(0);
  const [busket, setBusket] = useState(0);

  // GET INFO
  const getData = async () => {
    // console.log(
    //   "console",
    //   `${BASE_URL}/sale/dashboardSale/${startDate}/${endDate}`
    // );
    try {
      await axios
        .get(`${BASE_URL}/sale/dashboardSale/${startDate}/${endDate}`)
        .then((res) => {
          console.log("SALE", res.data);
          setSaleTotal(res?.data);
        });
    } catch (err) {
      console.log("Total", err);
    }
  };
  // const getFootFall = async () => {
  //   try {
  //     await axios
  //       .get(`${BASE_URL}/sale/footfall/${startDate}/${endDate}`)
  //       .then((res) => {
  //         setFootFall(res?.data[0]?.footfall ? res?.data[0]?.footfall : 0);
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const refresh = () => {
    console.log("refresh");
    // getFootFall();
    getData();
  };

  const getUser = async () => {
    // console.log("getUser");
    // const store = await AsyncStorage.getAllKeys();
    const userData = await AsyncStorage.getItem("user");
    setUser(JSON.parse(userData));
  };

  // console.log("date-picker", open);
  // console.log("sale", saleTotal);
  // console.log("footFall", footFall);
  const logOut = async () => {
    try {
      await AsyncStorage.getAllKeys();
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
    } catch (err) {
      console.log("logout error", err);
    } finally {
      navigation.replace("Login");
    }
  };

  useEffect(() => {
    // getFootFall();
    getData();
    getUser();
  }, []);

  useLayoutEffect(() => {
    getUser();
    navigation.setOptions({
      title: "TCM-SALES-MONITOR",
      headerTitleAlign: "left",
      headerStyle: { backgroundColor: "#ed3833" },
      headerTitleStyle: { color: "white" },
      headerTintColor: "black",
      headerLeft: () => {
        return (
          <View style={{ marginLeft: 10 }}>
            <TouchableOpacity>
              <Avatar rounded source={require("../assets/tcm.jpg")} />
            </TouchableOpacity>
          </View>
        );
      },
      headerRight: () => {
        return (
          <View
            style={{
              marginRight: 20,
              flexDirection: "row",
              justifyContent: "flex-end",
              width: 120,
              marginRight: 10,
            }}
          >
            {/* <TouchableOpacity onPress={() => setOpen(true)}> */}
            <Text
              style={{
                marginRight: 10,
                fontWeight: "600",
                color: "#fff",
                fontSize: 16,
              }}
            >
              {format(new Date(), "MM-dd-yyyy")}
            </Text>
            {
              // show && <DateTimePicker date={date} onDateChange={setDate}></DatePicker>
            }
            {/* </TouchableOpacity> */}
            <TouchableOpacity activeOpacity={0.5} onPress={() => logOut()}>
              <Icon name="poweroff" type="ant-design" size={20} />
            </TouchableOpacity>
          </View>
        );
      },
    });
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        // alignItems: "center",
        // justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <StatusBar style="dark" />
      {/* Title */}
      <View style={styles.title}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={{ marginTop: 15, marginRight: 10 }}>
            <Icon
              name="user"
              type="ant-design"
              size={40}
              color="black"
              onPress={() => {
                navigation.navigate("Profile");
              }}
            />
          </TouchableOpacity>
          <View>
            <Text style={{ marginTop: 10, fontSize: 16 }}>Welcome</Text>
            <Text style={{ fontSize: 25, fontWeight: "600", color: "white" }}>
              {user?.name && user.name}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            margin: 20,
            marginLeft: 10,
            padding: 10,
            paddingBottom: 20,
            paddingTop: 15,
            borderRadius: 15,
            backgroundColor: "rgba(0,0,0,.2)",
          }}
        >
          <TouchableOpacity
            style={{ marginRight: 20 }}
            onPress={() => {
              navigation.navigate("Sales");
            }}
          >
            <Icon name="shoppingcart" type="ant-design" size={100} />
          </TouchableOpacity>
          <View>
            <Text
              style={{
                marginTop: 20,
                fontSize: 20,
                fontWeight: "600",
                color: "white",
              }}
            >
              Today's Sale
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 0,
              }}
            >
              <Text style={{ fontSize: 40, fontWeight: "600", color: "white" }}>
                {/* {console.log("saleTotal", saleTotal)} */}
                {saleTotal?.roundedGrossTotal > 0
                  ? saleTotal?.roundedGrossTotal
                  : 0}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "900",
                  marginLeft: 10,
                  color: "white",
                }}
              >
                BDT
              </Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView style={{ marginBottom: 10 }}>
        {/* FootFall */}
        <View
          style={[styles.footFall, { backgroundColor: "rgba(90, 34, 139,.3)" }]}
        >
          <TouchableOpacity style={{ margin: 15, marginRight: 30 }}>
            <Icon name="shoe-prints" type="font-awesome-5" size={40} />
          </TouchableOpacity>
          <View style={{ marginRight: 20 }}>
            <Text
              style={{
                marginTop: 10,
                fontSize: 14,
                fontWeight: "600",
                color: "black",
              }}
            >
              Today's Footfall
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 40, fontWeight: "600", color: "black" }}>
                {saleTotal?.footfall}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "900",
                  marginLeft: 10,
                  color: "#555",
                }}
              >
                Cart
              </Text>
            </View>
          </View>
        </View>
        {/* Busket Size */}
        <View
          style={[
            styles.footFall,
            { backgroundColor: "rgba(255, 252, 127,.3)" },
          ]}
        >
          <TouchableOpacity style={{ margin: 15, marginRight: 30 }}>
            <Icon name="shopping-bag" type="feather" size={40} />
          </TouchableOpacity>
          <View style={{ marginRight: 20 }}>
            <Text
              style={{
                marginTop: 10,
                fontSize: 14,
                fontWeight: "600",
                color: "black",
              }}
            >
              Today's Busket Size
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 40, fontWeight: "600", color: "black" }}>
                {saleTotal?.roundedGrossTotal / saleTotal?.footfall > 0
                  ? (
                      saleTotal.roundedGrossTotal / saleTotal?.footfall
                    )?.toFixed(2)
                  : 0}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "900",
                  marginLeft: 10,
                  color: "#333",
                }}
              >
                BDT
              </Text>
            </View>
          </View>
        </View>
        {/* Vat Total */}
        <View
          style={[
            styles.footFall,
            { backgroundColor: "rgba(178, 222, 39,.3)" },
          ]}
        >
          <TouchableOpacity style={{ margin: 15, marginRight: 30 }}>
            <Icon name="money" type="font-awesome" size={40} />
          </TouchableOpacity>
          <View style={{ marginRight: 20 }}>
            <Text
              style={{
                marginTop: 10,
                fontSize: 14,
                fontWeight: "600",
                color: "black",
              }}
            >
              Today's Vat Total
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 40, fontWeight: "600", color: "black" }}>
                {saleTotal?.vat ? saleTotal?.vat : 0}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "900",
                  marginLeft: 10,
                  color: "#333",
                }}
              >
                BDT
              </Text>
            </View>
          </View>
        </View>
        {/* Reload */}
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
            height: 40,
          }}
        >
          <TouchableOpacity style={{ width: 200 }}>
            <Button
              type="link"
              title="Refresh"
              icon={{ type: "ant-design", name: "reload1", size: 15 }}
              color="black"
              onPress={() => refresh()}
            ></Button>
          </TouchableOpacity>
        </View>
        {/* <View>
          <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={(date) => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View> */}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  title: {
    textAligh: "left",
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#ed3833",
    height: "auto",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  footFall: {
    flexDirection: "row",
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
    padding: 10,
    paddingTop: 15,
    minHeight: 20,
    borderRadius: 15,
    justifyContent: "space-between",
  },
});
