import { View, Text, TextInput, Button } from 'react-native';
import React from 'react';
import AppStyles from '../../styles/AppStyles';

export default function AddCouponModal(props) {
  let [coupon, setCoupon] = React.useState("");
  return (
    <View style={AppStyles.container}>
      <Text style={AppStyles.header}>Add Coupon</Text>
      <TextInput 
          style={[AppStyles.textInput, AppStyles.darkTextInput]} 
          placeholder='Coupon'
          value={coupon}
          onChangeText={setCoupon} />
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