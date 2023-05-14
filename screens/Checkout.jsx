import React, { useState, useContext } from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  Button,
} from 'react-native';
import { Card, Icon, Input, ListItem } from '@rneui/themed';
import { AppContext } from '../components/Context';
import { checkout, auth, clearCart } from '../app/firebase';
import * as ImagePicker from 'expo-image-picker';

const Checkout = ({ navigation }) => {
  const { totalPrice, orders, setOrders, setCart, id } = useContext(AppContext);
  const [checked, setChecked] = useState(null);

  const [fname, setFname] = useState(null);
  const [lname, setLname] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address1, setAddress1] = useState(null);
  const [address2, setAddress2] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [country, setCountry] = useState(null);
  const [pincode, setPincode] = useState(null);
  const [file, setFile] = useState(null);






  const handleChooseFile = async () => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      setFile(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckout = () => {
    // get four random numbers between 1000 to 9999
    const trackingNumber = Math.floor(1000 + Math.random() * 9000);
    const order = {
      user_id: String(id),
      fname: fname,
      lname: lname,
      email: email,
      phone: phone,
      address1: address1,
      address2: address2,
      city: city,
      state: state,
      country: country,
      pincode: pincode,
      status: "Order Placed",
      terms: 1,
      total_price: totalPrice,
      trackingNumber: `WHEY${trackingNumber}`,
      payment_method: checked === 0 ? 'BPI' : 'Gcash'
    };
    console.log(order)
    if (fname !== null && lname !== null && email !== null && phone !== null && address1 !== null && address2 !== null && city !== null && state !== null && country !== null && pincode !== null && checked !== null) {
      checkout(id, orders, setOrders, order, file, setCart);
      // Clear the states
      setEmail('');
      setFile(null);
      setChecked(null);

      // Redirect to orders
      navigation.navigate('Orders');
    } else {
      alert('Please fill up the form');
    }
  };

  return (
    <>
      <ScrollView>
        <Card
          style={{
            marginHorizontal: 16,
            marginVertical: 16,
            borderRadius: 8,
          }}
        >
          <Card.Title
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 8,
            }}
          >
            <Icon name="shopping-cart" />
            <Text>Checkout</Text>
          </Card.Title>

          <Card.Divider style={{ marginBottom: 50 }} />

          <View style={{ paddingHorizontal: 16 }}>
            <Input
              placeholder="First Name"
              onChange={(e) => setFname(e.nativeEvent.text)}
              leftIcon={<Icon name="user" type="font-awesome-5" size={20} />}
              style={{ marginBottom: 16 }}
            />

            <Input
              placeholder="Last Name"
              onChange={(e) => setLname(e.nativeEvent.text)}
              leftIcon={<Icon name="user" type="font-awesome-5" size={20} />}
              style={{ marginBottom: 16 }}
            />

            <Input
              placeholder="Email"
              onChange={(e) => setEmail(e.nativeEvent.text)}
              leftIcon={<Icon name="email" size={20} />}
              style={{ marginBottom: 16 }}
            />

            <Input
              placeholder="Phone"
              onChange={(e) => setPhone(e.nativeEvent.text)}
              leftIcon={<Icon name="phone" size={20} />}
              style={{ marginBottom: 16 }}
            />

            <Input
              placeholder="Address 1"
              onChange={(e) => setAddress1(e.nativeEvent.text)}
              leftIcon={<Icon name="map-marker" size={20} />}
              style={{ marginBottom: 16 }}
            />

            <Input  
              placeholder="Address 2"
              onChange={(e) => setAddress2(e.nativeEvent.text)}
              leftIcon={<Icon name="map-marker" size={20} />}
              style={{ marginBottom: 16 }}
            />

            <Input
              placeholder="City"
              onChange={(e) => setCity(e.nativeEvent.text)}
              leftIcon={<Icon name="map-marker" size={20} />}
              style={{ marginBottom: 16 }}
            />

            <Input
              placeholder="State"
              onChange={(e) => setState(e.nativeEvent.text)}
              leftIcon={<Icon name="map-marker" size={20} />}
              style={{ marginBottom: 16 }}
            />

            <Input
              placeholder="Country"
              onChange={(e) => setCountry(e.nativeEvent.text)}
              leftIcon={<Icon name="map-marker" size={20} />}
              style={{ marginBottom: 16 }}
            />

            <Input
              placeholder="Pincode"
              onChange={(e) => setPincode(e.nativeEvent.text)}
              leftIcon={<Icon name="map-marker" size={20} />}
              style={{ marginBottom: 16 }}
            />



            <Text style={{ marginBottom: 8 }}>Payment Method</Text>

            <ListItem bottomDivider style={{ marginBottom: 16 }}>
              <ListItem.CheckBox
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checked={checked === 0}
                onPress={() => setChecked(0)}
              />
              <ListItem.Content>
                <ListItem.Title>BPI</ListItem.Title>
              </ListItem.Content>
            </ListItem>

            <ListItem bottomDivider style={{ marginBottom: 16 }}>
              <ListItem.CheckBox
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checked={checked === 1}
                onPress={() => setChecked(1)}
              />
              <ListItem.Content>
            <ListItem.Title>Gcash</ListItem.Title>
            </ListItem.Content>
            </ListItem>

            <Text style={{ marginBottom: 8 }}>Proof of Payment</Text>

            {
              file ? (
                <Image
                  source={{ uri: file.uri }}
                  style={{ width: 200, height: 200, marginBottom: 16 }}
                />
              ) : (
                <Button
                  title="Choose File"
                  onPress={handleChooseFile}
                  style={{ marginBottom: 16 }}
                />
              )
            }
</View>
</Card>
</ScrollView>

<View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
<Text>Total</Text>
<Text>Php {totalPrice.toFixed(2)}</Text>
</View>

<Button
title="Place Order"
onPress={handleCheckout}
style={{ marginTop: 16 }}
/>
</View>
</>
);
};

export default Checkout;