import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Avatar, Icon, Image } from "react-native-elements";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const getUser = async () => {
    console.log("getUser");
    // const store = await AsyncStorage.getAllKeys();
    const userData = await AsyncStorage.getItem("user");
    setUser(JSON.parse(userData));
  };
  useState(() => {
    getUser();
  }, []);

  console.log(user);
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Image
          source={require("../assets/tcm.jpg")}
          style={{ height: 150, width: 150, borderRadius: 75 }}
        />
        <Text
          style={{
            fontSize: 20,
            color: "white",
            marginTop: 15,
            fontWeight: "600",
          }}
        >
          Profile
        </Text>
      </View>
      <ScrollView style={styles.info}>
        <View style={styles.item}>
          <TouchableOpacity>
            <Icon name="user" type="ant-design" style={styles.icon} size={40} />
          </TouchableOpacity>
          <View>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.Value}>
              {user?.name ? user?.name : "No Name"}
            </Text>
          </View>
        </View>
        <View style={styles.item}>
          <TouchableOpacity>
            <Icon
              name="envelope"
              type="evilicon"
              style={styles.icon}
              size={40}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.Value}>
              {user?.email ? user?.email : "No Email"}
            </Text>
          </View>
        </View>
        <View style={styles.item}>
          <TouchableOpacity>
            <Icon
              name="phone"
              type="ant-design"
              style={styles.icon}
              size={40}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.Value}>
              {user?.phone ? user?.phone : "No Phone"}
            </Text>
          </View>
        </View>
        <View style={styles.item}>
          <TouchableOpacity>
            <Icon name="shield" type="feather" style={styles.icon} size={40} />
          </TouchableOpacity>
          <View>
            <Text style={styles.label}>Type:</Text>
            <Text style={styles.Value}>
              {user?.type ? user?.type : "No Type"}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    // minHeight: 250,
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: "#ed3833",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  info: {
    margin: 20,
  },
  item: {
    marginTop: 20,
    flexDirection: "row",
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "400",
  },
  Value: {
    fontSize: 20,
    fontWeight: "600",
  },
});
