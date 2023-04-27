import React, { useContext } from 'react'
import { Text, View, Image, ScrollView } from 'react-native'
import { Button } from '@rneui/themed'
import { useRoute } from '@react-navigation/native'
import { addToCart, auth } from '../app/firebase'
import { AppContext } from '../components/Context'

const Details = () => {
    const route = useRoute()
    const { cart, setCart } = useContext(AppContext)
  return (
    <>
        <ScrollView>
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
            }}>
                <Image source={{
                    uri: route?.params.product.img
                }} style={{
                    width: 200,
                    height: 200,
                    borderRadius: 100,
                }} />
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginTop: 10,
                }}>
                    {route?.params.product.name}
                </Text>
                <Text style={{
                    color: 'green',
                    marginBottom: 10,
                }}>
                    {route?.params.product.price}
                </Text>
                <Text style={{
                    marginHorizontal: 30,
                    marginBottom: 30,
                }}>
                    {route?.params.product.long_description}
                </Text>
                <Button
                    onPress={() => {
                        addToCart(auth.currentUser.uid, route?.params.product)
                        setCart([...cart, route?.params.product])
                    }}
                    style={{
                        marginTop: 10,
                        marginBottom: 30,
                    }}
                >
                    Add to cart
                </Button>
            </View>
        </ScrollView>
    </>
  )
}

export default Details