import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';


export default function BarcodeCamModal(props) {
  let [hasPermission, setHasPermission] = useState(null);
  let [scanned, setScanned] = useState(false);
  let [text, setText] = useState('Not yet scanned')
  let [data, setData] = useState({})

  let askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  let handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data)
    let barcode = {}
    barcode["usesBarcode"] = true
    barcode["type"] = type
    barcode["data"] = data
    console.log('Type: ' + type + '\nData: ' + data)
    let couponData = props.coupon
    couponData.barcodeData = barcode
    console.log(couponData)
    setData(couponData)
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

  // Return the View
  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? () => props.afterRetrieval(data) : handleBarCodeScanned}
          style={{ height: 500, width: 500 }} />
      </View>
      <Text style={styles.maintext}>Scan your coupon barcode!</Text>

      {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' />}
    </View>
  );
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