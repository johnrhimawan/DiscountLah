import React, { Component, useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import mapSample from "../../assets/socmap.png";

import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import AppLoading from "expo-app-loading";

import {
  useFonts,
  Sunflower_500Medium,
  Sunflower_700Bold,
} from "@expo-google-fonts/dev";

export default function Map() {

  const [location, setLocation] = useState(null);
  // const [lat, setLat] = useState(10);
  // const [long, setLong] = useState(10);
  const [errorMsg, setErrorMsg] = useState(null);

  const [position, setPosition] = useState({
    latitude: -6,
    longitude: 106,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  let [fontsLoaded] = useFonts({
    Sunflower_500Medium,
    Sunflower_700Bold,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      // let address = await Location.reverseGeocodeAsync(location.coords);
      console.log(location.coords);
      setLocation(location);
      setPosition({
        latitude: location.coords["latitude"],
        longitude: location.coords["longitude"],
        latitudeDelta: 0.013,
        longitudeDelta: 0.013,
      })
    })();
  }, []);

  let text = "Waiting...";
  console.log(text);
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }


  if (!fontsLoaded || !location) {
    return <AppLoading />;
  } else {
  return (
    <MapView
      style={styles.map}
      initialRegion={position}
      showsUserLocation={true}
      showsMyLocationButton={true}
      followsUserLocation={true}
      showsCompass={true}
      scrollEnabled={true}
      zoomEnabled={true}
      pitchEnabled={true}
      rotateEnabled={true}
    >
      <Marker
        title="You are here"
        description="This is a description"
        coordinate={position}
      />
    </MapView>
  );
  }
 
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
  map: {
    height: "100%",
  },
});

{
  /* <View style={styles.container}>
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
</View> */
}
