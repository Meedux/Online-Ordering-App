import axios from "axios";
import { initializeApp } from "firebase/app"

import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, 
  onAuthStateChanged, sendEmailVerification
} from "firebase/auth";

import {
  getFirestore, collection, getDocs, addDoc, updateDoc, getDoc, doc
} from 'firebase/firestore'

import {
  getStorage, ref, getDownloadURL, uploadBytes, connectStorageEmulator
} from 'firebase/storage'

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
export const storage = getStorage(app);

const usersRef = collection(db, 'users');
const productsRef = collection(db, 'products');
const ordersRef = collection(db, 'orders');
const transactionRef = collection(db, 'transactions');
const categoriesRef = collection(db, 'categories');

const storageRef = ref(storage, 'orders');


export const getAllCategories = async (setCategories) => {
  const querySnapshot = await getDocs(categoriesRef);
  const categories = [];

  querySnapshot.forEach((doc) => {
    categories.push(doc.data());
  });

  setCategories(categories);
}

// export const getAllOrdersById = async (id) => {
//   const querySnapshot = await getDocs(ordersRef);
//   const orders = [];

//   querySnapshot.forEach((doc) => {
//     if (doc.data().userId === id) {
//       orders.push(doc.data());
//     }
//   });

//   return orders;
// }

export const removeFromCart = (userId, prodId, setCart, cart, price, setPrice, totalPrice) => {
  axios.delete(`https://wheyfactoryph.shop/api/carts/${userId}/${prodId}`)
  .then((response) => {
    alert(response.data.message);
    const newCart = cart.filter((item) => item.id !== prodId);
    setCart(newCart);
    setPrice(Number(totalPrice) - price);
  })
  .catch((error) => {
    alert(error);
  })
}

export const addToCart =  (name, product, setPrice, totalPrice, price) => {
  axios.post('https://wheyfactoryph.shop/api/addtocart', product)
    .then((response) => {
      alert(`${name} added to cart!`)
      setPrice(Number(totalPrice) + price);
    })
    .catch((error) => {
      alert(error.message)
    });

}

// export const getTotalPriceFromUserCart = async (id, setTotalPrice) => {
//   const querySnapshot = await getDocs(usersRef);
//   const user = {};
//   let userRef = null;

//   querySnapshot.forEach((doc) => {
//     if (doc.data().id === id) {
//       userRef = doc.ref;
//       user.uid = doc.id;
//       user.id = doc.data().id;
//       user.name = doc.data().name;
//       user.email = doc.data().email;
//       user.cart = doc.data().cart;
//     }
//   });

//   let totalPrice = 0;

//   user.cart.forEach((item) => {
//     totalPrice += item.price;
//   });

//   setTotalPrice(totalPrice);
// }

// export const clearCart = async (id, setCart) => {
//   const querySnapshot = await getDocs(usersRef);
//   const user = {};
//   let userRef = null;

//   querySnapshot.forEach((doc) => {
//     if (doc.data().id === id) {
//       userRef = doc.ref;
//       user.uid = doc.id;
//       user.id = doc.data().id;
//       user.name = doc.data().name;
//       user.email = doc.data().email;
//       user.cart = doc.data().cart;
//     }
//   });

//   user.cart = [];
//   await updateDoc(userRef, user);
//   setCart(user.cart);
// }

export const getCartItems = (id, setCart, setPrice) => {
  // Fetch the Cart items from the api
  axios.get('https://wheyfactoryph.shop/api/viewCart')
    .then((response) => {
      const cartData = response.data.data;

      const user = []

      cartData.forEach((item) => {
        if (Number(item.user_id) === id) {
          user.push(item);
        }
      });
      
      //Get All of the Products
      axios.get('https://wheyfactoryph.shop/api/products')
      .then((response) => {
        const product = response.data.data;

        // Get the Products
        const cartItems = [];


        product.forEach((item) => {
          user.forEach((cartItem) => {
            if (Number(cartItem.prod_id) === Number(item.id)) {
              item.qty = cartItem.prod_qty;
              cartItems.push(item);
            }
          });
        });

        // Set the Cart Items
        setCart(cartItems);

        // Get the Total Price
        let totalPrice = 0;

        cartItems.forEach((item) => {
          totalPrice += Number(item.selling_price) * Number(item.qty);
        }
        );
        setPrice(totalPrice);

        
      })
      .catch((error) => {
        alert(error.message)
      })

      
    })
    .catch((error) => {
      alert(error.message)
    })
}

