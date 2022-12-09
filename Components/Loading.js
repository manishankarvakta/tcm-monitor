import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";

const Loading = () => {
  return (
    <View style={styles.container}>
      <Icon name="reload1" type="ant-design" size={20} />
      <Text style={{ marginTo: 20, marginLeft: 10 }}>Loading...</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 300,
  },
});
