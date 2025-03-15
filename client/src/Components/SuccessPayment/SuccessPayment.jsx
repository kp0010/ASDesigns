import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const SuccessPayment = ({}) => {
  const productId = "ASD001";

  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);

  const getProduct = () => {
    fetch(`/api/products/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProduct(data["product"]);
        setCategories(data["categories"]);
      });
  };

  useEffect(() => {
    getProduct();
  }, [productId]);
  const orderDetails = {
    date: "02 May 2023",
    orderNumber: "024-125478956",
    paymentMethod: "Mastercard",
    items: [
      {
        name: "All In One Chocolate Combo",
        image: "https://via.placeholder.com/50",
        price: 50.0,
        pack: "Medium",
        qty: 1,
      },
      {
        name: "Desire Of Hearts",
        image: "https://via.placeholder.com/50",
        price: 50.0,
        pack: "Large",
        qty: 1,
      },
    ],
    subTotal: 100.0,
    shipping: 2.0,
    tax: 5.0,
    total: 107.0,
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#ebe3db] p-4 md:p-10">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-6xl">
        {/* Left Side: Billing Info */}
        <div className="w-full md:w-1/2 p-4 md:p-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Thank you for your purchase!
          </h2>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Your order will be processed within 24 hours during working days.
          </p>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">Billing address</h3>
            <p className="mt-2">
              <strong>Name:</strong> Advait Bothe
            </p>
            <p>
              <strong>Phone:</strong> 9321572720
            </p>
            <p>
              <strong>Email:</strong> advaitdagoat12@gmail.com
            </p>
          </div>

          <button className="mt-6 bg-red-500 text-white py-2 px-4 md:px-6 rounded-lg shadow hover:bg-red-600 w-full md:w-auto">
            Track Your Order
          </button>
        </div>

        {/* Right Side: Responsive Receipt Design */}
        <div className="w-full md:w-1/2 bg-[#dedddf] p-4 md:p-6 rounded-lg shadow-lg relative border border-gray-300">
          <h3 className="text-xl md:text-2xl text-center font-semibold mb-4">
            Order Summary
          </h3>

          {/* Order Info */}
          <div className="flex flex-wrap border-b-2 border-t-2 p-3 border-black text-xs md:text-sm">
            <div className="flex flex-col border-r-2 border-black pr-2 md:pr-6 w-1/2">
              <span>Date:</span>
              <span className="font-semibold">{orderDetails.date}</span>
            </div>
            <div className="flex flex-col pl-4 md:pl-14 pr-4 md:pr-8 w-1/2">
              <span>Order Number:</span>
              <span className="font-semibold">{orderDetails.orderNumber}</span>
            </div>
            
          </div>

          {/* Items List */}
          <div className="items">
            <div className="flex items-center border-b-2 justify-center border-black py-3">
              <img
                src={`/Products/${product.product_id}.jpeg`}
                alt="Product"
                className="w-14 md:w-20 h-14 md:h-20 rounded-lg"
              />
              <div className="mb-5 w-[50%] ml-3 md:ml-5 mt-12">
                <p className="font-medium break-words w-[95%] text-sm md:text-base">
                  {product.product_id +
                    (product["name"] ? " | " + product["name"] : "")}
                </p>
              </div>
              <p className="font-semibold text-sm md:text-lg mt-2 mb-4">₹500</p>
            </div>
          </div>

          {/* Order Total */}
          <div className="mt-4 text-xs md:text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Sub Total</span>
              <span>₹{orderDetails.subTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{orderDetails.shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>₹{orderDetails.tax.toFixed(2)}</span>
            </div>
            <div className="border-t-2 border-black mt-2 pt-2 font-bold text-lg flex justify-between">
              <span>Order Total</span>
              <span>₹{orderDetails.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
