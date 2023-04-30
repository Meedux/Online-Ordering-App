import { initializeApp } from "firebase/app";

import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged
} from "firebase/auth";

import {
  getFirestore, collection, getDocs, addDoc, updateDoc, getDoc, doc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyACMIgVBU9hZzgJhoE6hPxWHWpBJAAa8v8",
  authDomain: "whey-factory.firebaseapp.com",
  projectId: "whey-factory",
  storageBucket: "whey-factory.appspot.com",
  messagingSenderId: "303572813559",
  appId: "1:303572813559:web:142958c7535dc949e3b5f2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const usersRef = collection(db, 'users');
const productsRef = collection(db, 'products');
const ordersRef = collection(db, 'orders');
const transactionRef = collection(db, 'transactions');
const categoriesRef = collection(db, 'categories');


export const getAllCategories = async (setCategories) => {
  const querySnapshot = await getDocs(categoriesRef);
  const categories = [];

  querySnapshot.forEach((doc) => {
    categories.push(doc.data());
  });

  setCategories(categories);
}

export const getAllOrdersById = async (id) => {
  const querySnapshot = await getDocs(ordersRef);
  const orders = [];

  querySnapshot.forEach((doc) => {
    if (doc.data().userId === id) {
      orders.push(doc.data());
    }
  });

  return orders;
}

export const removeFromCart = async (id, product, setCart) => {
  const querySnapshot = await getDocs(usersRef);
  const user = {};
  let userRef = null;

  querySnapshot.forEach((doc) => {
    if (doc.data().id === id) {
      userRef = doc.ref;
      user.uid = doc.id;
      user.id = doc.data().id;
      user.name = doc.data().name;
      user.email = doc.data().email;
      user.cart = doc.data().cart;
    }
  });

  const index = user.cart.findIndex((item) => item.id === product.id);
  user.cart.splice(index, 1);

  await updateDoc(userRef, user);
  setCart(user.cart);
  alert(`${product.name} removed from cart!`)
}

export const addToCart = async (id, product) => {

  const querySnapshot = await getDocs(usersRef);
  const user = {};
  let userRef = null;
  
  querySnapshot.forEach((doc) => {
    if (doc.data().id === id) {
      userRef = doc.ref;
      user.uid = doc.id;
      user.id = doc.data().id;
      user.name = doc.data().name;
      user.email = doc.data().email;
      user.cart = doc.data().cart;
    }
  });

  user.cart.push(product);
  await updateDoc(userRef, user);
  alert(`${product.name} added to cart!`)

}

export const getTotalPriceFromUserCart = async (id, setTotalPrice) => {
  const querySnapshot = await getDocs(usersRef);
  const user = {};
  let userRef = null;

  querySnapshot.forEach((doc) => {
    if (doc.data().id === id) {
      userRef = doc.ref;
      user.uid = doc.id;
      user.id = doc.data().id;
      user.name = doc.data().name;
      user.email = doc.data().email;
      user.cart = doc.data().cart;
    }
  });

  let totalPrice = 0;

  user.cart.forEach((item) => {
    totalPrice += item.price;
  });

  setTotalPrice(totalPrice);
}

export const clearCart = async (id, setCart) => {
  const querySnapshot = await getDocs(usersRef);
  const user = {};
  let userRef = null;

  querySnapshot.forEach((doc) => {
    if (doc.data().id === id) {
      userRef = doc.ref;
      user.uid = doc.id;
      user.id = doc.data().id;
      user.name = doc.data().name;
      user.email = doc.data().email;
      user.cart = doc.data().cart;
    }
  });

  user.cart = [];
  await updateDoc(userRef, user);
  setCart(user.cart);
  alert('Successfully Ordered!');
}

export const getCartItems = async (id, setCart) => {
  const querySnapshot = await getDocs(usersRef);
  const user = {};

  querySnapshot.forEach((doc) => {
    if (doc.data().id === id) {
      user.id = doc.data().id;
      user.name = doc.data().name;
      user.email = doc.data().email;
      user.cart = doc.data().cart;
    }

    setCart(user.cart);
  });
}

export const checkout = async (id, orders, setOrders, order) => {
  // Get user id then check if the cart is empty or not
  const querySnapshot = await getDocs(usersRef);
  const user = {};
  let userRef = null;

  querySnapshot.forEach((doc) => {
    if (doc.data().id === id) {
      userRef = doc.ref;
      user.uid = doc.id;
      user.id = doc.data().id;
      user.name = doc.data().name;
      user.email = doc.data().email;
      user.cart = doc.data().cart;
    }
  });

  if (user.cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  // Get the current date
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const today = `${month}/${day}/${year}`;

  // Create a new order
  // const order = {
  //   userId: user.id,
  //   date: today,
  //   products: user.cart,
  //   totalPrice: 0,
  // }

  order.userId = user.id;
  order.date = today;
  order.products = user.cart;
  order.totalPrice = 0;

  // Calculate the total price
  user.cart.forEach((item) => {
    order.totalPrice += item.price;
  });
  

  // Add the order to the orders collection
  await addDoc(ordersRef, order);

  // Update the orders context
  setOrders([...orders, order]);
  
}

export const getOrdersById = async (id, setOrders, setPrice) => {
  const querySnapshot = await getDocs(ordersRef);
  const orders = [];

  querySnapshot.forEach((doc) => {
    if (doc.data().userId === id) {
      orders.push(doc.data());
    }
  });
  
  let totalPrice = 0;

  orders.forEach((order) => {
    order.products.forEach((product) => {
      totalPrice += product.price;
    });
  });

  setPrice(totalPrice);
  setOrders(orders);
}

export const getCurrentUserById = async (id, setUser) => {
  const querySnapshot = await getDocs(usersRef);
  const user = {};
  
  querySnapshot.forEach((doc) => {
    if (doc.data().id === id) {
      user.id = doc.data().id;
      user.name = doc.data().name;
      user.email = doc.data().email;
    }
  });

  setUser(user);
}

export const getAllProducts = async (setProducts) => {
  const querySnapshot = await getDocs(productsRef);
  const products = [];

  querySnapshot.forEach((doc) => {
    products.push({id: doc.id, ...doc.data()});
  });

  setProducts(products);
}


export const register = (name, email, password) => {

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = {
        id: userCredential.user.uid,
        name: name,
        email: email,
        cart: [],
      }

      // create the user in the users collection
      addDoc(usersRef, user)
        .then((docRef) => {
          // console.log("Document written with ID: ", docRef.id);
          updateDoc(docRef, {uid: docRef.id})
        })
        .catch((error) => {
          // console.error("Error adding document: ", error);
        }
      );

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}


export const login = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export const logout = (navigation) => {
  signOut(auth).then(() => {
    // Sign-out successful.
    navigation.navigate('Login');
  }).catch((error) => {

  });
}


onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    // ...
  } else {
    // User is signed out
    // ...
  }
});