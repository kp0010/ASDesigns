import { FaRegTrashAlt } from "react-icons/fa";
import { Button } from "../ui/button";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { useShop } from "@/Context/ShopContext";
import { useAuth, useClerk } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const CartProducts = ({ product, productId }) => {
  const { isLoaded, isSignedIn } = useAuth();
  const { redirectToSignIn } = useClerk();
  const { cartData, cartLoaded, deleteFromCart, refreshCart, getPrice } =
    useShop();
  useEffect(() => {
    refreshCart();
    if (isLoaded) {
      if (!isSignedIn) {
        redirectToSignIn();
      }
    }
  }, [isLoaded, isSignedIn]);
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavoir: "smooth" });
    const splitLink = event.currentTarget.href.split("/");
    const productId = splitLink[splitLink.length - 1];
    navigate(`/product/${productId}`);
  };

  const removeFromCart = async (productId) => {
    refreshCart();
    deleteFromCart(productId);
    refreshCart();
  };

  return (
    <div className="cart bg-[#edeae7] min-h-screen flex flex-col items-center">
      <h2 className="text-4xl text-center pt-4">Your Cart</h2>

      {/* Products & Order Summary - Column on Small & Medium Screens, Row on Large Screens */}
      <div className="product-info flex flex-col lg:flex-row justify-center w-full px-4">
        {/* Product List */}
        <div className="product-display-left pb-5 mt-4 flex flex-col w-full lg:w-3/5">
          {cartLoaded &&
            cartData.map((product, idx) => (
              <div
                key={idx}
                className="cards bg-white pt-2 rounded-lg p-4 flex flex-col md:flex-row items-center w-full"
              >
                <Link
                  to={`/product/${product.product_id}`}
                  onClick={handleClick}
                >
                  <div className="mt-4">
                    <div className="productDiplay-img h-[200px] w-[200px] md:ml-8">
                      <img
                        src={`/Products/${product.product_id}.jpeg`}
                        className="product-display-main-img rounded-lg"
                        alt=""
                      />
                    </div>
                  </div>
                </Link>

                <div className="md:ml-6 flex flex-col items-center md:items-start text-center md:text-left">
                  <Link
                    to={`/product/${product.product_id}`}
                    onClick={handleClick}
                  >
                    <h2 className="text-2xl mt-4 break-words md:ml-0">
                      {product["product_id"] +
                        (product["name"] ? " | " + product["name"] : "")}
                    </h2>
                  </Link>

                  <div className="price flex flex-col md:flex-row mt-3 items-center">
                    <h1 className="new-price font-bold text-2xl md:mr-4">
                      ₹{(parseFloat(product.price) - 1.0).toFixed(2)}
                    </h1>
                    <h1 className="old-price text-xl line-through">
                      ₹{(parseFloat(product.price) + 200.0).toFixed(2)}
                    </h1>
                    <h3 className="text-xl md:ml-3">(-40% off)</h3>
                  </div>

                  <div className="remove-sec mt-3">
                    <Button
                      onClick={removeFromCart}
                      className="w-full md:w-40 text-sm bg-white text-black border-2 border-black flex items-center justify-center"
                    >
                      <FaRegTrashAlt /> Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Order Summary - Moves Below Products on Small & Medium Screens */}
        <div className="total-price-right bg-white rounded-lg flex flex-col items-center justify-evenly pl-6 pr-6 w-full lg:w-[400px] lg:h-[250px] mt-4 lg:mt-0 lg:ml-20 xl:ml-20" >
          <h2 className="text-xl font-bold pt-4 md:pt-0">Order Summary</h2>

          {/* Price Section with Left-Right Alignment */}
          <div className="price w-full pt-4 md:pt-0">
            <div className="flex justify-between w-full text-lg">
              <h2>Price (X items)</h2>
              <span className="font-bold">₹ 599.90</span>
            </div>
            <div className="flex justify-between w-full text-lg mt-2">
              <h2>Total Price</h2>
              <span className="font-bold">₹ 599.90</span>
            </div>
          </div>

          {/* Place Order Button */}
          <div className="buy-sec flex justify-center w-full ">
            <Button className="w-full md:w-72 bg-[#e3c756] mt-4 mb-10">
              <IoCloudDownloadOutline /> Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
