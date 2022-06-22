import { View, Button, Text, Modal, SafeAreaView, ActivityIndicator, FlatList } from 'react-native';
import InlineTextButton from '../feature/InlineTextButton';
import AppStyles from '../../styles/AppStyles';
import { auth, db } from "../../App";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore"; 
import { sendEmailVerification } from 'firebase/auth';
import React from 'react';
import AddCouponModal from '../feature/AddCouponModal';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export default function AddCoupon({ navigation }) {
  let [modalVisible, setModalVisible] = React.useState(false);
  let [isLoading, setIsLoading] = React.useState(true);
  let [isRefreshing, setIsRefreshing] = React.useState(false);
  let [addCoupons, setCoupons] = React.useState([]);

  let loadCouponList = async () => {
    const q = query(collection(db, "coupons"), where("userId", "==", auth.currentUser.uid));

    const querySnapshot = await getDocs(q);
    let coupons = [];
    querySnapshot.forEach((doc) => {
      let coupon = doc.data();
      coupon.id = doc.id;
      coupons.push(coupon);
    });

    setCoupons(coupons);
    setIsLoading(false);
    setIsRefreshing(false);
  };

  if (isLoading) {
    loadCouponList();
  }

  let checkCouponItem = (item, isChecked) => {
    const couponRef = doc(db, 'coupons', item.id);
    setDoc(couponRef, { completed: isChecked }, { merge: true });
  };

  let deleteCoupon = async (couponId) => {
    await deleteDoc(doc(db, "coupons", couponId));
    let updatedCoupons = [...coupons].filter((item) => item.id != couponId);
    setCoupons(updatedCoupons);
  };

  let renderCouponItem = ({item}) => {
    return (
      <View style={[AppStyles.rowContainer, AppStyles.rightMargin, AppStyles.leftMargin]}>
        <View style={AppStyles.fillSpace}>
          <BouncyCheckbox
            isChecked={item.complated}
            size={25}
            fillColor="#258ea6"
            unfillColor="#FFFFFF"
            text={item.text}
            iconStyle={{ borderColor: "#258ea6" }}
            onPress={(isChecked) => { checkCouponItem(item, isChecked)}}
          />
        </View>
        <InlineTextButton text="Delete" color="#258ea6" onPress={() => deleteCoupon(item.id)} />
      </View>
    );
  }

  let showCouponList = () => {
    return (
      <FlatList
        data={coupons}
        refreshing={isRefreshing}
        onRefresh={() => {
          loadCouponList();
          setIsRefreshing(true);
        }}
        renderItem={renderCouponItem}
        keyExtractor={item => item.id} />
    )
  };

  let showContent = () => {
    return (
      <View>
        {isLoading ? <ActivityIndicator size="large" /> : showCouponList() }
        <Button 
          title="Add Coupon" 
          onPress={() => setModalVisible(true)} 
          color="#fb4d3d" />
      </View>
    );
  };

  let showSendVerificationEmail = () => {
    return (
      <View>
        <Text>Please verify your email to use Coupon</Text>
        <Button title="Send Verification Email" onPress={() => sendEmailVerification(auth.currentUser)} />
      </View>
    );
  };

  let addCoupon = async (coupon) => {
    let couponToSave = {
      text: coupon,
      completed: false,
      userId: auth.currentUser.uid
    };
    const docRef = await addDoc(collection(db, "coupons"), couponToSave);

    couponToSave.id = docRef.id;

    let updatedCoupons = [...coupons];
    updatedCoupons.push(couponToSave);

    setCoupons(updatedCoupons);
  };
  
  return (
    <SafeAreaView>
      <View style={[AppStyles.rowContainer, AppStyles.rightAligned, AppStyles.rightMargin, AppStyles.topMargin]}>
        <InlineTextButton text="Manage Account" color="#258ea6" onPress={() => navigation.navigate("ManageAccount")}/>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <AddCouponModal 
          onClose={() => setModalVisible(false)}
          addCoupon={addCoupon} />
      </Modal>
      <Text style={AppStyles.header}>Coupon</Text>
      {auth.currentUser.emailVerified ? showContent() : showSendVerificationEmail()}
    </SafeAreaView>
  )
}
/*
import React from "react";
import { Stylesheet, Text, View, Button } from "react-native";
// import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import {
  useFonts,
  Sunflower_500Medium,
  Sunflower_700Bold,
} from "@expo-google-fonts/dev";

export default function Add() {
  let [fontsLoaded] = useFonts({
    Sunflower_500Medium,
    Sunflower_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{marginTop: 20}}>
      <Text
        style={{
          fontFamily: "Sunflower_700Bold",
          fontSize: 24,
          textAlign: "left",
          marginLeft: 10,
          marginBottom: 5,
        }}
      >
        {" "}
        Add Coupons{" "}
      </Text>
      <Text
        style={{
          fontFamily: "Sunflower_500Medium",
          fontSize: 18,
          color: "#9f9f9f",
          textAlign: "left",
          marginLeft: 15,
          marginTop: 5,
          marginBottom: 10,
        }}
      >
        {" "}
        Fields will be available here for users to add their coupons{" "}
      </Text>
    </View>
  );
}
*/