import React, { useEffect, useRef, useState } from 'react'
import { useShop } from '@/Context/ShopContext'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { IoCartOutline } from "react-icons/io5";
import { toast } from 'sonner';

const AddToCart = ({ className, product, ...props }) => {

  const {
    cartData,
    deleteFromCart,
    addToCart,
    refreshCart
  } = useShop()

  const useStableState = (value) => {
    const [stableValue, setStableValue] = useState(value);
    const ref = useRef(value);

    useEffect(() => {
      if (JSON.stringify(ref.current) !== JSON.stringify(value)) {
        ref.current = value;
        setStableValue(value)
      }
    }, [value]);

    return stableValue;
  }

  const stableCartData = useStableState(cartData)
  const [cartCurrent, setCartCurrent] = useState(false)
  const [cartText, setCartText] = useState("Add to Cart")

  const toggleCart = async () => {
    if (cartCurrent) {
      await deleteFromCart(product.product_id);
      setCartCurrent(false);
      setCartText("Add to Cart")

      toast.info("Removed from Cart")
    } else {
      await addToCart(product.product_id, product.price);
      setCartCurrent(true);
      setCartText("Remove from Cart")

      toast.success("Added to Cart")
    }
    refreshCart();
  }

  useEffect(() => {
    const foundCartProduct = stableCartData.find((prod) => prod.product_id === product.product_id)
    setCartCurrent(foundCartProduct !== undefined)

    setCartText((foundCartProduct !== undefined) ? "Remove from Cart" : "Add to Cart")
  }, [product,]);


  return (
    <Button onClick={toggleCart} className={cn(`${!cartCurrent ? "bg-black" : "bg-[#333333]"}`, className)} {...props}>
      < IoCartOutline /> {cartText}
    </Button >
  )
}

export default AddToCart
