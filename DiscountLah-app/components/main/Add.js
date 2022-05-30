import React from "react";
import { Text, View } from "react-native";

import {
  useFonts,
  Sunflower_500Medium,
  Sunflower_700Bold,
} from "@expo-google-fonts/dev";

export default function Add() {
  let [fontsLoaded] = useFonts({
    Sunflower_500Medium,
    Sunflower_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{marginTop: 20}}>
      <Text
        style={{
          fontFamily: "Sunflower_700Bold",
          fontSize: 24,
          textAlign: "left",
          marginLeft: 10,
          marginBottom: 5,
        }}
      >
        {" "}
        Add Coupons{" "}
      </Text>
      <Text
        style={{
          fontFamily: "Sunflower_500Medium",
          fontSize: 18,
          color: "#9f9f9f",
          textAlign: "left",
          marginLeft: 15,
          marginTop: 5,
          marginBottom: 10,
        }}
      >
        {" "}
        Fields will be available here for users to add their coupons{" "}
      </Text>
    </View>
  );
}
