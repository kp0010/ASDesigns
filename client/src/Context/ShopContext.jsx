import { createContext, useState, useEffect } from "react";
import { useContext } from "react";

import { useUser, useAuth } from "@clerk/clerk-react";

const ShopContext = createContext({
  cartData: [],
  cartCount: 0,

  wishlistData: [],
  wishlistCount: 0,

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
  const [cartCount, setCartCount] = useState(0);
  const [cartChanged, setCartChanged] = useState(false)

  const [wishlistData, setWishlistData] = useState([])
  const [wishlistCount, setWishlistCount] = useState(0);
  const [wishlistChanged, setWishlistChanged] = useState(false)

  const [price, setPrice] = useState(0)


  const getCart = async () => {
    if (!(isLoaded && isSignedIn)) {
      setCartData([])
      setCartCount(0)
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
          setCartCount(data.cart.length)
          return { success: true, message: "Cart Retrieved Successfully" }
        }
      })
  }

  const addToCart = async (productId) => {
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
          setCartChanged(true)
          return { success: true, message: "Product Added to Cart" }
        }
      })
  }

  const deleteFromCart = async (productId) => {
    if (!(isLoaded && isSignedIn)) {
      return { success: false, message: "User not Found" }
    }

    updatePrice(productId)
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
          setCartChanged(true)
          return { success: true, message: "Product Deleted From Cart" }
        }
      })

  }


  const getWishlist = async () => {
    if (!(isLoaded && isSignedIn)) {
      setWishlistData([])
      setWishlistCount(0)
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
          setWishlistCount(data.wishlist.length)
          return { success: true, message: "Wishlist Retrieved Successfully" }
        }
      })
  }

  const addToWishlist = async (productid) => {
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
        productId: productid,
      }),
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.success) {
          setWishlistChanged(true)
          return { success: true, message: "Product Added to Wishlist" }
        }
      })
  }

  const deleteFromWishlist = async (productid) => {
    if (!(isLoaded && isSignedIn)) {
      return { success: false, message: "User not Found" }
    }

    const token = await getToken()

    fetch("/api/wishlist", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: productid,
      }),
    }).then(resp => resp.json())
      .then(data => {
        if (data.success) {
          setWishlistChanged(true)
          return { success: true, message: "Product Deleted From Cart" }
        }
      })
  }

  const getPrice = () => {
    let acc = 0

    cartData.reduce((sum, curr) => { sum + curr.price }, acc)

    setPrice(acc)
  }

  const updatePrice = (productId) => {
    const product = cartData.find((product) => productId === product.productId);

    if (!product) { return }

    setPrice(price - product.price)
  }

  const refreshCart = () => {
    setCartChanged(!cartChanged)
  }

  const refreshWishlist = () => {
    setWishlistChanged(!wishlistChanged)
  }

  useEffect(() => { getCart() }, [cartChanged, user])
  useEffect(() => { getWishlist() }, [wishlistChanged, user])
  useEffect(() => { getPrice() }, [cartData])

  const contextValue = {
    cartData,
    cartCount,

    wishlistData,
    wishlistCount,

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
