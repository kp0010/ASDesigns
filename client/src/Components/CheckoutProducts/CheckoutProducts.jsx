import React, { useEffect, useState } from "react";
import razor_logo from "/Logos/razorpay-logo.png";
import "./CheckoutProducts.css";

import { useClerk, useUser } from "@clerk/clerk-react";
import { useShop } from "@/Context/ShopContext";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export const CheckoutProducts = ({ buyNowProductId }) => {
  const { cartData, cartLoaded, price, refreshCart } = useShop()

  const { redirectToSignIn } = useClerk()

  const { isLoaded, isSignedIn, user } = useUser()

  const [phoneNo, setPhoneNo] = useState("")
  const [phoneError, setPhoneError] = useState("")

  const [email, setEmail] = useState("")
  const [customEmail, setCustomEmail] = useState(false);
  const [emailError, setEmailError] = useState("")

  const [paymentMethod, setPaymentMethod] = useState("");
  const [TOSChecked, setTOSChecked] = useState(false);

  const [buyNowProduct, setBuyNowProduct] = useState(null)

  const [loaded, setLoaded] = useState(false);

  const navigate = useNavigate()

  const skeletonVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, ease: "easeInOut" } },
  };


  function getBuyNowProduct() {
    if (isLoaded) {
      if (!isSignedIn) {
        redirectToSignIn();
      }
    }

    if (buyNowProductId) {
      fetch(`/api/products/${buyNowProductId}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.success) {
            setBuyNowProduct(data.product);
          } else {
            navigate("/")
          }
        });
    } else {
      refreshCart();
      if (!cartData.length) {
        navigate("/")
      }
    }

    setLoaded(true)
  }

  useEffect(() => {
    getBuyNowProduct()
  }, [buyNowProductId])

  useEffect(() => {
    if (cartLoaded && !cartData.length && !buyNowProductId) {
      navigate("/")
    }
  })

  const validatePhone = (value) => {
    const phoneRegex = /^[789]\d{9}$/
    return phoneRegex.test(value);
  };

  const handleNumberChange = (e) => {
    if (/^\d*$/.test(e.target.value)) {
      setPhoneNo(e.target.value)
    }
    if (phoneError) {
      setPhoneError("")
    }
  }

  const validateEmail = (value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!validateEmail(value)) {
      setEmailError("Email is Invalid");
    } else {
      setEmailError("");
    }
  };


  function placeOrder() {
    if (customEmail && !validateEmail(email)) {
      setEmailError("Email is Invalid")
      return
    }

    if (!validatePhone(phoneNo)) {
      if (phoneNo.length === 0) {
        setPhoneError("Please Enter Phone Number")
      } else {
        setPhoneError("Phone Number is Invalid")
      }
      return
    }

    makePayment()
    window.scrollTo(0, 0)
  }

  async function makePayment() {
    if ((!price || price <= 0) && (buyNowProductId && parseFloat(buyNowProduct["price"]) <= 0)) {
      toast.warning("Amount is Not Valid");
      return;
    }

    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: (buyNowProductId ? buyNowProduct.price : price) * 100,
          user_mail: validateEmail(email) ? email : user.emailAddresses[0]["emailAddress"],
          user_phone: phoneNo,
          currency: "INR",
          receipt: `u_${user.emailAddresses[0]["emailAddress"].substring(0, 20)}_t_${Date.now()}`,
          notes: {},
        }),
      });

      const data = await response.json();

      if (!data) {
        throw new Error("Empty response from server");
      }

      const order = data.order;

      const options = {
        key: "rzp_test_w45oM0KDtXSRHh",
        amount: order.total_amount,
        currency: order.currency,
        name: "Asdesigns",
        description: "Test Transaction",
        order_id: order.order_id,
        modal: {
          ondismiss: function() {
            try {
              fetch("/api/cancel-order", {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  orderId: order.order_id,
                }),
              })
            } catch (e) {
              console.error("Error deleting payment:", error);
            }

          },
        },

        handler: async function(response) {
          try {
            const verifyResponse = await fetch("/api/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                buyNowProductId: buyNowProductId
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              refreshCart()
              navigate(`/order/${order.order_id}`)
            } else {
              alert("Payment verification failed");
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
            alert("Error verifying payment. Please try again.");
          }
        },

        prefill: {
          name: "Advait Bothe",
          email: "leoadvait12@gmail.com",
          contact: "9999999999",
        },
        theme: {
          color: "#0a0a0a",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="checkout bg-[#edeae7] min-h-screen p-4">
      <h2 className="text-5xl text-center pt-8">Checkout</h2>
      <div className="bill flex flex-col lg:flex-row pb-10 items-center lg:items-start">
        {/* Billing Details */}
        <div className="billing_details bg-white md:w-[60%] w-full rounded-xl mt-5 p-6 md:p-10">
          <h1 className="text-2xl font-bold">Billing Details</h1>

          <h2 className="text-lg mt-6">Phone</h2>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Enter Phone number"
            value={phoneNo}
            onChange={handleNumberChange}
            maxLength={10}
            className="border-2 border-black w-full p-2 mt-2 rounded-lg [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <h2 className="mt-1 text-red-600">{phoneError}</h2>

          <div className="email">

            {/* Email Input (Only Visible if Checkbox is Checked) */}
            <h2 className="text-lg mt-6">Email address:</h2>
            <input
              type="text"
              disabled={!customEmail}
              placeholder={(!customEmail && isLoaded && isSignedIn) ? user.emailAddresses[0]["emailAddress"] : "Enter email address"}
              value={email}
              onChange={handleEmailChange}
              className={`w-full p-2 mt-2 rounded-lg border-2 transition-all duration-200
                ${customEmail
                  ? "border-black bg-white text-black focus:ring-2 focus:ring-blue-500 outline-none"
                  : "border-gray-400 bg-gray-200 text-gray-500 cursor-not-allowed opacity-60"
                }`}
            />
          </div>
          <h2 className="mt-1 text-red-600">{emailError}</h2>

          {/* Custom Email Checkbox */}
          <label className="flex items-center mt-3">
            <input
              type="checkbox"
              checked={customEmail}
              onChange={() => {
                if (customEmail) {
                  setEmail(user.emailAddresses[0]["emailAddress"])
                } else {
                  setEmail(email)
                }
                setCustomEmail(!customEmail)
              }}
            />
            <span className="ml-3">Change Email Address</span>
          </label>

          {/* Default Email Checkbox */}
          <label className="flex items-center mt-2">
            <input type="checkbox" />
            <span className="ml-3">
              Use <span className="font-bold">{email.length ? email : (isLoaded && isSignedIn) ? user.emailAddresses[0]["emailAddress"] : "Email"}</span> for
              receiving updates, newsletters, and receipts?
            </span>
          </label>

          <h1 className="text-xl mt-6 font-bold">Additional Information</h1>
          <h2 className="text-lg mt-3">Order Notes (optional)</h2>
          <input
            type="text"
            placeholder="Notes about your order E.g. Special notes for delivery"
            className="border-2 border-black w-full p-2 mt-2 rounded-lg"
            maxlength="150"
          />
        </div>

        {/* Order Summary */}
        <div className="order-summary bg-white mt-6 lg:mt-12 rounded-xl md:w-[35%] w-full p-6 md:ml-10">
          <h1 className="text-2xl font-bold text-center pt-4 mb-4">Order Details</h1>

          {/* Product Info */}
          {!loaded ? (
            // Skeleton loader animation
            <motion.div
              className="space-y-4 mt-4"
              initial="hidden"
              animate="visible"
              variants={skeletonVariants}
            >
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex justify-between animate-pulse">
                  <div className="w-3/4 h-5 bg-gray-300 rounded"></div>
                  <div className="w-16 h-5 bg-gray-300 rounded"></div>
                </div>
              ))}
            </motion.div>
          ) : (
            <>
              {/* Cart Items */}
              {!buyNowProductId && cartData && cartData.map((product, idx) => (
                <motion.div
                  key={idx}
                  className="mt-2 text-gray-700 border-b pb-2 flex justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Link to={`/product/${product.product_id}`}>
                    <p className="text-sm break-words w-full sm:w-52 mr-4">
                      {product.product_id} | {product.name}
                    </p>
                  </Link>
                  <p className="text-right font-medium">₹ {(parseFloat(product.price) - 1.0).toFixed(2)}</p>
                </motion.div>
              ))}

              {/* Buy Now Product */}
              {buyNowProductId && buyNowProduct && (
                <motion.div
                  className="mt-2 text-gray-700 border-b pb-2 flex justify-between"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Link to={`/product/${buyNowProduct.product_id}`}>
                    <p className="text-sm break-words w-full sm:w-52 mr-4">
                      {buyNowProduct.product_id} | {buyNowProduct.name}
                    </p>
                  </Link>
                  <p className="text-right font-medium">₹ {(parseFloat(buyNowProduct.price) - 1.0).toFixed(2)}</p>
                </motion.div>
              )}

              {/* Subtotal and Total */}
              <motion.div
                className="flex justify-between font-bold text-md mt-3 border-b pb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <span>Subtotal</span>
                <span>₹ {buyNowProduct ? (parseFloat(buyNowProduct.price) - 1.0).toFixed(2) : price}</span>
              </motion.div>

              <motion.div
                className="flex justify-between font-bold text-xl mt-3 text-red-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span>Total</span>
                <span>₹ {buyNowProduct ? (parseFloat(buyNowProduct.price) - 1.0).toFixed(2) : price}</span>
              </motion.div>
            </>
          )}

          {/* Payment Options */}
          <div className="payment-options">
            <div className="border border-gray-300 mt-4 p-4 rounded-lg w-full">
              <label className="flex items-center space-x-2 font-medium text-lg">
                <input
                  type="radio"
                  name="payment"
                  value="razorpay"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-5 h-5 accent-black"
                />
                <span>Credit Card / Debit Card / Net Banking / UPI</span>
              </label>

              <div className="flex items-start space-x-3 mt-3">
                <img
                  src={razor_logo}
                  alt="Razorpay"
                  className="w-16 h-16 sm:w-20 sm:h-20"
                />
                <div>
                  <h3 className="text-lg font-semibold">Pay by Razorpay</h3>
                  <p className="text-gray-500 text-sm">
                    Pay securely by Credit or Debit card or Internet Banking
                    through Razorpay.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="max-w-md mx-auto p-4 text-center">
            <p className="text-gray-600 text-sm">
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our{" "}
              <a href="#" className="text-blue-600 underline">
                Privacy policy
              </a>
              .
            </p>

            <div className="flex items-start mt-4">
              <input
                type="checkbox"
                id="terms"
                className="w-5 h-5 cursor-pointer"
                checked={TOSChecked}
                onChange={(e) => setTOSChecked(e.target.checked)}
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                I have read and agree to the website{" "}
                <a href="#" className="text-blue-600 underline">
                  Terms and conditions
                </a>
                <span className="text-red-500">*</span>
              </label>
            </div>

            {/* Place Order Button */}
            <button
              className={`w-full text-lg font-bold text-black bg-[#e3c756] p-3 mt-5 rounded 
                ${paymentMethod.length && TOSChecked
                  ? "cursor-pointer hover:bg-yellow-500"
                  : "opacity-50 cursor-not-allowed"
                }`}
              disabled={!(paymentMethod.length && TOSChecked)}
              onClick={placeOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
