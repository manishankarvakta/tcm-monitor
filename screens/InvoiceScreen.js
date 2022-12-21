import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Icon, Image } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import Loading from "../Components/Loading";
import axios from "axios";
import { format } from "date-fns";
import Barcode from "@kichiyaki/react-native-barcode-generator";

const InvoiceScreen = ({ navigation, route }) => {
  const baseUrl = "https://pos-api-v1-production.up.railway.app/api";
  const { invoiceId } = route.params;
  const [bill, setBill] = useState({});

  const getBill = async () => {
    await axios
      .get(`${baseUrl}/sale/${invoiceId}`)
      .then((res) => setBill(res.data));
  };
  console.log(invoiceId);

  useEffect(() => {
    getBill();
  }, []);

  console.log(bill);

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

  const Item = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          marginTop: 5,
          paddingBottom: 5,
          borderBottomWidth: 1,
          borderBottomColor: "#e3e3e3",
        }}
      >
        <Text style={{ flex: 4 }}>{item.name}</Text>
        <Text style={{ flex: 1 }}>{item.qty}</Text>
        <Text style={{ flex: 1, textAlign: "center" }}>{item.mrp}</Text>
        <Text style={{ flex: 1, textAlign: "center" }}>
          {vat(item.qty, item.vat, item.mrp)}
        </Text>
        <Text style={{ flex: 1, textAlign: "center" }}>
          {total(item.qty, item.mrp)?.toFixed(2)}
        </Text>
      </View>
    );
  };

  const total = (qty, mrp) => {
    return qty * mrp;
  };
  const vat = (qty, vat, mrp) => {
    return total(qty, mrp) * (vat / 100);
  };

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
          <Text style={styles.text}>
            Invoice No: {bill?.invoiceId ? bill?.invoiceId : "0171000000"}
          </Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.text}>
            Phone: {bill?.customerId ? bill?.customerId.phone : "01717440931"}
          </Text>
          <Text style={[styles.text]}>
            Date:{" "}
            {bill?.createdAt && format(new Date(bill.createdAt), "MM-dd-yyyy")}
          </Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.text}>
            Customer:{" "}
            {bill?.customerId ? bill?.customerId.name : "Walkaway Customer"}
          </Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.text}>
            Biller: {bill?.billerId ? bill?.billerId.name : "No-Biller"}
          </Text>
          <Text style={[styles.text]}>Outlet: TCM</Text>
        </View>
        <View style={styles.oprderDetails}>
          <Text style={{ textAlign: "center", fontSize: 18 }}>
            ORDER DETAILS
          </Text>
        </View>
        <View style={styles.thead}>
          <Text style={[styles.th, { flex: 4 }]}>Item</Text>
          <Text style={[styles.th, { flex: 1 }]}>Qty</Text>
          <Text style={[styles.th, { flex: 1, textAlign: "center" }]}>
            Rate
          </Text>
          <Text style={[styles.th, { flex: 1, textAlign: "center" }]}>Vat</Text>
          <Text style={[styles.th, { flex: 1, textAlign: "center" }]}>
            Total
          </Text>
        </View>
        <View style={{ marginBottom: 10 }}>
          {bill?.products?.length > 0 ? (
            bill.products?.map((item) => (
              <View
                key={item.id}
                onPress={() => {
                  navigation.navigate("Invoice");
                }}
              >
                <Item item={item} key={item.id} />
              </View>
            ))
          ) : (
            <Loading />
          )}
        </View>
        <View style={styles.header}>
          <Text style={styles.text}>Total Item: </Text>
          <Text style={[styles.text, { fontWeight: "400" }]}>
            {bill?.totalItem}
          </Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.text}>Total: </Text>
          <Text style={[styles.text, { fontWeight: "400" }]}>
            {bill?.total} BDT
          </Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.text}>Discount: </Text>
          <Text style={[styles.text, { fontWeight: "400" }]}>
            {bill?.discount} BDT
          </Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.text}>Vat: </Text>
          <Text style={[styles.text, { fontWeight: "400" }]}>
            {bill?.vat} BDT
          </Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.text}>Gross Total: </Text>
          <Text style={[styles.text, { fontWeight: "400" }]}>
            {bill?.grossTotal} BDT
          </Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.text}>Gross Total (Rounging): </Text>
          <Text style={[styles.text, { fontWeight: "400" }]}>
            {bill?.grossTotalRound} BDT
          </Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.text}>Total Recived: </Text>
          <Text style={[styles.text, { fontWeight: "400" }]}>
            {bill?.totalReceived} BDT
          </Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.text}>Change Amount: </Text>
          <Text style={[styles.text, { fontWeight: "400" }]}>
            {bill?.changeAmount} BDT
          </Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.text}>
            Previous Point: {bill?.point?.old} | New Point: {bill?.point?.new}
          </Text>
          <Text style={[styles.bin, { marginTop: 5 }]}>
            N.B: Sold products will not be returned after 24 hours
          </Text>
          <View>
            <Barcode
              value={bill?.invoiceId ? bill?.invoiceId : "01700000000"}
              format="CODE128"
              height={40}
              style={{ padding: 10 }}
            />
          </View>
          <Text style={styles.text}>www.tcm-bd.com</Text>
          <Text style={[styles.text, { fontWeight: "500" }]}>
            Hot Line: 01316842636
          </Text>
          <Text style={styles.text}>Thank you for shopping with us</Text>
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
