import React, { useEffect, useState, useContext } from 'react'
import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { Card, Image } from '@rneui/base'
import { useRoute } from '@react-navigation/native'
import { AppContext } from '../components/Context'


const Items = ({ navigation }) => {
  const route = useRoute()
  const { filterProductsByCategory, category } = useContext(AppContext)
  const [ products, setProducts ] = useState([])

  useEffect(() => {
    setProducts(filterProductsByCategory(route?.params.category.name))
  }, [category])

  return (
    <>
        <ScrollView>
            <Card style={{
                margin: 10,
                padding: 10,
                borderRadius: 30,
                marginBottom: 30,
                margiuTop: 40,
            }}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginTop: 10,
                    marginBottom: 10,
                    textAlign: 'center',
                }}>
                    {route?.params.category.name}
                </Text>
                <Card.Divider />
            </Card>
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
export default Items