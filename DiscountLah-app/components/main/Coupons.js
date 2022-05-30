import React from "react";
import { View, Text } from "react-native";

import {
  useFonts,
  Sunflower_500Medium,
  Sunflower_700Bold,
} from "@expo-google-fonts/dev";

export default function Coupons() {
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
        Coupons
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
        Here, users can view the coupons that they currently have.
      </Text>
    </View>
  );
}
