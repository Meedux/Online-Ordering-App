import React, { useContext } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { Button, Card, Icon } from '@rneui/base';
import { AppContext } from '../components/Context';
import { removeFromCart, auth } from '../app/firebase';

const Cart = ({ navigation }) => {
  const { cart, setCart } = useContext(AppContext);

  const renderCartItems = () => {
    return cart.map((item, index) => (
      <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Image source={{ uri: item.img }} style={{ width: 60, height: 60, borderRadius: 10, marginRight: 10 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>{item.name}</Text>
          <Text style={{ color: 'gray', marginBottom: 5 }}>{item.description}</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'green' }}>{item.price}</Text>
        </View>
        <Button
          title="Remove"
          type="clear"
          onPress={() => removeFromCart(auth.currentUser.uid, item, setCart)}
        />
      </View>
    ));
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Card containerStyle={{ borderRadius: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Icon name="cart" type="material-community" />
          <Text style={{ fontSize: 24, marginLeft: 10 }}>Cart</Text>
        </View>
        <Card.Divider />
        {cart.length > 0 ? (
          renderCartItems()
        ) : (
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 16, marginBottom: 10 }}>Your cart is empty</Text>
            <Button title="Shop now" onPress={() => navigation.navigate('Shop')} />
          </View>
        )}
      </Card>
      {cart.length > 0 && (
        <Button
          title="Checkout"
          containerStyle={{ marginTop: 20 }}
          buttonStyle={{ backgroundColor: 'green' }}
          onPress={() => navigation.navigate('Checkout')}
        />
      )}
    </ScrollView>
  );
};

export default Cart;
