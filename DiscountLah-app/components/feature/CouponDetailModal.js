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

import firebase from "firebase";

export default class CouponDetailModal extends React.Component {
  state = {
    coupon: this.props.coupon,
    storeImage: storeImages[this.props.coupon.storeName],
  };

  componentDidMount() {}

  timestampToDate(timestamp) {
    return (
      timestamp.getDate() +
      "/" +
      (timestamp.getMonth() + 1) +
      "/" +
      timestamp.getFullYear()
    );
  }

  render() {
    console.log(this.props.marker);
    console.log(this.state.storeImage);
    const { width, height } = Dimensions.get("window");

    const currentUser = firebase.auth().currentUser;

    if (!currentUser) {
      return <View></View>;
    }

    return (
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Image
            source={this.state.storeImage}
            style={styles.cardImage}
            resizeMode="cover"
          />
          <View style={styles.textContent}>
            <Text style={styles.cardtitle}>{this.state.coupon.storeName}</Text>
            <Text style={styles.cardDescription}>{this.state.coupon.desc}</Text>
            <Text style={styles.cardDescription}>
              {"Valid until " +
                this.timestampToDate(this.state.coupon.validity.toDate())}
            </Text>
          </View>
          <View style={styles.textContent}>
            <Text style={styles.cardtitle}>
              {"Coupon ID: " + this.state.coupon.couponId}
            </Text>
          </View>

          <View style={[styles.buttonContent, { marginBottom: 20 }]}>
            {this.state.coupon.used ? (
              <TouchableOpacity
                style={[
                  styles.couponButton,
                  {
                    borderColor: "#FF6347",
                    borderWidth: 1,
                    marginBottom: 5,
                  },
                ]}
                onPress={() => this.props.markUnused(this.state.coupon)}
              >
                <Text style={[styles.buttonText, { color: "#ff6347" }]}>
                  Mark As Unused
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  styles.couponButton,
                  {
                    borderColor: "#FF6347",
                    borderWidth: 1,
                    marginBottom: 5,
                  },
                ]}
                onPress={() => this.props.markUsed(this.state.coupon)}
              >
                <Text style={[styles.buttonText, { color: "#ff6347" }]}>
                  Mark As Used
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[
                styles.couponButton,
                {
                  borderColor: "#FF6347",
                  borderWidth: 1,
                  marginBottom: 5,
                },
              ]}
              onPress={() => this.props.openDeleteModal(this.state.coupon)}
            >
              <Text style={[styles.buttonText, { color: "#ff6347" }]}>
                Delete Coupon
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.couponButton,
                {
                  borderColor: "#FF6347",
                  borderWidth: 1,
                },
              ]}
              onPress={this.props.closeModal}
            >
              <Text style={[styles.buttonText, { color: "#ff6347" }]}>
                Back to Coupons
              </Text>
            </TouchableOpacity>
          </View>
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
    height: "100%",
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
    width: "100%",
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
    height: "80%",
    width: "80%",
    overflow: "hidden",
  },
  header: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  buttonContent: {
    flex: 4.5,
    paddingHorizontal: 40,
    top: 10,
  },
});
