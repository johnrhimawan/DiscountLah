import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Divider } from "react-native-elements";
import storeImages from "../data/StoreImages";

const styles = StyleSheet.create({
  menuItemStyle: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 20,
  },

  titleStyle: {
    fontSize: 19,
    fontWeight: "600",
  },
});


let timestampToDate = (timestamp) => {
    return timestamp.getDate() + "/" + (timestamp.getMonth() + 1) + '/' + timestamp.getFullYear()
  }

export default function CouponItem({ coupons, img }) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {coupons.map((coupon, index) => (
        <View key={index}>
          <View style={styles.menuItemStyle}>
            <CouponInfo coupon={coupon} />
            <CouponImage coupon={coupon} marginRight={30} />
          </View>
          <Divider
            width={0.5}
            orientation="vertical"
            style={{ marginHorizontal: 20 }}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const getHowManyDays = (date2) => {
  const today = new Date()
  const diff = date2 - today
  const days = Math.floor(diff / (24 * 60 * 60 * 1000))
  if (days === 0) {
    return "today"
  } else if (days === 1) {
    return "in 1 day"
  }
  return "in " + days + " days"
}

const CouponInfo = (props) => (
  <View style={{ width: 240, justifyContent: "space-evenly" }}>
    <Text style={styles.titleStyle}>{props.coupon.storeName}</Text>
    <Text>{props.coupon.desc}</Text>
    <Text>{"Expires " + getHowManyDays(props.coupon.validity.toDate())}</Text>
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
        marginRight: 30
      }}
    />
  </View>
);