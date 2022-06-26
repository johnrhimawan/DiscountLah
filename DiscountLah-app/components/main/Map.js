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
  Modal,
} from "react-native";

import MapView, { Marker, Circle } from "react-native-maps";
import * as Location from "expo-location";

import LocationMarkers from "../data/LocationMarkers";

import {
  useFonts,
  Sunflower_500Medium,
  Sunflower_700Bold,
} from "@expo-google-fonts/dev";

import Data from "../data/Data";
import MapModal from "../feature/MapModal"

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 250;
const CARD_WIDTH = width * 0.8;
const CARD_SPACING = width * 0.1 - 10;

import firebase from "firebase";

export default function Map() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

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

  const currMap = React.useRef(null);
  const currScrollView = React.useRef(null);

  let markerCounter = -1;
  let cardCounter = -1;

  let distances = [];

  const currentUser = firebase.auth().currentUser;

  if (currentUser === undefined) {
    return <View></View>
  }

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
              latitude: Data[distances[index][1] - 1].coordinate.latitude,
              longitude: Data[distances[index][1] - 1].coordinate.longitude,
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
    const cardID = mapEventData._targetInst.return.key;
    let x = cardID * CARD_WIDTH + cardID * 20;
    currScrollView.current.scrollTo({ x: x, y: 0, animated: true });
  };


  if (errorMsg) {
    console.log(errorMsg);
  }

  if (location) {
    distances = LocationMarkers.map((marker) => {
      return [
        Math.sqrt(Math.pow(marker.coordinate.latitude - position.latitude, 2) + Math.pow(marker.coordinate.longitude - position.longitude, 2)),
        marker.index,
      ];
    });

    function sorter(a, b) {
      if (a[0] === b[0]) {
        return 0;
      }
      return a[0] < b[0] ? -1 : 1;
    }

    distances.sort(sorter);
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
          {distances.map((sortedMarker) => {
            const marker = Data[sortedMarker[1] - 1];
            markerCounter = markerCounter + 1
            return (
              <Marker
                key={markerCounter}
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
          {distances.map((sortedMarker) => {
            const marker = Data[sortedMarker[1] - 1];
            cardCounter = cardCounter + 1
            return (
              <View style={styles.card} key={cardCounter}>
                <Image
                  source={marker.storeImage}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                <View style={styles.textContent}>
                  <Text style={styles.cardtitle}>{marker.storeName}</Text>
                  <Text styles={styles.cardDescription}>{marker.desc}</Text>
                  <Text styles={styles.cardValidity}>
                    {"Valid until " + marker.validity}
                  </Text>
                  <View style={styles.button}>
                    <TouchableOpacity
                      onPress={() => {
                        setModalData(marker);
                        setModalIsOpen(true);
                      }}
                      style={[
                        styles.couponButton,
                        {
                          borderColor: "#FF6347",
                          borderWidth: 1,
                        },
                      ]}
                    >
                      <Text style={[styles.buttonText, { color: '#ff6347',},]}>
                        Use Coupon
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </Animated.ScrollView>
        <Modal visible={modalIsOpen} transparent={true} onRequestClose={() => setModalIsOpen(false)} style={styles.modalBackground}>
          <MapModal marker={modalData} closeModal={() => setModalIsOpen(false)} />
        </Modal>
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
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: "center",
    alignItems: "center",
  }
});