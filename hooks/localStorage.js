import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Store Data Locally
const storeData = async ({ name, data }) => {
  try {
    await AsyncStorage.setItem(name, data);
  } catch (error) {
    console.log(error);
    // Error saving data
  }
};

// Get Local Data
const retrieveData = async (name) => {
  try {
    const value = await AsyncStorage.getItem(name);
    if (value !== null) {
      // We have data!!
      console.log(value);
    }
  } catch (error) {
    console.log(error);
    // Error retrieving data
  }
};

export default { storeData, retrieveData };
