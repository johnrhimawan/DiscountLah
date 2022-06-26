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

import firebase from "firebase";

export default class MapModal extends React.Component {
  state = {
    storeName: this.props.marker.storeName,
    storeImage: this.props.marker.storeImg,
    address: this.props.marker.address,
    coupons: [],
    searchedCoupons: false,
  };

  componentDidMount() {
    if (!this.state.searchedCoupons) {
      
    let tempArray = [];

    firebase
      .firestore()
      .collection("coupons")
      .where("userId", "==", firebase.auth().currentUser.uid)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot) {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            if (doc.data().storeName === this.state.storeName) {
              tempArray.push(doc.data());
            }
          });
        }
      });
    
    this.setState({
      storeName: this.state.storeName,
      storeImage: this.state.storeImage,
      address: this.state.address,
      coupons: tempArray,
      searchedCoupons: true
    })
    }
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
            <Text style={styles.cardtitle}>{this.state.storeName}</Text>
            <Text style={styles.cardDescription}>{this.state.address}</Text>
          </View>
          <ScrollView>
            {this.state.coupons.map((coupon) => {
              return (
                <View>
                  <Text>{"Coupon ID: " + coupon.couponId}</Text>
                  <Text>{coupon.desc}</Text>
                  <Text>{"Valid Until: " + coupon.validity.toString()}</Text>
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.buttonContent}>
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
                Back to map
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
    flex: 2,
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
    flex: 1,
    paddingHorizontal: 40,
    top: 10,
  },
});
