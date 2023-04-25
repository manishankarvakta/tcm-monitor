import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Icon, Input } from "react-native-elements";
import SaleItem from "../Components/SaleItem";
import { startOfToday, endOfToday, format, formatDistance } from "date-fns";
import axios from "axios";
import { setStatusBarStyle, StatusBar } from "expo-status-bar";
import Loading from "../Components/Loading";
import BASE_URL from "../utility/BaseUrl";

const SalesScreen = ({ navigation }) => {
  const [input, setInput] = useState("");
  const [sale, setSale] = useState([]);
  const [startDate, setStartDate] = useState("12-10-2022");
  const [endDate, setEndDate] = useState("12-10-2022");
  // const [startDate, setStartDate] = useState(format(new Date(), "MM-dd-yyyy"));
  // const [endDate, setEndDate] = useState(format(new Date(), "MM-dd-yyyy"));

  const getSales = async () => {
    try {
      // console.log("getSale");
      await axios
        .get(`${BASE_URL}/sale/byDate/${startDate}/${endDate}`)
        .then((res) => {
          setSale(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getSales();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "SALES",
      headerBackTitle: "Home",
      headerStyle: { backgroundColor: "#ed3833" },
      headerTitleStyle: { color: "white" },
      headerTintColor: "white",
    });
  }, [navigation]);
  // console.log("sale", sale.length);
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.search}>
        <TextInput
          placeholder="Search Invoice"
          style={styles.input}
          onChangeText={(text) => setInput(text)}
        />
        <Icon name="search" type="feather" size={20} color="black" />
      </View>
      <View style={styles.thead}>
        <Text style={[styles.th, { flex: 2 }]}>Invoice</Text>
        <Text style={[styles.th, { flex: 1 }]}>Total</Text>
        <Text style={[styles.th, { flex: 1 }]}>Biller</Text>
        <Text style={[styles.th, { flex: 0 }]}>Time</Text>
      </View>
      <ScrollView>
        {sale?.length > 0 ? (
          sale?.map((item) => (
            <TouchableOpacity
              key={item._id}
              onPress={() => {
                navigation.navigate("Invoice", { invoiceId: item._id });
              }}
            >
              <SaleItem item={item} key={item._id} />
            </TouchableOpacity>
          ))
        ) : (
          <Loading />
        )}
      </ScrollView>
    </View>
  );
};

export default SalesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  search: {
    flexDirection: "row",
    marginBottom: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 10,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  thead: {
    // flex: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#333",
    alignItems: "center",
    padding: 10,
  },
  th: {
    fontWeight: "500",
    color: "#fff",
  },
});
