import React, { useState, createContext, useEffect } from 'react'
import { getAllProducts, getCartItems,auth } from '../app/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { getOrdersById, getUserIdByEmail } from '../app/firebase'

export const AppContext = createContext()

const Context = ({ children }) => {
    const [ id, setId ] = useState(null)
    const [email, setEmail] = useState('')
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    const [orders, setOrders] = useState([])
    const [totalPrice, setPrice] = useState(0)
    const [ ordersCount, setOrdersCount ] = useState(0)
    const [ cartCount, setCartCount ] = useState(0)

    const [ category, setCategory ] = useState('')

    function filterProductsByCategory(id) {
        return products.filter(product => product.cate_id === id)
    }

    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                getUserIdByEmail(user.email, setId)
                
                getCartItems(id, setCart, setPrice)

                getAllProducts(setProducts)

                // Update this
                getOrdersById(id, setOrders, setPrice)

                // ???
                setCartCount(cart?.length)
                setOrdersCount(orders?.length)
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
            email,
            products,
            setProducts,
            cart,
            setCart,
            orders,
            setOrders,
            totalPrice,
            setPrice,
            filterProductsByCategory,
            category,
            setCategory,
            setEmail,
            ordersCount,
            cartCount,
            id,
            setPrice
        }
    }>
        {children}
    </AppContext.Provider>

  )
}

export default Context