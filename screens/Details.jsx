import React, { useContext } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Button } from '@rneui/themed';
import { useRoute } from '@react-navigation/native';
import { addToCart, auth } from '../app/firebase';
import { AppContext } from '../components/Context';

const Details = () => {
  const route = useRoute();
  const { cart, setCart, id, setPrice, totalPrice } = useContext(AppContext);

  const handleAddToCart = () => {
    const item = {
      user_id: String(id),
      prod_id: String(route?.params.product.id),
      prod_qty: "1",
    }
    addToCart(route?.params.product.name, item, setPrice, totalPrice, Number(route?.params.product.selling_price));
    setCart([...cart, route?.params.product]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: route?.params.product.img }}
          style={styles.image}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{route?.params.product.name}</Text>
        <Text style={styles.price}>{route?.params.product.selling_price}</Text>
        <Text style={styles.description}>
          {route?.params.product.long_description}
        </Text>
        <Button style={styles.button} onPress={handleAddToCart}>
          Add to Cart
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    height: 300,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  detailsContainer: {
    flex: 1,
    marginTop: -40,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    color: '#FF6C00',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#FF6C00',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
};

export default Details;
