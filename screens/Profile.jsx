import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Button, Card, Divider, Avatar } from 'react-native-paper';
import { logout, auth, getCurrentUserById } from '../app/firebase';
import { useContext } from 'react';
import { AppContext } from '../components/Context';

const Profile = ({ navigation }) => {
  const [user, setUser] = useState({});
  const { orders, cart } = useContext(AppContext);

  useEffect(() => {
    getCurrentUserById(auth.currentUser.uid, setUser);
  }, []);

  return (
    <ScrollView style={{ backgroundColor: '#f7f7f7' }}>
      <View style={{ padding: 20, marginTop: 40 }} >
        <Card elevation={3} style={{ backgroundColor: '#F1F8FF' }}>
          <Card.Cover
            source={{
              uri: 'https://wheyfactoryph.shop/public/assets/uploads/category/1680263166.jpeg',
            }}
          />
          <Divider />
          <Card.Title
            title={user.name}
            subtitle={user.email}
            left={(props) => <Avatar.Icon {...props} icon="account" style={{ backgroundColor: '#2089DC' }}/>}
            style={styles.cardTitle}
          />
        </Card>

        <View style={styles.body}>
          <View style={styles.stats}>
            <Button
              icon="package-variant"
              mode="outlined"
              textColor='#2089DC'
              onPress={() => {
                navigation.navigate('Orders');
              }}
              style={styles.statButton}
            >
              Orders
            </Button>
            <Text style={styles.statText}>{orders?.length || 0}</Text>
          </View>
          <View style={styles.stats}>
            <Button
              icon="cart"
              mode="outlined"
              textColor='#2089DC'
              onPress={() => {
                navigation.navigate('Cart');
              }}
              style={styles.statButton}
            >
              Cart
            </Button>
            <Text style={styles.statText}>{cart?.length || 0}</Text>
          </View>
        </View>

        <Button
          mode="contained"
          onPress={logout}
          style={styles.logoutButton}
          labelStyle={styles.logoutButtonLabel}
        >
          Logout
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },
  cardTitle: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  divider: {
    marginTop: 10,
  },
  body: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 3,
  },
  stats: {
    alignItems: 'center',
  },
  statButton: {
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 10,
    marginBottom: 10,
  },
  statText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  logoutButton: {
    marginTop: 50,
    paddingVertical: 10,
    backgroundColor: '#2089DC',
    borderRadius: 10,
    elevation: 3,
  },
  logoutButtonLabel: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Profile;