export const checkout = (id, orders, setOrders, order, file, setCart) => {
  // upload the file
  const uploadTask = uploadBytes(storageRef, file);

  uploadTask.then((snapshot) => {
    alert('Uploaded Successfully!');
    getDownloadURL(snapshot.ref).then((url) => {
      order.image = url;
      axios.post('https://wheyfactoryph.shop/api/placeOrder-details', order)
        .then((response) => {
          setOrders([...orders, order]);
          setCart([]);
        })
        .catch((error) => {
          alert(error.message);
        })
    })
  })

  uploadTask.catch((error) => {
    alert(error.message);
  })


}

export const getOrdersById = (id, setOrders, setPrice) => {
  axios.get('https://wheyfactoryph.shop/api/myOrders')
    .then((orders) => {
      const ordersData = orders.data.data;  

      const userOrders = [];

      ordersData.forEach((order) => {
        if(Number(order.user_id) == id){
          userOrders.push(order);
        }
      })

      setOrders(userOrders);
    })
    .catch((error) => {
      alert(error)
    })

}

export const getCurrentUserById = async (id, setUser) => {
  const response = await axios.get('https://wheyfactoryph.shop/api/users')

  const api_users = response.data.data;
  api_users.forEach((user) => {
    if (user.id === id) {
      setUser(user);
    }
  })
}

export const getAllProducts = (setProducts) => {
  // Fetch the Products from the api
  axios.get('https://wheyfactoryph.shop/api/products')
    .then((response) => {
      const products = response.data.data;
      setProducts(products);
    }
    )
    .catch((error) => {
      alert(error.message)
    })

}


export const getUserIdByEmail = (email, setId) => {
  axios.get('https://wheyfactoryph.shop/api/users')
  .then((response) => {
    const api_users = response.data.data;

    // loop over the users to check if the email is existing and if it is, get the id 
    let id = null;
    api_users.forEach((user) => {
      if (user.email === email) {
        setId(user.id);
      }
    });
    
  })
  .catch((error) => {
    alert(error.message)
  });
}

export const register = (user, navigation, setEmail) => {
  createUserWithEmailAndPassword(auth, user.email, user.password)
  .then((userCredential) => {
    // Signed in 
    setEmail(user.email);

    // register it within the api and nest the addDoc function inside the then block
    axios.post("https://wheyfactoryph.shop/api/register", user)
    .then((response) => {
      // get the new user from the api

      axios.get('https://wheyfactoryph.shop/api/users')
      .then((res) => {
        const api_users = res.data.data;

        // loop over the users to check if the email is existing and if it is, get the id 
        let newUser = null;
        api_users.forEach((userr) => {
          if (userr.email === user.email) {
            newUser = userr;
          }
        });



        // add the user to the firestore
        addDoc(usersRef, newUser)
        .then(() => {
          // navigate to the home screen
          navigation.navigate('Home');
        }
        )
        .catch((error) => {
          alert(error);
        }
        )
      })
  })
  .catch((error) => {
    alert(error);
  });
    })
    .catch((error) => {
      alert(error);
    });


    
}



export const login = (email, password, navigation, setEmail) => {
  axios.post('https://wheyfactoryph.shop/api/login', {email, password})
    .then((response) => {
      axios.get('https://wheyfactoryph.shop/api/users')
      .then((res) => {
        const api_users = res.data.data;
  
        // get ther users from the firebase firestore
        const firebase_users = [];
        getDocs(usersRef)
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            firebase_users.push(doc.data());
          });

          // loop over the firebase users list if the user exists
          let userExists = false;
          let user = null;
  
          firebase_users.forEach((firebase_user) => {
            api_users.forEach((api_user) => {
              if (firebase_user.email === api_user.email) {
                userExists = true;
                user = firebase_user;
              }
            });
          });
    
    
          if(userExists){
            // if user exists
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              const user = userCredential.user;
              setEmail(user.email);
              navigation.navigate('Home');
            })
            .catch((error) => {
              alert(error);
            });
          }else{
            // if the user did not exist in the firebase db then create one
            api_users.forEach((api_user) => {
              if (api_user.email === email) {
                // register the user in the firebase auth
                createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  // Signed in
                   // add the user in the firebase db
                    addDoc(usersRef, api_user)
                    .then((res) => {
                      updateDoc(doc(usersRef, res.id), {
                        doc_id: userCredential.user.uid,
                      });
  
                      setEmail(api_user.email);
                      navigation.navigate('Home');
                    })
                    .catch((error) => {
                      alert(error);
                    });
                })
                .catch((error) => {
                  alert(error);
                });
               
              }
            });
          }

        })
        .catch((error) => {
          alert(error);
        });
  
  
      }
      )
      .catch((error) => {
        alert(error);
      })
    })
    .catch((error) => {
      alert(error);
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
    
    // ...
  } else {
    // User is signed out
    // ...
  }
});