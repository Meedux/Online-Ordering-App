import React, { useState, useEffect, useContext } from 'react'
import { getAllCategories } from '../app/firebase'
import { Card, Image} from '@rneui/base'
import { ScrollView, TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import { AppContext } from '../components/Context'


const Shop = ({ navigation }) => {
    const [ categories, setCategories ] = useState([])
    const { setCategory } = useContext(AppContext)

    useEffect(() => {
        getAllCategories(setCategories)
    }, [])

  return (
    <>
        <ScrollView>
        {
                categories.map((category, index) => (
                  <TouchableOpacity key={index} onPress={() => {
                    setCategory(category.name)
                    navigation.navigate('Items', {
                      category: category,
                    })
                  }}>
                    <Card  style={{
                        margin: 10,
                        padding: 10,
                        borderRadius: 30,
                        marginBottom: 30,
                    }}>
                            <View style={styles.container}>
                              <Image source={{
                                  uri: category?.img,
                                }} style={{
                                    width: 200,
                                    height: 200,
                                    borderRadius: 100,
                                    marginBottom: 30,
                              }} />
                            </View>
                            <Card.Divider />
                            <Card.Title>
                                {category?.name}
                            </Card.Title>
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