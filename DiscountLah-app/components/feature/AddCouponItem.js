import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Divider } from "react-native-elements";
import storeImages from "../data/StoreImages";

const styles = StyleSheet.create({
  menuItemStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 20,
  },

  titleStyle: {
    fontSize: 19,
    fontWeight: "600",
  },

  couponButton: {
    width: "70%",
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

let timestampToDate = (timestamp) => {
  return (
    timestamp.getDate() +
    "/" +
    (timestamp.getMonth() + 1) +
    "/" +
    timestamp.getFullYear()
  );
};

export default function AddCouponItem({ coupons, img, openModal }) {
  return (
    // <ScrollView showsVerticalScrollIndicator={false}>
    <View style={{ paddingBottom: 60 }}>
      {coupons.map((coupon, index) => (
        <View key={index}>
          <View style={styles.menuItemStyle}>
            <CouponInfo coupon={coupon} openModal={openModal} />
            <CouponImage coupon={coupon} marginLeft={10} />
          </View>
          <Divider
            width={0.5}
            orientation="vertical"
            style={{ marginHorizontal: 20 }}
          />
        </View>
      ))}
    </View>
    // </ScrollView>
  );
}

const CouponInfo = (props) => (
  <View style={{ width: "55%", justifyContent: "space-evenly" }}>
    {console.log(props.coupon)}
    {console.log(props.coupon.validity)}
    <Text style={styles.titleStyle}>{props.coupon.storeName}</Text>
    <Text>{props.coupon.desc}</Text>
    <Text>
      {"Valid Until " + timestampToDate(props.coupon.validity.toDate())}
    </Text>
    <TouchableOpacity
      onPress={() => props.openModal(props.coupon)}
      style={[
        styles.couponButton,
        {
          borderColor: "#FF6347",
          borderWidth: 1,
          marginTop: 10,
        },
      ]}
    >
      <Text style={[styles.buttonText, { color: "#ff6347" }]}>View Coupon</Text>
    </TouchableOpacity>
  </View>
);

const CouponImage = ({ marginRight, ...props }) => (
  <View>
    <Image
      source={storeImages[props.coupon.storeName]}
      style={{
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 30,
      }}
    />
  </View>
);
