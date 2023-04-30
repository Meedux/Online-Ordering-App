import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import { Input, Button, Image } from '@rneui/base'
import { logout, auth, getCurrentUserById } from '../app/firebase'
import { Card } from '@rneui/base'
import { useContext } from 'react'
import { AppContext } from '../components/Context'


const Profile = () => {
    const [ user, setUser ] = useState({})
    const { orders, cart } = useContext(AppContext)
    useEffect(() => {
        getCurrentUserById(auth.currentUser.uid, setUser)
    }, [])

  return (
    <>
        <ScrollView>
            {/* Profile Header */}
            <Card style={styles.cardContainer}>
                <View style={{
                    marginTop: 10,
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 30,
                }}>
                    <Image source={{
                        uri: 'https://wheyfactoryph.shop/public/assets/uploads/category/1680263166.jpeg',
                    }} style={{
                        width: 200,
                        height: 200,
                        borderRadius: 100,
                    }} />
                </View>

                <View style={{
                    marginTop: 10,
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text style={styles.headerText}>{user.name}</Text>
                    <Text style={styles.headerText}>{user.email}</Text>
                </View>
            </Card>

            {/* Some Information */}
            <View style={styles.body}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                }}>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text style={styles.headerText}>Orders</Text>
                        <Text style={styles.bodyText}>{orders?.length}</Text>
                    </View>

                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text style={styles.headerText}>Items in Cart</Text>
                        <Text style={styles.bodyText}>{cart?.length}</Text>
                    </View>

                </View>
            </View>

        </ScrollView>
        {/* Logout Button */}
        <View>
            <Button
                title="Logout"
                onPress={logout}
                style={{
                    paddingHorizontal: 10,
                    borderRadius: 15,
                    marginHorizontal: 30,
                    marginTop: 100,
                    width: '80%',
                    display: 'inline-block',
                }}
            />
        </View>
    </>
  )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#f4511e',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',

    },
    body: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bodyText: {
        fontSize: 18,
        marginBottom: 10,
    },
    cardContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        marginTop: 40,
        width: '100%',
    }
})



export default Profile