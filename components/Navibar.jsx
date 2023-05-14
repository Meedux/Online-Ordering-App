import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from '@rneui/base'
import { auth } from '../app/firebase'
import { onAuthStateChanged } from 'firebase/auth'

import Index from '../screens/Index'
import Login from '../screens/Login'
import Register from '../screens/Register'

import Shop from '../screens/Shop'
import Profile from '../screens/Profile'
import Orders from '../screens/Orders'
import Cart from '../screens/Cart'
import Details from '../screens/Details'
import Checkout from '../screens/Checkout'
import Items from '../screens/Items'
import Support from '../screens/Chatbot'
import Verify from '../screens/Verify'

const Tab = createBottomTabNavigator()

const Navibar = () => {
    const [user, setUser] = React.useState(null)
    const [ item, setItem ] = React.useState({})

    React.useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
        })
    }, [auth.currentUser])
  return (
    <>
        <NavigationContainer>
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                {
                    user ? 

                         auth.currentUser.emailVerified ? 
                            (
                                <>
                                    <Tab.Screen options={{
                                        title: 'Home',
                                        headerShown: false,
                                        tabBarIcon: () => (
                                            <Icon size={20} type='material' name='home' />
                                        )
        
                                    }} name="Home" component={Index} />
                                    <Tab.Screen options={{
                                        title: 'Shop',
                                        headerShown: false,
                                        tabBarIcon: () => (
                                            <Icon size={20} type='material' name='shopping-cart' />
                                        )
                                    }} name="Shop" component={Shop} />
                                    <Tab.Screen options={{
                                        title: 'My Orders',
                                        headerShown: false,
                                        tabBarIcon: () => (
                                            <Icon size={20} type='material' name='list' />
                                            )
                                        }} name="Orders" component={Orders} />
                                    <Tab.Screen options={{
                                        title: 'Cart',
                                        headerShown: false,
                                        tabBarIcon: () => (
                                            <Icon size={20} type='material' name='shopping-cart' />
                                            )
                                        }} name="Cart" component={Cart} />
                                    <Tab.Screen options={{
                                        title: 'Profile',
                                        headerShown: false,
                                        tabBarIcon: () => (
                                            <Icon size={20} type='material' name='person' />
                                        )
                                    }} name="Profile" component={Profile} />
                                    <Tab.Screen options={{
                                        title: 'Support',
                                        headerShown: false,
                                        tabBarIcon: () => (
                                            <Icon size={20} type='material' name='person' />
                                        )
                                    }} name="Support" component={Support} />
                                    
                                    
                                    <Tab.Screen options={{
                                        title: 'Details',
                                        headerShown: false,
                                        tabBarButton: (props) => null,
                                        tabBarIcon: () => (
                                            <Icon size={20} type='material' name='person' />
                                        )
                                    }} name="Details" component={Details} />
                                    <Tab.Screen options={{
                                        title: 'Checkout',
                                        headerShown: false,
                                        tabBarButton: (props) => null,
                                        tabBarIcon: () => (
                                            <Icon size={20} type='material' name='person' />
                                        )
                                    }} name="Checkout" component={Checkout} />
                                    <Tab.Screen options={{
                                        title: 'Items',
                                        headerShown: false,
                                        tabBarButton: (props) => null,
                                        tabBarIcon: () => (
                                            <Icon size={20} type='material' name='person' />
                                        )
                                    }} name="Items" component={Items} />
                                </>
                            )

                            :

                            (
                                <>
                                    <Tab.Screen options={{
                                        title: 'Home',
                                        headerShown: false,
                                        tabBarIcon: () => (
                                            <Icon size={20} type='material' name='home' />
                                        )
        
                                    }} name="Home" component={Index} />
                                    <Tab.Screen options={{
                                        title: 'Verify',
                                        headerShown: false,
                                        tabBarIcon: () => (
                                            <Icon size={20} type='material' name='check' />
                                        )
                                    }} name="Verify" component={Verify} />
                                    <Tab.Screen options={{
                                        title: 'Profile',
                                        headerShown: false,
                                        tabBarIcon: () => (
                                            <Icon size={20} type='material' name='person' />
                                        )
                                    }} name="Profile" component={Profile} />
                                </>
                            )

                    : (
                        <>
                            <Tab.Screen options={{
                                title: 'Home',
                                headerShown: false,
                                tabBarIcon: () => (
                                    <Icon size={20} type='material' name='home' />
                                )

                            }} name="Home" component={Index} />
                            <Tab.Screen options={{
                                title: 'Login',
                                headerShown: false,
                                tabBarIcon: () => (
                                    <Icon size={20} type='material' name='login' />
                                )
                            }} name="Login" component={Login} />
                            <Tab.Screen options={{
                                title: 'Register',
                                headerShown: false,
                                tabBarIcon: () => (
                                    <Icon size={20} type='material' name='person-add' />
                                )
                            }} name="Register" component={Register} />
                        </>
                    )
                }
            </Tab.Navigator>
        </NavigationContainer>
    </>
  )
}

export default Navibar