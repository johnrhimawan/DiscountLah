import {
  View,
  Text,
  TextInput,
  Button,
  Platform,
  Pressable,
} from "react-native";
import React from "react";
import AppStyles from "../../styles/AppStyles";

import DateTimePicker from "@react-native-community/datetimepicker";
import SelectList from "react-native-dropdown-select-list";

const storeNames = [
  {key:1, value:'Boost'},
{key:2, value:'Don Don Donki'},
{key:3, value:'H&M'},
{key:4, value:'KFC'},
{key:5, value:'NUS Co-op'},
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
        dropdownStyles={{backgroundColor: 'gray'}}
        dropdownTextStyles={{color: 'white'}}
        placeholder="Select store"
        maxHeight={200}
      />

      <TextInput
        style={[AppStyles.textInput, AppStyles.darkTextInput]}
        placeholder="Coupon ID"
        value={coupon}
        onChangeText={setCoupon}
      />

      <Pressable onPress={() => setShow(true)}>
        <Text style={[AppStyles.textInput, AppStyles.darkTextInput]}>
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
            props.addCoupon({
              storeName: storeNames[selected - 1].value,
              couponId: coupon,
              validity: date,
              desc: description,
            });
            setCoupon("");
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
