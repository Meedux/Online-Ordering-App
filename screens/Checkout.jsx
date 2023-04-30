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
  const { totalPrice, orders, setOrders, setCart } = useContext(AppContext);
  const [checked, setChecked] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
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
    const order = {
      name,
      email,
      paymentMethod: checked === 0 ? 'BPI' : 'Gcash',
    };

    if (name && email && file) {
      checkout(auth.currentUser.uid, orders, setOrders, order, file);
      clearCart(auth.currentUser.uid, setCart);

      // Clear the states
      setName('');
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
              placeholder="Name"
              onChange={(e) => setName(e.nativeEvent.text)}
              leftIcon={<Icon name="user" type="font-awesome-5" size={20} />}
              style={{ marginBottom: 16 }}
            />

            <Input
              placeholder="Email"
              onChange={(e) => setEmail(e.nativeEvent.text)}
              leftIcon={<Icon name="email" size={20} />}
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