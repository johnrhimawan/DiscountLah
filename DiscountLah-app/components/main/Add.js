import {
  View,
  Text,
  Modal,
  SafeAreaView,
  ActivityIndicator,
  Button,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import InlineTextButton from "../feature/InlineTextButton";
import AppStyles from "../../styles/AppStyles";
import firebase from "firebase";

import React, { useEffect } from "react";
import AddCouponModal from "../feature/AddCouponModal";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import * as Notifications from "expo-notifications";

import AddCouponItem from "../feature/AddCouponItem";
import CouponDetailModal from "../feature/CouponDetailModal";
import ConfirmDeleteModal from "../feature/ConfirmDeleteModal";
import BarcodeCamModal from "../feature/BarcodeCamModal";

export default function AddCoupon() {
  let [modalVisible, setModalVisible] = React.useState(false);
  let [isLoading, setIsLoading] = React.useState(true);
  let [isRefreshing, setIsRefreshing] = React.useState(false);
  let [coupons, setCoupons] = React.useState([]);
  let [querySnapshot, setQuerySnapshot] = React.useState(null);
  let [deletedDoc, setDeletedDoc] = React.useState(null);
  let [docRef, setDocRef] = React.useState(null);

  let [dataChange, setDataChange] = React.useState(0);

  const [couponModalIsOpen, setCouponModalIsOpen] = React.useState(false);
  const [couponModalData, setCouponModalData] = React.useState(null);

  const [currAddCouponData, setCurrAddCouponData] = React.useState({});
  const [barcodeData, setBarcodeData] = React.useState({});

  const [deleteModalIsOpen, setDeleteModalIsOpen] = React.useState(false);
  const [deleteModalData, setDeleteModalData] = React.useState(null);

  const [barcodeModalIsOpen, setBarcodeModalIsOpen] = React.useState(false);

  let [pageNumber, setPageNumber] = React.useState(0);

  let loadCouponList = async () => {
    console.log("load coupon");
    let coupons = [];

    firebase
      .firestore()
      .collection("coupons")
      .where("userId", "==", firebase.auth().currentUser.uid)
      .orderBy("validity")
      // .startAt(pageNumber * 4)
      // .limit(10)
      .get()
      .then((querySnapshot) => {
        // console.log(querySnapshot);
        if (querySnapshot) {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
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

  let openDeleteModal = (coupon) => {
    setCouponModalIsOpen(false);
    setDeleteModalIsOpen(true);
    setDeleteModalData(coupon);
  };

  let deleteCouponSequence = (coupon) => {
    deleteCoupon(coupon.id);
    setDeleteModalIsOpen(false);
    setDataChange(dataChange + 1);
    alert("Coupon successfully deleted");
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

  let showCouponList = () => {
    console.log("show coupon");
    if (coupons.length > 0) {
      return (
        <View>
          <AddCouponItem coupons={coupons} openModal={openCouponModal} />
        </View>
      );
    } else {
      return (
        <View>
          <Text style={{ marginTop: 20, fontSize: 18, marginLeft: 20 }}>
            No Coupons to show :(
          </Text>
        </View>
      );
    }
  };

  let showContent = () => {
    console.log("show content");
    return (
      <View>
        {isLoading ? <ActivityIndicator size="large" /> : showCouponList()}
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
      used: false,
      barcodeData: couponData.barcodeData,
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

    setDataChange(dataChange + 1);
    setCurrAddCouponData({});

    // let updatedCoupons = [...coupons];

    // firebase
    //   .firestore()
    //   .collections("coupons")
    //   .doc(docRef.id)
    //   .then((doc) => {
    //     couponToSave.validity = doc.data().validity;
    //   })
    //   .catch((err) => {
    //     console.error("Validity error: " + err)
    //   });
    // console.log(couponToSave.validity);
    // updatedCoupons.push(couponToSave);

    // setCoupons(updatedCoupons);
  };

  let markCouponUsed = (coupon) => {
    firebase
      .firestore()
      .collection("coupons")
      .doc(coupon.id)
      .update({ used: true })
      .then(() => {
        console.log("Coupon mark used successfully");
      })
      .catch((err) => {
        console.error("Error marking used: " + err);
      });
    removeSchedule(coupon.schedule);
    closeCouponModal();
    setDataChange(dataChange + 1);
  };

  let markCouponUnused = (coupon) => {
    firebase
      .firestore()
      .collection("coupons")
      .doc(coupon.id)
      .update({ used: false })
      .then(() => {
        console.log("Coupon mark unused successfully");
      })
      .catch((err) => {
        console.error("Error marking unused: " + err);
      });

    assignSchedule(coupon.schedule);
    closeCouponModal();
    setDataChange(dataChange + 1);
  };

  let openCouponModal = (couponData) => {
    setCouponModalData(couponData);
    setCouponModalIsOpen(true);
  };

  let closeCouponModal = () => {
    setCouponModalIsOpen(false);
    setCouponModalData(null);
  };

  let assignSchedule = (coupon) => {
    Notifications.scheduleNotificationAsync(coupon.schedule);
  };

  let openBarcodeModal = (couponData) => {
    console.log("Open Barcode: ")
    console.log(couponData)
    setCurrAddCouponData(couponData);
    setModalVisible(false);
    setBarcodeModalIsOpen(true);
  };

  let backToCoupons = () => {
    setBarcodeModalIsOpen(false)
    setModalVisible(true)
  }

  let afterRetrieval = (couponData) => {
    setCurrAddCouponData(couponData);
    console.log("------------------- after ret:")
    console.log(currAddCouponData)
    setBarcodeModalIsOpen(false);
    setModalVisible(true);
  };

  useEffect(() => {
    loadCouponList();
  }, [dataChange]);

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
            coupon={currAddCouponData}
            openBarcode={openBarcodeModal}
          />
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={barcodeModalIsOpen}
          onRequestClose={() => backToCoupons()}
        >
          <BarcodeCamModal
            onClose={() => backToCoupons()}
            coupon={currAddCouponData}
            afterRetrieval={afterRetrieval}
          />
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={couponModalIsOpen}
          onRequestClose={closeCouponModal}
        >
          <CouponDetailModal
            closeModal={closeCouponModal}
            coupon={couponModalData}
            openDeleteModal={openDeleteModal}
            markUsed={markCouponUsed}
            markUnused={markCouponUnused}
          />
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={deleteModalIsOpen}
          onRequestClose={() => setDeleteModalIsOpen(false)}
        >
          <ConfirmDeleteModal
            deleteCouponSequence={deleteCouponSequence}
            closeModal={() => setDeleteModalIsOpen(false)}
            coupon={deleteModalData}
          />
        </Modal>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              marginTop: 20,
              fontWeight: "bold",
              fontSize: 20,
              marginLeft: 20,
            }}
          >
            Coupons
          </Text>

          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={[
              styles.couponButton,
              {
                borderColor: "#FF6347",
                borderWidth: 1,
                marginTop: 17,
                marginLeft: 90,
              },
            ]}
          >
            <Text style={[styles.buttonText, { color: "#ff6347" }]}>
              Add Coupon
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 20 }}
        >
          {showContent()}
        </ScrollView>

        {/* <Button
          title="Back"
          onPress={() => {
            setPageNumber(pageNumber === 0 ? 0 : pageNumber - 1);
            console.log(pageNumber)
            setDataChange(dataChange + 1)
          }}
        />
        <Button
          title="Next"
          onPress={() => {
            setPageNumber(pageNumber + 1);
            console.log(pageNumber)
            setDataChange(dataChange + 1)
          }}
        /> */}
        {/* <Button
          title="Press to schedule a notification"
          onPress={async () => {
            console.log("pressed");
            await schedulePushNotification();
          }}
        /> */}
      </SafeAreaView>
    );
  }
}

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

  couponButton: {
    width: "40%",
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
