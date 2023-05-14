import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, RefreshControl } from 'react-native';
import { Button, Card, Icon } from '@rneui/base';
import { AppContext } from '../components/Context';
import { removeFromCart, auth, getCartItems } from '../app/firebase';

const Cart = ({ navigation }) => {
  const { cart, setCart, id, setPrice, totalPrice } = useContext(AppContext);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getCartItems(id, setCart, setPrice);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);

    getCartItems(id, setCart, setPrice);

    setRefreshing(false);
  };
  
  const removeToCart = (prodId, price) => {
    removeFromCart(id, prodId, setCart, cart, price, setPrice, totalPrice)
  }

  const renderCartItems = () => {
    return cart.map((item, index) => (
      <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Image source={{ uri: item.img }} style={{ width: 60, height: 60, borderRadius: 10, marginRight: 10 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>{item.name}</Text>
          <Text style={{ color: 'gray', marginBottom: 5 }}>{item.description}</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'green' }}>{item.selling_price}</Text>
          
        </View>
        <Button
          title="Remove"
          type="clear"
          onPress={() => removeToCart(item.id, item.selling_price)}
        />
        <Card.Divider />
      </View>
    ));
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }} refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <Card containerStyle={{ borderRadius: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Icon name="cart" type="material-community" />
          <Text style={{ fontSize: 24, marginLeft: 10 }}>Cart</Text>
        </View>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
        }}>
          <Text style={{ fontSize: 24, marginLeft: 10 }}>Total Price: </Text>
          <Text style={{ fontSize: 24, marginLeft: 10 }}>PHP {totalPrice}</Text>
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
