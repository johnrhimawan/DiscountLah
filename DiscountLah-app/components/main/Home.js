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
import CouponItem from "../feature/CouponItem";
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

import { useIsFocused } from "@react-navigation/native";

import CouponDetailModal from "../feature/CouponDetailModal";
import ConfirmDeleteModal from "../feature/ConfirmDeleteModal";

import * as Notifications from "expo-notifications"

export default function Home({ navigation }) {
  let [isLoading, setIsLoading] = React.useState(true);
  let [isNameLoading, setIsNameLoading] = React.useState(true);
  let [isRefreshing, setIsRefreshing] = React.useState(false);
  let [coupons, setCoupons] = React.useState([]);
  let [querySnapshot, setQuerySnapshot] = React.useState(null);
  let [username, setUsername] = React.useState("");
  
  let [dataChange, setDataChange] = React.useState(0);

  const [couponModalIsOpen, setCouponModalIsOpen] = React.useState(false);
  const [couponModalData, setCouponModalData] = React.useState(null);

  const [deleteModalIsOpen, setDeleteModalIsOpen] = React.useState(false);
  const [deleteModalData, setDeleteModalData] = React.useState(null);

  let loadCouponList = async () => {
    console.log("load coupon");
    let coupons = [];

    let today = new Date();

    firebase
      .firestore()
      .collection("coupons")
      .where("userId", "==", firebase.auth().currentUser.uid)
      .where("used", "==", false)
      .where("validity", ">", today)
      .orderBy("validity")
      .get()
      .then((querySnapshot) => {
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

  let showCouponList = () => {
    console.log("show coupon");
    if (coupons.length > 0) {
      return (
        <View>
          <CouponItem coupons={coupons} openModal={openCouponModal} />
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
    setDataChange(dataChange + 1)
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
    setDataChange(dataChange + 1)
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


  useEffect(() => {
    getName();
    loadCouponList();
  }, [navigation, dataChange]);

  const isFocused = useIsFocused()

  useEffect(() => {
    console.log("called")
    if (isFocused) {
      loadCouponList()
    }
  }, [isFocused])

  let getName = async () => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((doc) => {
        if (doc) {
          setUsername(doc.data().name);
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    setIsNameLoading(false);
  };

  if (isLoading) {
    return null;
  } else {
    return (
      <SafeAreaView>
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
        <Text
          style={{
            marginTop: 20,
            fontWeight: "bold",
            fontSize: 20,
            marginLeft: 20,
          }}
        >
          Welcome back, {username}
        </Text>
        <Text
          style={{
            marginTop: 0,
            fontSize: 18,
            marginLeft: 20,
            marginBottom: 15,
          }}
        >
          These coupons will expire soon...
        </Text>
        {showContent()}
      </SafeAreaView>
    );
  }
}

// import React, { useEffect } from "react";
// import { View, Text, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
// import firebase from "firebase";
// import BouncyCheckbox from "react-native-bouncy-checkbox";
// import AppStyles from "../../styles/AppStyles";

// export default function Home() {
//   let [expiringCoupons, setExpiringCoupons] = React.useState([]);
//   let [loaded, setLoaded] = React.useState(false);
//   let [isLoading, setIsLoading] = React.useState(true);
//   let [isRefreshing, setIsRefreshing] = React.useState(false);

//   let today = new Date();
//   let year = today.getFullYear();
//   let month = today.getMonth();
//   let day = today.getDate();

//   let getExpiringCoupons = async () => {
//     console.log("getting expiring coupons");
//     let expiringCoupons = [];

//     firebase
//       .firestore()
//       .collection("coupons")
//       .where("userId", "==", firebase.auth().currentUser.uid)
//       .orderBy("validity")
//       .limit(5)
//       .get()
//       .then((querySnapshot) => {
//         // console.log(querySnapshot);
//         querySnapshot.forEach((doc) => {
//           console.log(doc.id, "=>", doc.data());
//           let coupon = doc.data();
//           coupon.id = doc.id;
//           expiringCoupons.push(coupon);
//         });
//       })
//       .catch((error) => {
//         console.log("Error getting documents: ", error);
//       });
//     console.log("execution done");

//     setExpiringCoupons(expiringCoupons);
//     setIsRefreshing(false);
//     setIsLoading(false);
//     setLoaded(true);
//   };

//   if (isLoading) {
//     getExpiringCoupons()
//   }

//   let checkCouponItem = (item, isChecked) => {
//     console.log("check coupon");
//     const couponRef = firebase.firestore().collection("coupons").doc(item.id);
//     couponRef.set({ completed: isChecked }, { merge: true });
//   };

//   let renderCouponItem = ({ item }) => {
//     console.log("render coupon");
//     return (
//       <View
//         style={[
//           AppStyles.rowContainer,
//           AppStyles.rightMargin,
//           AppStyles.leftMargin,
//         ]}
//       >
//         <View style={AppStyles.fillSpace}>
//           <BouncyCheckbox
//             isChecked={item.complated}
//             size={25}
//             fillColor="#258ea6"
//             unfillColor="#FFFFFF"
//             text={item.text}
//             iconStyle={{ borderColor: "#258ea6" }}
//             onPress={(isChecked) => {
//               checkCouponItem(item, isChecked);
//             }}
//           />
//         </View>
//       </View>
//     );
//   };

//   let showCouponList = () => {
//     console.log("show coupon");
//     return (
//       <FlatList
//         data={expiringCoupons}
//         refreshing={isRefreshing}
//         onRefresh={() => {
//           getExpiringCoupons();
//           setIsRefreshing(true);
//         }}
//         renderItem={renderCouponItem}
//         keyExtractor={(item) => item.id}
//       />
//     );
//   };

//   useEffect(() => {
//     getExpiringCoupons()
//   }, [])

//   function showCoupons() {
//     expiringCoupons.map((coupon) => {
//         console.log(coupon.storeName)
//         return (
//           <View>
//             <Text style={[AppStyles.header, {marginTop: 10}]}>
//               {coupon.storeName}
//             </Text>
//           </View>
//         )
//     })
//   }

//   if (isLoading) {
//     return null;
//   } else {
//     return (
//       <SafeAreaView>
//         <Text style={AppStyles.header}>
//           Welcome back! These coupons are expiring soon...
//         </Text>
//         {console.log("exp: " + loaded + expiringCoupons)}
//       </SafeAreaView>
//     );
//   }
// }
