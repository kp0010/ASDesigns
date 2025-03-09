import React, { useState } from "react";
import razor_logo from "/Logos/razorpay-logo.png";
import "./CheckoutProducts.css";
import { useUser } from "@clerk/clerk-react";
import { useShop } from "@/Context/ShopContext";
import { toast } from "sonner";

export const CheckoutProducts = () => {
  const { cartData, price } = useShop()

  const { isLoaded, isSignedIn, user } = useUser()

  const [phoneNo, setPhoneNo] = useState("")
  const [email, setEmail] = useState("")
  const [customEmail, setCustomEmail] = useState(false);
  const [error, setError] = useState("")

  const [isChecked, setIsChecked] = useState(false);

  const handleNumberChange = (e) => {
    if (/^\d*$/.test(e.target.value)) {
      setPhoneNo(e.target.value)
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
      setError("Email Invalid ");
    } else {
      setError("");
    }
  };

  async function makePayment() {
    if (!price || price <= 0) {
      toast("Amount is not Valid");
      return;
    }

    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: price * 100,
          currency: "INR",
          receipt: `u_${user.emailAddresses[0]["emailAddress"].substring(0, 25)}_t_${Date.now()}`,
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
        amount: order.amount,
        currency: order.currency,
        name: "Asdesigns",
        description: "Test Transaction",
        order_id: order.order_id,

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
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              window.location.href = "/api/payment-success";
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
          color: "#F37254",
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
      <h2 className="text-4xl text-center pt-10">Checkout</h2>
      <div className="bill flex flex-col lg:flex-row pb-10 items-center lg:items-start">
        {/* Billing Details */}
        <div className="billing_details bg-white md:w-[60%] w-full rounded-xl mt-5 p-6 md:p-10">
          <h1 className="text-2xl font-bold">Billing Details</h1>

          <h2 className="text-lg mt-6">Phone</h2>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Enter phone number"
            value={phoneNo}
            onChange={handleNumberChange}
            maxLength={10}
            className="border-2 border-black w-full p-2 mt-2 rounded-lg [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />

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
          <h2 className="mt-1 text-red-600">{error}</h2>

          {/* Custom Email Checkbox */}
          <label className="flex items-center mt-3">
            <input
              type="checkbox"
              checked={customEmail}
              onChange={() => setCustomEmail(!customEmail)}
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
          />
        </div>

        {/* Order Summary */}
        <div className="order-summary bg-white mt-6 lg:mt-12 rounded-xl md:w-[35%] w-full p-6 md:ml-10">
          <h1 className="text-2xl font-bold text-center pt-4">Order Details</h1>

          {/* Product Info */}
          <div className="p-5 w-full mt-4 mb-3">
            <div className="flex justify-between font-bold text-lg border-b pb-2">
              <span>Product</span>
              <span className="mr-2">Price</span>
            </div>

            {cartData && cartData.map((product, idx) => (
              <React.Fragment key={idx}>
                <div className="mt-2 text-gray-700 border-b pb-2 flex  justify-between">
                  <p className="text-sm break-words w-full sm:w-52 mr-4">
                    {product.product_id} | {product.name}
                  </p>
                  <p className="text-right font-medium">₹ {(parseFloat(product.price) - 1.0).toFixed(2)}</p>
                </div>
              </React.Fragment>
            ))}

            <div className="flex justify-between font-bold text-md mt-3 border-b pb-3">
              <span>Subtotal</span>
              <span>₹ {price}</span>
            </div>

            <div className="flex justify-between font-bold text-xl mt-3 text-red-600">
              <span>Total</span>
              <span>₹ {price}</span>
            </div>

          </div>

          {/* Payment Options */}
          <div className="payment-options">
            <div className="border border-gray-300 p-4 rounded-lg w-full">
              <label className="flex items-center space-x-2 font-medium text-lg">
                <input
                  type="radio"
                  name="payment"
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
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
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
                ${isChecked
                  ? "cursor-pointer hover:bg-yellow-500"
                  : "opacity-50 cursor-not-allowed"
                }`}
              disabled={!isChecked}
              onClick={() => { makePayment() }}
            >
              Place order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
