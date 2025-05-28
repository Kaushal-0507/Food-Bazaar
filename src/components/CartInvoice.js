import { useState } from "react";
import { useSelector } from "react-redux";
import { FaCheckCircle, FaMotorcycle, FaTimes } from "react-icons/fa";

const CartInvoice = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [showSuccess, setShowSuccess] = useState(false);

  const itemTotal = cartItems.reduce((total, item) => {
    const price = item.card.info.price || item.card.info.defaultPrice || 0;
    return total + (price / 100) * item.quantity;
  }, 0);

  const tax = itemTotal * 0.1;
  const deliveryFee = itemTotal <= 1000 ? 49 : 0;
  const grandTotal = itemTotal + deliveryFee + tax;

  const handlePayment = () => {
    setShowSuccess(true);
  };

  return (
    <div className="bg-white p-6 shadow-lg border border-gray-200 sticky top-4">
      <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200">
        Order Summary
      </h2>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">
            Subtotal ({cartItems.length} items)
          </span>
          <span className="font-medium">₹{itemTotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Delivery Fee</span>
          <span className="font-medium">₹{deliveryFee}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Tax (10%)</span>
          <span className="font-medium">₹{tax.toFixed(2)}</span>
        </div>

        <div className="pt-3 mt-3 border-t border-gray-200 flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>₹{grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={handlePayment}
        className="w-full cursor-pointer bg-[#1ba672] text-white py-3 font-bold hover:bg-[#168a5e] transition-colors rounded-lg"
      >
        Proceed to Payment
      </button>

      {showSuccess && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 p-4 ">
          <div className="bg-white rounded-xl max-w-md w-full p-6 animate-pop-in">
            <div className="flex justify-end">
              <button
                onClick={() => setShowSuccess(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>

            <div className="text-center py-4">
              <div className="flex justify-center text-6xl text-green-500 mb-4">
                <FaCheckCircle />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Order Confirmed!
              </h3>
              <p className="text-gray-600 mb-6">
                Your payment was successful and your food is being prepared.
              </p>

              <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center gap-3">
                  <FaMotorcycle className="text-green-500 text-2xl" />
                  <div>
                    <p className="font-medium">Estimated delivery time</p>
                    <p className="text-green-600 font-bold">30-45 minutes</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-500 mb-6">
                <p>Order ID: #{Math.floor(Math.random() * 1000000)}</p>
                <p>Total Paid: ₹{grandTotal.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-500 mt-3 text-center">
        Prices and tax are inclusive of all charges
      </p>
    </div>
  );
};

export default CartInvoice;
