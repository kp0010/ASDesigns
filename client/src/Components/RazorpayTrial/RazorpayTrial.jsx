import { useState } from "react";

export const RazorpayTrial = () => {
  const [amount, setAmount] = useState("");

  async function payNow() {
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amount * 100,
          currency: "INR",
          receipt: "receipt#1",
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
    <div className="razorpay">
      <h2>Razorpay Payment</h2>
      <form id="payment-form">
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          name="amount"
          id="amount"
          min="1"
          className="border p-2"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          type="button"
          onClick={payNow}
          className="bg-blue-500 text-white p-2 mt-2"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};
