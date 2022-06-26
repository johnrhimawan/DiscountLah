import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import React from 'react';
import AppStyles from '../../styles/AppStyles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function AddCouponModal(props) {
  let [coupon, setCoupon] = React.useState("");
  let [store, setStore] = React.useState("");
  let [description, setDescription] = React.useState("");
  let [date, setDate] = React.useState('');
  let [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    hideDatePicker();
  };

  const getDate = () => {
    let tempDate = date.toString().split(' ');
    return date !== ''
      ? `${tempDate[0]} ${tempDate[1]} ${tempDate[2]} ${tempDate[3]}`
      : '';
  };


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
      <TextInput
        style={[AppStyles.textInput, AppStyles.darkTextInput]}
        value={getDate()}
        placeholder="Set expiry date"
      />
      <Button onPress={showDatePicker} title="Set Date" />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Text>{date.toString()}</Text>
  
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
