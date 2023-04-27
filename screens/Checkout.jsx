import React from 'react'
import { Text, View, ScrollView, Image } from 'react-native'
import { Button, Card, Icon, Input, ListItem } from '@rneui/themed'
import { useState, useContext } from 'react'
import { AppContext } from '../components/Context'
import { checkout, auth, clearCart } from '../app/firebase'


const Checkout = ({ navigation }) => {
  const { totalPrice, orders, setOrders, setCart } = useContext(AppContext)
  const [checked, setChecked] = useState(null)

  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ paymentMethod, setPaymentMethod ] = useState('')

  return (
    <>
          {/* Checkout Form */}
          <ScrollView>
            <Card style={{
              marginHorizontal: 80
            }}>
              <Card.Title style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 10,
              }}>
                <Icon name="shopping-cart" />
                <Text>Checkout</Text>
              </Card.Title>

              <Card.Divider style={{ marginBottom: 50 }}/>


              <View style={{
                marginHorizontal: 50,
                marginBottom: 20,
              }}>
                <Input 
                  placeholder="Name"
                  onChange={(e) => setName(e.nativeEvent.text)}
                  style={{
                    
                  }}
                  leftIcon={<Icon name="user" type='font-awesome-5' size={20} color={'black'}/>}
                />
              </View>

              <View style={{
                marginHorizontal: 50,
                marginBottom: 20,
              }}>
                <Input 
                  placeholder="Email"
                  onChange={(e) => setEmail(e.nativeEvent.text)}
                  leftIcon={<Icon name="email" size={20} color={'black'}/>}
                />
              </View>

              <View style={{
                marginHorizontal: 50,
                marginBottom: 20,
              }}>
                <Text>Payment Method</Text>
                <ListItem bottomDivider>

                  <ListItem.CheckBox
                    iconType="material-community"
                    checkedIcon="checkbox-marked"
                    uncheckedIcon="checkbox-blank-outline"
                    checked={(checked == 0)}
                    onPress={() => setChecked(0)}
                  />
                  <ListItem.Content>
                    <ListItem.Title>BPI</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
                <ListItem bottomDivider>
                  <ListItem.CheckBox
                    // Use ThemeProvider to change the defaults of the checkbox
                    iconType="material-community"
                    checkedIcon="checkbox-marked"
                    uncheckedIcon="checkbox-blank-outline"
                    checked={(checked == 1)}
                    onPress={() => setChecked(1)}
                  />
                  <ListItem.Content>
                    <ListItem.Title>Gcash</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              </View>
            </Card>

            {/* Checkout Button */}
            <View style={{
              marginHorizontal: 80,
              marginTop: 50,

            }}>
              <Button
                title="Checkout"
                onPress={() => {
                  const order = {
                    name: name,
                    email: email,
                    paymentMethod: (checked == 0) ? 'BPI' : 'Gcash',
                  }
                  checkout(auth.currentUser.uid, orders, setOrders, order)
                  clearCart(auth.currentUser.uid, setCart)
                  navigation.navigate('Orders')
                }}
              />  
            </View>
              
          </ScrollView>
    </>
  )
}

export default Checkout