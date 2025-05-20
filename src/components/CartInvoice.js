import { useSelector } from "react-redux";

const CartInvoice = () => {
  const cartItems = useSelector((state) => state.cart.items);

  const itemTotal = cartItems.reduce((total, item) => {
    const price = item.card.info.price || item.card.info.defaultPrice || 0;
    return total + (price / 100) * item.quantity;
  }, 0);

  const tax = itemTotal * 0.1;

  const deliveryFee = itemTotal <= 1000 ? 49 : 0;
  const grandTotal = itemTotal + deliveryFee + tax;

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

      <button className="w-full cursor-pointer bg-[#1ba672] text-white py-3 font-bold hover:bg-[#168a5e] transition-colors">
        Proceed to Payment
      </button>

      <p className="text-xs text-gray-500 mt-3 text-center">
        Prices and tax are inclusive of all charges
      </p>
    </div>
  );
};

export default CartInvoice;
