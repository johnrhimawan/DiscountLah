import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Button,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import storeImages from "../data/StoreImages";
import warning from "../../assets/warning.png";

import firebase from "firebase";

export default class ConfirmDeleteModal extends React.Component {
  state = {
    coupon: this.props.coupon,
  };

  render() {
    return (
      <View style={styles.modalBackground}>
        <View
          style={[
            styles.modalContainer,
            { alignItems: "center", justifyContent: "center" },
          ]}
        >
          <Image source={warning} style={{width: 170, height: 170}} resizeMode="cover" />
          <Text
            style={{
              marginTop: 20,
              fontSize: 18,
              alignItems: "center",
              textAlign: "center",
              marginHorizontal: 20,
            }}
          >
            Are you sure you want to delete this coupon?
          </Text>
          <TouchableOpacity
            style={[
              styles.couponButton,
              {
                borderColor: "#FF6347",
                borderWidth: 1,
                marginTop: 20,
              },
            ]}
            onPress={() => this.props.deleteCouponSequence(this.props.coupon)}
          >
            <Text style={[styles.buttonText, { color: "#ff6347" }]}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.couponButton,
              {
                borderColor: "#FF6347",
                borderWidth: 1,
                marginTop: 10,
              },
            ]}
            onPress={this.props.closeModal}
          >
            <Text style={[styles.buttonText, { color: "#ff6347" }]}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: "60%",
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  cardImage: {
    flex: 4,
    width: "100%",
    height: "20%",
    alignSelf: "center",
  },
  textContent: {
    flex: 4,
    padding: 10,
  },
  cardtitle: {
    fontSize: 16,
    // fontFamily: "Sunflower_700Bold",
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
    width: "50%",
    padding: 8,
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
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: "60%",
    width: "80%",
    overflow: "hidden",
  },
  header: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  buttonContent: {
    flex: 1,
    paddingHorizontal: 40,
    top: 10,
  },
});
