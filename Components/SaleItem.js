import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { startOfToday, endOfToday, format, formatDistance } from "date-fns";

const SaleItem = ({ navigation, item }) => {
  // console.log(item);
  return (
    <View style={styles.saleItem}>
      <Text style={[styles.td, styles.textBold, { flex: 3, alignSelf: "end" }]}>
        {item.invoiceId}
      </Text>
      <Text style={[styles.td, { flex: 1, alignSelf: "start" }]}>
        {item.total ? item.total : 0} ৳
      </Text>
      <Text style={[styles.td, { flex: 1, alignSelf: "end" }]}>
        {item.createdAt && format(new Date(item.createdAt), "H:m a")}
      </Text>
      <TouchableOpacity style={[styles.td, { flex: 0, alignSelf: "end" }]}>
        <Icon
          name="eye"
          type="font-awesome-5"
          size={15}
          color="black"
          onPress={() => {
            navigation.navigate("Invoice");
          }}
        />
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
