import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";

const InvoiceScreen = ({ navigation }) => {
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
    <View>
      <Text>InvoiceScreen</Text>
    </View>
  );
};

export default InvoiceScreen;

const styles = StyleSheet.create({});
