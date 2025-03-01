import { createContext, useState, useEffect, useMemo } from "react";
import { useContext } from "react";

import { useUser, useAuth } from "@clerk/clerk-react";

const ShopContext = createContext({
  cartData: [],
  cartLoaded: false,

  wishlistData: [],
  wishtlistLoaded: false,

  addToCart: () => { },
  deleteFromCart: () => { },
  refreshCart: () => { },

  addToWishlist: () => { },
  deleteFromWishlist: () => { },
  refreshWishlist: () => { },

  price: 0,
});

export const useShop = () => useContext(ShopContext)

const ShopContextProvider = ({ children }) => {

  const { user } = useUser();
  const { isLoaded, isSignedIn, getToken } = useAuth();

  const [cartData, setCartData] = useState([])
  const cartDataMemo = useMemo(() => cartData, [cartData])
  const [cartChanged, setCartChanged] = useState(false)
  const [cartLoaded, setCartLoaded] = useState(false)

  const [wishlistData, setWishlistData] = useState([])
  const wishlistDataMemo = useMemo(() => wishlistData, [wishlistData])
  const [wishlistChanged, setWishlistChanged] = useState(false)
  const [wishlistLoaded, setWishlistLoaded] = useState(false)

  const [price, setPrice] = useState(0)

  const getCart = async () => {
    if (!(isLoaded && isSignedIn)) {
      setCartData([])
      return { success: false, message: "User not Found" }
    }

    const token = await getToken()

    fetch("/api/cart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          setCartData(data.cart)
          return { success: true, message: "Cart Retrieved Successfully" }
        }
      })
  }

  const addToCart = async (productId, price) => {
    if (!(isLoaded && isSignedIn)) {
      return { success: false, message: "User not Found" }
    }

    const token = await getToken()

    fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: productId,
      }),
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.success) {
          updatePrice("POST", productId, price)
          setCartData([...cartData, data.product])
          return { success: true, message: "Product Added to Cart" }
        }
      })
  }

  const deleteFromCart = async (productId) => {
    if (!(isLoaded && isSignedIn)) {
      return { success: false, message: "User not Found" }
    }

    updatePrice("DELETE", productId)
    const token = await getToken()

    fetch("/api/cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: productId,
      }),
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.success) {
          setCartData([...cartData.filter(prod => prod.product_id !== productId)])
          return { success: true, message: "Product Deleted From Cart" }
        }
      })

  }


  const getWishlist = async () => {
    if (!(isLoaded && isSignedIn)) {
      setWishlistData([])
      return { success: false, message: "User not Found" }
    }

    const token = await getToken()

    fetch("/api/wishlist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.success) {
          setWishlistData(data.wishlist)
          return { success: true, message: "Wishlist Retrieved Successfully" }
        }
      })
  }

  const addToWishlist = async (productId) => {
    if (!(isLoaded && isSignedIn)) {
      return { success: false, message: "User not Found" }
    }

    const token = await getToken()

    fetch("/api/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: productId,
      }),
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.success) {
          setWishlistData([...wishlistData, data.product])
          return { success: true, message: "Product Added to Wishlist" }
        }
      })
  }

  const deleteFromWishlist = async (productId) => {
    if (!(isLoaded && isSignedIn)) {
      return { success: false, message: "User not Found" }
    }

    const token = await getToken()

    await fetch("/api/wishlist", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: productId,
      }),
    }).then(resp => resp.json())
      .then(data => {
        if (data.success) {
          setWishlistData([...wishlistData.filter(prod => prod.product_id !== productId)])
          return { success: true, message: "Product Deleted From Cart" }
        }
      })
  }


  const getPrice = () => {
    let res = 0

    res = cartData.reduce((sum, curr) => (parseFloat(sum) + parseFloat(curr.price)).toFixed(2), res)

    setPrice(res)
  }

  const updatePrice = (method, productId, productPrice) => {
    const product = cartData.find((product) => productId === product.product_id);

    if (method === "POST") {
      setPrice(price + productPrice)
    } else if (method === "DELETE") {
      setPrice(price - product.price)
    }
  }

  const refreshCart = () => {
    setCartChanged(!cartChanged)
  }

  const refreshWishlist = () => {
    setWishlistChanged(!wishlistChanged)
  }

  useEffect(() => {
    const getAsyncCart = async () => {
      await getCart()
      setCartLoaded(true)
    }

    getAsyncCart()
  }, [cartChanged, user])

  useEffect(() => {
    const getAsyncWS = async () => {
      await getWishlist()
      setWishlistLoaded(true)
    }

    getAsyncWS()
  }, [cartChanged, user])

  useEffect(() => { getPrice() }, [cartData])

  const contextValue = {
    cartData: cartDataMemo,
    cartLoaded,

    wishlistData: wishlistDataMemo,
    wishlistLoaded,

    addToCart,
    deleteFromCart,
    refreshCart,

    addToWishlist,
    deleteFromWishlist,
    refreshWishlist,

    price,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider;
