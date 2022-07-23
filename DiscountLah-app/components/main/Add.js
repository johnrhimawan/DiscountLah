import {
  View,
  Button,
  Text,
  Modal,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import InlineTextButton from "../feature/InlineTextButton";
import AppStyles from "../../styles/AppStyles";
import firebase from "firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import React, { useEffect } from "react";
import AddCouponModal from "../feature/AddCouponModal";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import * as Notifications from "expo-notifications";

export default function AddCoupon() {
  let [modalVisible, setModalVisible] = React.useState(false);
  let [isLoading, setIsLoading] = React.useState(true);
  let [isRefreshing, setIsRefreshing] = React.useState(false);
  let [coupons, setCoupons] = React.useState([]);
  let [querySnapshot, setQuerySnapshot] = React.useState(null);
  let [deletedDoc, setDeletedDoc] = React.useState(null);
  let [docRef, setDocRef] = React.useState(null);

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: "Here is the notification body",
        data: { data: "goes here" },
      },
      trigger: { seconds: 2 },
    });
  }

  let scheduleNotification = async () => {
    const trigger = new Date(Date.now() + 60 * 60 * 1000);
    trigger.setMinutes(0);
    trigger.setSeconds(0);

    Notifications.scheduleNotificationAsync({
      content: {
        title: "Happy new hour!",
      },
      trigger,
    });
  };

  async function scheduleAndCancel() {
    const identifier = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hey!",
      },
      trigger: { seconds: 60, repeats: true },
    });
    await Notifications.cancelScheduledNotificationAsync(identifier);
  }

  let loadCouponList = async () => {
    console.log("load coupon");
    let coupons = [];

    firebase
      .firestore()
      .collection("coupons")
      .where("userId", "==", firebase.auth().currentUser.uid)
      .get()
      .then((querySnapshot) => {
        console.log(querySnapshot);
        if (querySnapshot) {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            let coupon = doc.data();
            coupon.id = doc.id;
            coupons.push(coupon);
          });
          setQuerySnapshot(querySnapshot);
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

    console.log("execution done");

    setCoupons(coupons);
    setIsLoading(false);
    setIsRefreshing(false);
  };

  if (isLoading) {
    loadCouponList();
  }

  let checkCouponItem = (item, isChecked) => {
    console.log("check coupon");
    const couponRef = firebase.firestore().collection("coupons").doc(item.id);
    couponRef.set({ completed: isChecked }, { merge: true });
  };

  let deleteCoupon = async (couponId) => {
    console.log("delete coupon");

    let schedule = {};

    firebase
      .firestore()
      .collection("coupons")
      .doc(couponId)
      .get()
      .then((doc) => {
        if (doc.data().schedule) {
          schedule = doc.data().schedule;
        }
      })
      .catch((err) => {
        console.error("Error retrieving schedule: ", err);
      });

    firebase
      .firestore()
      .collection("coupons")
      .doc(couponId)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
    
    removeSchedule(schedule);
    setDeletedDoc(couponId);
    let updatedCoupons = [...coupons].filter((item) => item.id != couponId);
    setCoupons(updatedCoupons);
  };

  async function removeSchedule(schedule) {
    await Notifications.cancelScheduledNotificationAsync(schedule);
  }

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
        <InlineTextButton
          text="Delete"
          color="#258ea6"
          onPress={() => deleteCoupon(item.id)}
        />
      </View>
    );
  };

  let showCouponList = () => {
    console.log("show coupon");
    return (
      <FlatList
        data={coupons}
        refreshing={isRefreshing}
        onRefresh={() => {
          loadCouponList();
          setIsRefreshing(true);
        }}
        renderItem={renderCouponItem}
        keyExtractor={(item) => item.id}
      />
    );
  };

  let showContent = () => {
    console.log("show content");
    return (
      <View>
        {isLoading ? <ActivityIndicator size="large" /> : showCouponList()}
        <Button
          title="Add Coupon"
          onPress={() => setModalVisible(true)}
          color="#fb4d3d"
        />
      </View>
    );
  };

  let addCoupon = async (couponData) => {
    console.log("add coupon");
    let couponToSave = {
      text: couponData.storeName,
      couponId: couponData.couponId,
      storeName: couponData.storeName,
      desc: couponData.desc,
      validity: couponData.validity,
      completed: false,
      userId: firebase.auth().currentUser.uid,
      schedule: couponData.schedule,
    };

    firebase
      .firestore()
      .collection("coupons")
      .add(couponToSave)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        setDocRef(docRef);
        couponToSave.id = docRef.id;
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

    let updatedCoupons = [...coupons];
    updatedCoupons.push(couponToSave);

    setCoupons(updatedCoupons);
  };

  useEffect(() => {
    loadCouponList();
  }, []);

  if (isLoading) {
    return null;
  } else {
    return (
      <SafeAreaView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <AddCouponModal
            onClose={() => setModalVisible(false)}
            addCoupon={addCoupon}
          />
        </Modal>
        <Text style={AppStyles.header}>Coupon</Text>
        {showContent()}
        <Button
          title="Press to schedule a notification"
          onPress={async () => {
            console.log("pressed");
            await schedulePushNotification();
          }}
        />
      </SafeAreaView>
    );
  }
}
