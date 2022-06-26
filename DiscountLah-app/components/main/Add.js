import {
  View,
  Button,
  Text,
  Modal,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  StyleSheet
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
import React from "react";
import AddCouponModal from "../feature/AddCouponModal";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function AddCoupon() {
  let [modalVisible, setModalVisible] = React.useState(false);
  let [isLoading, setIsLoading] = React.useState(true);
  let [isRefreshing, setIsRefreshing] = React.useState(false);
  let [coupons, setCoupons] = React.useState([]);
  let [querySnapshot, setQuerySnapshot] = React.useState(null);
  let [deletedDoc, setDeletedDoc] = React.useState(null);
  let [docRef, setDocRef] = React.useState(null);
  let [hasPermission, setHasPermission] = React.useState(null);
  let [scanned, setScanned] = React.useState(false);
  let [text, setText] = React.useState('Not yet scanned')

  let loadCouponList = async () => {
    console.log("load coupon");
    let coupons = [];

    firebase
      .firestore()
      .collection("coupons")
      .where("userId", "==", firebase.auth().currentUser.uid)
      .get()
      .then(() => {
        console.log("this got executed now");
      })
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
    firebase
      .firestore()
      .collection("coupons")
      .doc("couponId")
      .delete()
      .then(() => { console.log("Document successfully deleted!");})
      .catch((error) => {
        console.error("Error removing document: ", error);
      })
    
    setDeletedDoc(couponId);
    let updatedCoupons = [...coupons].filter((item) => item.id != couponId);
    setCoupons(updatedCoupons);
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

  let addCoupon = async (coupon) => {
    console.log("add coupon");
    let couponToSave = {
      text: coupon,
      completed: false,
      userId: firebase.auth().currentUser.uid,
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

  let askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

  // Request Camera Permission
  React.useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  let handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data)
    console.log('Type: ' + type + '\nData: ' + data)
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>)
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>)
  }

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
        <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }} />
      </View>
      <Text style={styles.maintext}>{text}</Text>

      {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' />}
    </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato'
  }
});
