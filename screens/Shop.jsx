import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { getAllProducts } from '../app/firebase'
import { Card, Image } from '@rneui/base'


const Shop = ({ navigation }) => {
  const [ products, setProducts ] = useState([])

  useEffect(() => {
    getAllProducts(setProducts)
  }, [])

  return (
    <>
        <ScrollView>
            {
                products.map((product, index) => (
                  <TouchableOpacity key={index} onPress={() => {
                    navigation.navigate('Details', {
                      product: product,
                    })
                  }}>
                    <Card  style={{
                        margin: 10,
                        padding: 10,
                        borderRadius: 30,
                        marginBottom: 30,
                    }}>
                            <View style={styles.container}>
                              <Card.Title>
                                  {product.name}
                              </Card.Title>
                              <Image source={{
                                uri: product.img,
                              }} style={{
                                width: 200,
                                height: 200,
                                borderRadius: 100,
                              }} />
                            </View>
                            <Card.Divider />
                            <Text style={{
                              color: 'green',
                              marginBottom: 10,
                            }}>
                              {product.price}
                            </Text>
                            <Text>
                              {product.short_description}                  
                            </Text>
                    </Card>
                  </TouchableOpacity>
                ))

            }
        </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 10,
      flexWrap: 'wrap',
    },
  });
export default Shop