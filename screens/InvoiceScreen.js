import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { Icon } from "react-native-elements";

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
    <View style={styles.container}>
      <ScrollView style={styles.InvoiceOuter}>
        <Icon
          name="clockcircleo"
          type="ant-design"
          size={50}
          style={{ marginBottom: 20 }}
        />
        <Text>Coming Soon</Text>
      </ScrollView>
    </View>
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
  InvoiceOuter: {
    padding: 10,
  },
});
