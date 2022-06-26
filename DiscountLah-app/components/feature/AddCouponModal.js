import { View, Text, TextInput, Button } from 'react-native';
import React from 'react';
import AppStyles from '../../styles/AppStyles';

export default function AddCouponModal(props) {
  let [coupon, setCoupon] = React.useState("");
  let [store, setStore] = React.useState("");
  let [description, setDescription] = React.useState("");
  let [date, setDate] = React.useState('');

  return (
    <View style={AppStyles.container}>
      <Text style={AppStyles.header}>Add Coupon</Text>
      <TextInput 
          style={[AppStyles.textInput, AppStyles.darkTextInput]} 
          placeholder='Coupon'
          value={coupon}
          onChangeText={setCoupon} />
      <TextInput 
          style={[AppStyles.textInput, AppStyles.darkTextInput]} 
          placeholder='Store Name'
          value={store}
          onChangeText={setStore} />
      <TextInput 
          style={[AppStyles.textInput, AppStyles.darkTextInput]} 
          placeholder='Coupon Description'
          value={description}
          onChangeText={setDescription} />
  
      <View style={[AppStyles.rowContainer, AppStyles.rightAligned, AppStyles.rightMargin]}>
        <Button title="Cancel" onPress={props.onClose} />
        <Button title="OK" onPress={() => {
          props.addCoupon(coupon);
          setCoupon("");
          props.onClose();
        }} />
      </View>
    </View>
  );
}
