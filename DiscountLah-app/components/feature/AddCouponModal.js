import {
  View,
  Text,
  TextInput,
  Button,
  Platform,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import AppStyles from "../../styles/AppStyles";

import DateTimePicker from "@react-native-community/datetimepicker";
import SelectList from "react-native-dropdown-select-list";

import * as Notifications from "expo-notifications";
import { BigShouldersDisplay_200ExtraLight } from "@expo-google-fonts/dev";

import { useIsFocused } from "@react-navigation/native";

const storeNames = [
  { key: 1, value: "Boost" },
  { key: 2, value: "Don Don Donki" },
  { key: 3, value: "H&M" },
  { key: 4, value: "KFC" },
  { key: 5, value: "NUS Co-op" },
];

export default function AddCouponModal(props) {
  let [coupon, setCoupon] = React.useState("");
  let [selected, setSelected] = React.useState(0);
  let [store, setStore] = React.useState("");
  let [description, setDescription] = React.useState("");
  let [validity, setValidity] = React.useState("");

  const [isDateSet, setIsDateSet] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [show, setShow] = React.useState(false);

  const [barcodeData, setBarcodeData] = React.useState({});
  const [data, setData] = React.useState({});

  const [schedule, setSchedule] = React.useState({});
  const [storeName, setStoreName] = React.useState("");

  let assignSchedule = () => {
    const trigger = new Date(date - 24 * 60 * 60 * 1000);
    trigger.setMinutes(0);
    trigger.setSeconds(0);

    let body =
      "Your coupon for " +
      storeNames[selected - 1].value +
      " is expiring in 24 hours. Grab your deals soon!";

    let schedule = {
      content: {
        title: "Coupon expiring soon!",
        body: body,
      },
      trigger,
      data: {
        couponId: coupon,
      },
    };

    setSchedule(schedule);
    
    let barcode = barcodeData

    if (!barcodeData) {
      barcode = { usesBarcode: false, type: "", data: "" }
    }

    props.addCoupon({
      storeName: storeNames[selected - 1].value,
      couponId: coupon,
      validity: date,
      desc: description,
      schedule: schedule,
      barcodeData: barcode,
    });
    setCoupon("");
    Notifications.scheduleNotificationAsync(schedule);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setIsDateSet(true);
    setDate(currentDate);
  };

  const dateFormatter = (date) => {
    let tempDate = date;
    return (
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear()
    );
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    console.log("Executed");
    if (isFocused) {
      if (props.coupon) {
        if (props.coupon.barcodeData) {
          setCoupon(props.coupon.barcodeData.data);
        }
        setDescription(props.coupon.desc);
        setBarcodeData(props.coupon.barcodeData);
      }
    }
  }, [isFocused]);

  return (
    <View style={AppStyles.container}>
      <Text style={AppStyles.header}>Add Coupon</Text>

      {/* <TextInput
        style={[AppStyles.textInput, AppStyles.darkTextInput]}
        placeholder="Store Name"
        value={store}
        onChangeText={setStore}
      /> */}
      <SelectList
        data={storeNames}
        setSelected={setSelected}
        dropdownStyles={{ backgroundColor: "gray" }}
        dropdownTextStyles={{ color: "white" }}
        placeholder="Select store            "
        maxHeight={200}
        boxStyles={{ marginTop: 30 }}
      />

      <TextInput
        style={[AppStyles.textInput, AppStyles.darkTextInput]}
        placeholder="Coupon ID"
        value={coupon}
        onChangeText={setCoupon}
      />

      <Button
        title="Scan Barcode"
        onPress={() => {
          props.openBarcode({
            selected: selected,
            couponId: coupon,
            validity: date,
            desc: description,
            schedule: schedule,
            barcodeData: barcodeData,
          });
        }}
      />

      <Pressable onPress={() => setShow(true)}>
        <Text
          style={[AppStyles.textInput, AppStyles.darkTextInput, { width: 330 }]}
        >
          {isDateSet ? dateFormatter(date) : "Coupon Expiry Date"}
        </Text>
      </Pressable>

      <TextInput
        style={[AppStyles.textInput, AppStyles.darkTextInput]}
        placeholder="Coupon Description"
        value={description}
        onChangeText={setDescription}
      />
      <View
        style={[
          AppStyles.rowContainer,
          AppStyles.rightAligned,
          AppStyles.rightMargin,
        ]}
      >
        <Button title="Cancel" onPress={props.onClose} />
        <Button
          title="OK"
          onPress={() => {
            assignSchedule();
            console.log(schedule)
            props.onClose();
          }}
        />
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={date}
          display="default"
          onChange={onDateChange}
        />
      )}
    </View>
  );
}
