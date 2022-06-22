import React, { Component, useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  Platform,
} from "react-native";

import MapView, { Marker, Circle } from "react-native-maps";
import * as Location from "expo-location";

import {
  useFonts,
  Sunflower_500Medium,
  Sunflower_700Bold,
} from "@expo-google-fonts/dev";

import Data from "../data/Data";

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 250;
const CARD_WIDTH = width * 0.8;
const CARD_SPACING = width * 0.1 - 10;

export default function Map() {
  const [location, setLocation] = useState(null);
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

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index >= Data.length) {
        index = Data.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          currMap.current.animateToRegion(
            {
              latitude: Data[index].coordinate.latitude,
              longitude: Data[index].coordinate.longitude,
              latitudeDelta: position.latitudeDelta,
              longitudeDelta: position.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  });

  const onMarkerPress = (mapEventData) => {
    const cardID = mapEventData._targetInst.return.key - 1;
    let x = cardID * CARD_WIDTH + cardID * 20;
    currScrollView.current.scrollTo({ x: x, y: 0, animated: true });
  };

  const currMap = React.useRef(null);
  const currScrollView = React.useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setPosition({
        latitude: location.coords["latitude"],
        longitude: location.coords["longitude"],
        latitudeDelta: 0.015,
        longitudeDelta: 0.015,
      });
    })();
  }, []);

  if (errorMsg) {
    console.log(errorMsg);
  }

  if (!fontsLoaded || !location) {
    return null;
  } else {
    return (
      <View>
        <MapView
          ref={currMap}
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
          <Circle
            center={{
              latitude: position.latitude,
              longitude: position.longitude,
            }}
            radius={1000}
            strokeColor={"#49a6f2"}
            fillColor={"rgba(73, 166, 242, 0.1)"}
          />
          {Data.map((marker) => {
            return (
              <Marker
                key={marker.index}
                coordinate={marker.coordinate}
                title={marker.storeName}
                description={marker.desc}
                onPress={(e) => onMarkerPress(e)}
              ></Marker>
            );
          })}
        </MapView>

        <Animated.ScrollView
          ref={currScrollView}
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
          snapToInterval={CARD_WIDTH + 20}
          snapToAlignment="center"
          contentInset={{
            top: 0,
            left: CARD_SPACING,
            bottom: 0,
            right: CARD_SPACING,
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: mapAnimation } } }],
            { useNativeDriver: true }
          )}
        >
          {Data.map((marker) => {
            return (
              <View style={styles.card} key={marker.index}>
                <Image
                  source={marker.storeImage}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                <View style={styles.textContent}>
                  <Text style={styles.cardtitle}>
                    {marker.storeName}
                  </Text>
                  <Text styles={styles.cardDescription}>
                    {marker.desc}
                  </Text>
                  <Text styles={styles.cardValidity}>
                    {"Valid until " + marker.validity}
                  </Text>
                  <View style={styles.button}>
                    <TouchableOpacity
                      onPress={() => {}}
                      style={[
                        styles.couponButton,
                        {
                          borderColor: "#FF6347",
                          borderWidth: 1,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.buttonText,
                          {
                            color: "#ff6347",
                          },
                        ]}
                      >
                        Use Coupon
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: "100%",
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 16,
    fontFamily: "Sunflower_700Bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
    // fontFamily: "Sunflower_500Medium",
  },
  cardValidity: {
    fontSize: 10,
    color: "#777",
    // fontFamily: "Sunflower_500Medium",
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: "center",
    marginTop: 5,
  },
  couponButton: {
    width: "100%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
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
