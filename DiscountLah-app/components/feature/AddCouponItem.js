import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Divider } from "react-native-elements";
import storeImages from "../data/StoreImages";

const styles = StyleSheet.create({
  menuItemStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 20,
    marginTop: 7,
    marginBottom: 7,
  },

  titleStyle: {
    fontSize: 19,
    fontWeight: "600",
  },
});


let timestampToDate = (timestamp) => {
    return timestamp.getDate() + "/" + timestamp.getMonth() + '/' + timestamp.getFullYear()
  }

export default function AddCouponItem({ coupons, img }) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {coupons.map((coupon, index) => (
        <View key={index}>
          <View style={styles.menuItemStyle}>
            <CouponInfo coupon={coupon} />
            <CouponImage coupon={coupon} marginLeft={10} />
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

const CouponInfo = (props) => (
  <View style={{ width: 240, justifyContent: "space-evenly" }}>
    <Text style={styles.titleStyle}>{props.coupon.storeName}</Text>
    <Text>{props.coupon.desc}</Text>
    <Text>{"Valid Until " + timestampToDate(props.coupon.validity.toDate())}</Text>
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