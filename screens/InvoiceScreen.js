import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { Icon, Image } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import Loading from "../Components/Loading";

const InvoiceScreen = ({ navigation }) => {
  const products = [];
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "INVOICE",
      headerBackTitle: "Sales",
      headerStyle: { backgroundColor: "#ed3833" },
      headerTitleStyle: { color: "white" },
      headerTintColor: "white",
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView style={styles.InvoiceOuter}>
        <View style={styles.logoWrapper}>
          <Image
            source={require("../assets/invoice-logo.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>The Community Magasin</Text>
          <Text style={styles.bin}>BIN 004601696-0102 | Mushak 6.3</Text>
          <Text style={styles.text}>Invoice No: 0171000000</Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.text}>Phone: 01717440931</Text>
          <Text style={[styles.text]}>Date: 12-20-2022</Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.text}>Customer: Manishankar Vakta</Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.text}>Biller: Manishakar Vakta</Text>
          <Text style={[styles.text]}>Outlate: TCM</Text>
        </View>
        <View style={styles.oprderDetails}>
          <Text style={{ textAlign: "center", fontSize: 18 }}>
            ORDER DETAILS
          </Text>
        </View>
        <View style={styles.thead}>
          <Text style={[styles.th, { flex: 2 }]}>Item</Text>
          <Text style={[styles.th, { flex: 1 }]}>Qty</Text>
          <Text style={[styles.th, { flex: 1 }]}>Rate</Text>
          <Text style={[styles.th, { flex: 1 }]}>Vat</Text>
          <Text style={[styles.th, { flex: 1 }]}>Total</Text>
        </View>
        <View>
          {products?.length > 0 ? (
            products?.map((item) => (
              <TouchableOpacity
                key={item._id}
                onPress={() => {
                  navigation.navigate("Invoice");
                }}
              >
                <SaleItem item={item} key={item._id} />
              </TouchableOpacity>
            ))
          ) : (
            <Loading />
          )}
        </View>
        <View style={styles.header}>
          <Text style={styles.text}>Total Item: </Text>
          <Text style={[styles.text, { fontWeight: "400" }]}>0</Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.text}>Total: </Text>
          <Text style={[styles.text, { fontWeight: "400" }]}>0 BDT</Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.text}>Discount: </Text>
          <Text style={[styles.text, { fontWeight: "400" }]}>0 BDT</Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.text}>Vat: </Text>
          <Text style={[styles.text, { fontWeight: "400" }]}>0 BDT</Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.text}>Gross Total: </Text>
          <Text style={[styles.text, { fontWeight: "400" }]}>0 BDT</Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.text}>Gross Total (Rounging): </Text>
          <Text style={[styles.text, { fontWeight: "400" }]}>0 BDT</Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.text}>Total Recived: </Text>
          <Text style={[styles.text, { fontWeight: "400" }]}>0 BDT</Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.text}>Change Amount: </Text>
          <Text style={[styles.text, { fontWeight: "400" }]}>0 BDT</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.text}>Previous Point: 0 | New Point :0</Text>
          <Text style={[styles.bin, { marginTop: 5 }]}>
            N.B: Sold products will not be returned after 24 hours
          </Text>
          <Text style={styles.text}>Previous Point: 0 | New Point :0</Text>
          <Text style={styles.text}>Previous Point: 0 | New Point :0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InvoiceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  logoWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width - 40,
    marginLeft: 10,
    marginRight: 10,
  },
  logo: {
    height: 40,
    width: 100,
    marginTop: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    paddingBottom: 10,
  },
  bin: {
    fontSize: 16,
    fontWeight: "300",
    fontStyle: "italic",
  },
  text: {
    fontSize: 16,
    fontWeight: "300",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  oprderDetails: {
    marginTop: 20,
  },
  thead: {
    marginTop: 10,
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
  footer: {
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width - 40,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
});
