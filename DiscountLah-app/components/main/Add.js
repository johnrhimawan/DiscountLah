import { View, Button, Text, Modal, SafeAreaView, ActivityIndicator, FlatList } from 'react-native';
import InlineTextButton from '../feature/InlineTextButton';
import AppStyles from '../../styles/AppStyles';
import firebase from "firebase";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore";
import React from 'react';
import AddCouponModal from '../feature/AddCouponModal';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export default function AddCoupon() {
  let [modalVisible, setModalVisible] = React.useState(false);
  let [isLoading, setIsLoading] = React.useState(true);
  let [isRefreshing, setIsRefreshing] = React.useState(false);
  let [addCoupons, setCoupons] = React.useState([]);
  let [querySnapshot, setQuerySnapshot] = React.useState(null);
  let [deletedDoc, setDeletedDoc] = React.useState(null);
  let [docRef, setDocRef] = React.useState(null);

  let loadCouponList = async () => {
    console.log("load coupon");
    const q = query(collection(firebase.firestore(), "coupons"), where("userId", "==", firebase.auth().currentUser.uid));
    try {
      let querySnapshot = await getDocs(q);
    } catch (err) {
      console.error(err);
    }
    setQuerySnapshot(querySnapshot);
    
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
    console.log("check coupon");
    const couponRef = doc(firebase.firestore(), 'coupons', item.id);
    setDoc(couponRef, { completed: isChecked }, { merge: true });
  };

  let deleteCoupon = async (couponId) => {
    console.log("delete coupon");
    try {
      let deletedDoc = await deleteDoc(doc(firebase.firestore(), "coupons", couponId));
    } catch (err) {
      console.error(err);
    }
    setDeletedDoc(deletedDoc);
    let updatedCoupons = [...coupons].filter((item) => item.id != couponId);
    setCoupons(updatedCoupons);
  };

  let renderCouponItem = ({item}) => {
    console.log("render coupon");
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
        keyExtractor={item => item.id} />
    )
  };

  let showContent = () => {
    console.log("show content");
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



  let addCoupon = async (coupon) => {
    console.log("add coupon");
    let couponToSave = {
      text: coupon,
      completed: false,
      userId: firebase.auth().currentUser.uid
    };

    try {
      let docRef = await addDoc(collection(firebase.firestore(), "coupons"), couponToSave);
    } catch(err) {
      console.error(err);
    }
    setDocRef(docRef);
    couponToSave.id = docRef.id;

    let updatedCoupons = [...coupons];
    updatedCoupons.push(couponToSave);

    setCoupons(updatedCoupons);
  };
  
  //if (!querySnapshot || !deletedDoc || !docRef) {
  //  return null;
 // } else {
    return (
      <SafeAreaView>
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
        {showContent()}
      </SafeAreaView>
    )
  //}
}
