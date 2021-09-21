import React, { useState } from "react";

export const CartContext = React.createContext();

export function CartProvider(props) {
  const [cartItem, setCartItem] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [totalItem, setTotalItem] = useState(0);


  const isExists = (cartItems = [], item = {}) => {
    for (let cartItem of cartItems) {
        if (cartItem.id === item?.id) {        
            return cartItem;
        }
    }
    return false;
}


  const addToCart = (product,count) => {
        
    if (count) {
      
        const virtualCart = [...cartItem] 
        if (cartItem.length === 0) {
            virtualCart.push({...product, count: count})
        } else {
            if (!isExists(cartItem, product)) {
                virtualCart.push({...product, count: count})
            } else {
                for (let i = 0; i < virtualCart.length; i++) {
                    if (virtualCart[i].id === product.id) {
                        virtualCart[i].count += count
                        break
                    }
                }
            }
        }
      
        setCartItem(virtualCart)
        getTotal(virtualCart)
        getTotalItem(virtualCart)
    } else {
      
        const virtualCart = [...cartItem] 
        if (cartItem.length === 0) {
            virtualCart.push({...product, count: 1})
        } else {
            if (!isExists(cartItem, product)) {
                virtualCart.push({...product, count: 1})
            } else {
                for (let i = 0; i < virtualCart.length; i++) {
                    if (virtualCart[i].id === product.id) {
                        virtualCart[i].count += 1
                        break
                    }
                }
            }
        }
       
        setCartItem(virtualCart)
        getTotal(virtualCart)
        getTotalItem(virtualCart)
    }
      
  };

  const removeFromCart = (id) => {
    const ids = id;

    const virtualCart = [...cartItem];
    for (let i = 0; i < virtualCart.length; i++) {
      if (virtualCart[i].id === ids) {
       
        virtualCart.splice(i, 1);
      }
    }
        setCartItem(virtualCart)
        getTotal(virtualCart)
        getTotalItem(virtualCart)
  };
  const minusCount = (id) => {
    const ids = id;
    const virtualCart = [...cartItem]
    for (let i=0;i<virtualCart.length;i++) {
        if (virtualCart[i].id === ids) {
            if (virtualCart[i].count > 1) {
                virtualCart[i].count = virtualCart[i].count - 1
               
            }
        }
    }
    setCartItem(virtualCart)
    getTotal(virtualCart)
    getTotalItem(virtualCart)
}

const plusCount = (id) => {
    const ids = id
    const virtualCart = [...cartItem]
    for (let i=0;i<virtualCart.length;i++) {
        if (virtualCart[i].id === ids) {
            virtualCart[i].count += 1
        }
    }
   
    setCartItem(virtualCart)
    getTotal(virtualCart)
    getTotalItem(virtualCart)
}

const updateCount = (id, event) => {
    const ids =id
    const value = event.target.value
    const virtualCart = [...cartItem]
    for (let i=0;i<virtualCart.length;i++) {
        if (virtualCart[i].id === ids) {
            virtualCart[i].count = Number(value)
        }
    }
  
    setCartItem(virtualCart)
    getTotal(virtualCart)
    getTotalItem(virtualCart)
}


  const getTotal = (arr) => {
    let virtualTotal = 0
    for (let i in arr) {
        virtualTotal += arr[i].count * arr[i].price
    }
   
    setTotalCost(virtualTotal)
}
const getTotalItem = (arr) => {
  let virtualTotal = 0
  for (let i in arr) {
      virtualTotal += arr[i].count
  }
 
  setTotalItem(virtualTotal)
}

  return (
    <CartContext.Provider
      value={{
        cartItem: cartItem,
        totalCost: totalCost,
        totalItem: totalItem,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        plusCount: plusCount,
        minusCount: minusCount,
        updateCount: updateCount,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
