import React, { useState, createContext, useEffect } from 'react'
import { getAllProducts, getCartItems,auth } from '../app/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { getOrdersById } from '../app/firebase'

export const AppContext = createContext()

const Context = ({ children }) => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    const [orders, setOrders] = useState([])
    const [totalPrice, setPrice] = useState(0)
    const [ ordersCount, setOrdersCount ] = useState(0)
    const [ cartCount, setCartCount ] = useState(0)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                getCartItems(user.uid, setCart, setPrice)
                getAllProducts(setProducts)
                getOrdersById(user.uid, setOrders, setPrice)
                setCartCount(cart.length)
                setOrdersCount(orders.length)
            } else {
                setCart([])
                setProducts([])
            }
        }
        )
    }, [])


  return (
    <AppContext.Provider value={
        {
            products,
            setProducts,
            cart,
            setCart,
            orders,
            setOrders,
            totalPrice,
            setPrice
        }
    }>
        {children}
    </AppContext.Provider>

  )
}

export default Context