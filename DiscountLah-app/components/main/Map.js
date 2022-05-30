import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import mapSample from "../../assets/socmap.png";

import {
  useFonts,
  Sunflower_500Medium,
  Sunflower_700Bold,
} from "@expo-google-fonts/dev";

export default function Map() {
  let [fontsLoaded] = useFonts({
    Sunflower_500Medium,
    Sunflower_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontFamily: "Sunflower_700Bold",
          fontSize: 24,
          textAlign: "left",
          marginLeft: 10,
          marginBottom: 5,
        }}
      >
        Map Screen
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
        User can check the nearby places where they can redeem their coupons.
      </Text>
      <View style={(alignItems = "center")}>
        <Image style={styles.image} source={mapSample} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
  image: {
    width: 600,
    height: 600,
  },
});
