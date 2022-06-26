import React from "react";
import { View, Text, FlatList, SafeAreaView } from "react-native";
import firebase from "firebase";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AppStyles from "../../styles/AppStyles";

export default function Home() {
  let [expiringCoupons, setExpiringCoupons] = React.useState([]);
  let [isRefreshing, setIsRefreshing] = React.useState(false);

  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();
  let day = today.getDate();

  let getExpiringCoupons = async () => {
    console.log("getting expiring coupons");
    let expiringCoupons = [];

    firebase
      .firestore()
      .collection("coupons")
      .where("userId", "==", firebase.auth().currentUser.uid)
      .where("validity", "<=", new Date(year, month, day + 7))
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data());
          let coupon = doc.data();
          coupon.id = doc.id;
          expiringCoupons.push(coupon);
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    console.log("execution done");

    setExpiringCoupons(expiringCoupons);
    setIsRefreshing(false);
  }

  let checkCouponItem = (item, isChecked) => {
    console.log("check coupon");
    const couponRef = firebase.firestore().collection("coupons").doc(item.id);
    couponRef.set({ completed: isChecked }, { merge: true });
  };

  let renderCouponItem = ({ item }) => {
    console.log("render coupon");
    return (
      <View
        style={[
          AppStyles.rowContainer,
          AppStyles.rightMargin,
          AppStyles.leftMargin,
        ]}
      >
        <View style={AppStyles.fillSpace}>
          <BouncyCheckbox
            isChecked={item.complated}
            size={25}
            fillColor="#258ea6"
            unfillColor="#FFFFFF"
            text={item.text}
            iconStyle={{ borderColor: "#258ea6" }}
            onPress={(isChecked) => {
              checkCouponItem(item, isChecked);
            }}
          />
        </View>
      </View>
    );
  };

  let showCouponList = () => {
    console.log("show coupon");
    return (
      <FlatList
        data={expiringCoupons}
        refreshing={isRefreshing}
        onRefresh={() => {
          getExpiringCoupons();
          setIsRefreshing(true);
        }}
        renderItem={renderCouponItem}
        keyExtractor={(item) => item.id}
      />
    );
  };

  return (
    <SafeAreaView>
      <Text style={AppStyles.header}>Welcome back! These coupons are expiring soon...</Text>
      {showCouponList()}
    </SafeAreaView>
  );
}
