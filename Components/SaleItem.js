import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { startOfToday, endOfToday, format, formatDistance } from "date-fns";

const SaleItem = ({ item }) => {
  // console.log(item);
  return (
    <View style={styles.saleItem}>
      <Text
        style={[
          styles.td,
          styles.textBold,
          { flex: 3, alignItems: "flex-start" },
        ]}
      >
        {item.invoiceId}
      </Text>
      <Text style={[styles.td, { flex: 1, alignItems: "flex-start" }]}>
        {item.total ? item.total : 0} ৳
      </Text>
      <Text style={[styles.td, { flex: 1, alignItems: "flex-end" }]}>
        {item.createdAt && format(new Date(item.createdAt), "H:m a")}
      </Text>
      <TouchableOpacity
        style={[styles.td, { flex: 0, alignItems: "flex-start" }]}
      >
        <Icon name="eye" type="font-awesome-5" size={15} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default SaleItem;

const styles = StyleSheet.create({
  saleItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
  },
  td: {
    fontWeight: "300",
    color: "#333",
  },
  textBold: {
    fontWeight: "600",
  },
  textRight: {
    textAlign: "right",
  },
});
