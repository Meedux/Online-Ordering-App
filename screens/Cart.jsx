import React from 'react'
import { Text, View, ScrollView, Image } from 'react-native'
import { Button, Card, Icon } from '@rneui/themed'
import { useState, useContext } from 'react'
import { AppContext } from '../components/Context'
import { removeFromCart, auth } from '../app/firebase'

const Cart = ({ navigation }) => {
  const { cart, setCart } = useContext(AppContext)



  return (
    <>
      <ScrollView>
        <Card style={{
          width: 700,
          height: 800,
          borderRadius: 30,
          padding: 10,
          margin: 10,
          marginVertical: 80,
        }}>
          <Card.Title style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
          }}>
            <Icon name="shopping-cart" />
            Cart
          </Card.Title>
          <Card.Divider />
          {
            cart ? (
              <>
                {
                  cart?.map((item, index) => (
                    <View key={index} style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%'
                    }}>
                      <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        flexWrap: 'wrap',
                      }}>
                        <Image source={{
                          uri: item.img,
                        }} style={{
                          width: 50,
                          height: 50,
                          borderRadius: 100,
                        }} />
                        <Text style={{
                          fontSize: 11,
                          fontWeight: 'bold',
                          marginLeft: 10,
                        }}>
                          {item.name}
                        </Text>
                      </View>
                      <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        flexWrap: 'wrap',
                      }}>
                        <Text style={{
                          color: 'green',
                          fontSize: 13,
                          fontWeight: 'bold',
                          marginRight: 10,
                        }}>
                          {item.price}
                        </Text>
                        <Button
                          onPress={() => {    
                            removeFromCart(auth.currentUser.uid, item, setCart)
                          }}
                        >
                          Remove
                        </Button>
                      </View>
                    </View>
                  ))
                
                }
              </>
            ) : (
              <>
                <Text>
                  No items in the Cart
                </Text>
                <Button
                  style={{
                    marginTop: 10,
                  }}
                >
                  Shop
                </Button>
              </>
            )
          }
        </Card>
        {
          cart && (
            <Button
              style={{
                marginTop: 10,
                marginBottom: 30,
                width: 80,
              }}
              onPress={() => {
                // checkout
                navigation.navigate('Checkout')
              }}
            >

              Checkout
            </Button>
          )
        }
      </ScrollView>
    </>
  )
}

export default Cart