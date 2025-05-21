import { useDispatch, useSelector } from "react-redux";
import MenuCard from "./MenuCard";
import CartInvoice from "./CartInvoice";
import { clearCart } from "../utils/cartSlice";
import { Link } from "react-router-dom";
import CartItems from "./CartItems";
// import shoppingCart from "./shoppingCart.png";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  console.log(cartItems);
  const isCartEmpty =
    !cartItems ||
    cartItems.length === 0 ||
    cartItems.every((item) => !item || Object.keys(item).length === 0);
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  if (isCartEmpty) {
    return (
      <div className="flex flex-col justify-center items-center gap-2.5">
        <img src="./shoppingCart.png" className="w-2xs" alt="Empty Cart" />
        <div className="font-bold text-[20px] text-center">
          Your cart is empty
        </div>
        <div className="text-[14px] text-center text-gray-600">
          You can go to home page to view more restaurants
        </div>
        <Link to="/">
          <button className="font-bold text-[15px] border-2 border-none text-white bg-red-500 py-2.5 px-5 cursor-pointer hover:shadow-lg">
            SEE RESTAURANTS
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex justify-between mx-4 gap-6">
      <div className="w-[820px]  p-2.5">
        <div className="flex justify-between px-1.5">
          <div className="font-bold text-2xl">Cart</div>
          <div
            onClick={handleClearCart}
            className="p-1 border-2 text-[#109e6a] border-[#109e6a] font-bold cursor-pointer hover:border-red-600 hover:text-red-600 transition-colors duration-300"
          >
            Clear Cart
          </div>
        </div>

        <div className="w-[800px] flex flex-col ">
          {cartItems.map((item, index) => (
            <CartItems key={index} menuData={item} />
          ))}
        </div>
      </div>
      <div className="md:w-1/3">
        <CartInvoice />
      </div>
    </div>
  );
};

export default Cart;
