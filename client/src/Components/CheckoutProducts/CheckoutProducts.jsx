export const CheckoutProducts = () => {
  return (
    <div className="checkout bg-[#edeae7]">
      <h2 className="text-4xl text-center pt-10">Checkout</h2>
      <div className="bill pb-10">
        <div className="billing_details bg-white w-[60%] rounded-xl mt-5 ml-10 pl-20 pt-10 pb-20">
            <h1 className="text-3xl font-bold">Billing Details</h1>
            <h2 className="text-xl mt-10">Phone</h2>
            <input type="number" placeholder="Enter phone number" className="border-2 border-black w-[80%] text-left p-2 mt-2" />

            <h2 className="text-xl mt-10">Email address:</h2>
            <input type="text" placeholder="Enter email address" className="border-2 border-black w-[80%] text-left p-2 mt-2" />
            
            <h1 className="text-2xl mt-10 font-bold">Additional Information</h1>
            <h2 className="text-xl mt-3">Order Notes (optional)</h2>
            <input type="text" placeholder="Notes about your order E.g. Special notes for delivery" className="border-2 border-black w-[80%] text-left p-2 mt-2" />

        </div>
      </div>
    </div>
  );
};
