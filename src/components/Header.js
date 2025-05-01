import appLogo from "../assets/images/appLogo.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdShoppingBag } from "react-icons/md";

const Header = () => {
  const [searchText, setSearchText] = useState("");
  const cartItems = useSelector((store) => store.cart.items);
  return (
    <div className="flex p-1 justify-evenly items-center bg-white mb-4 border-b border-gray-200 fixed top-0 left-0 right-0 z-10">
      <div>
        <Link to="/">
          <img src={appLogo} className="w-[70px] " />
        </Link>
      </div>
      <div className="search-box flex w-[40%] p-2">
        <input
          className="input-box p-2 pl-3 flex-1 text-base bg-gray-200 rounded-l-xl border-none outline-none placeholder:text-gray-500 "
          type="text"
          placeholder="Search Food, Restaurants....."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button
          className="p-2 bg-gray-200 text-gray-500 text-base w-20 rounded-r-xl transition-all duration-300 hover: hover:text-red-600"
          //   onClick={() => {
          //     const filteredRestaurant = listOfRestaurant.filter((res)=>{
          //         res.name.toLowerCase().includes(searchText.toLowerCase());
          //     })
          //   }}
        >
          Search
        </button>
      </div>
      <div className="nav-items">
        <ul className="flex list-none text-base font-medium">
          <li className="p-2 hover:text-red-600">
            <Link to="/">Home</Link>
          </li>
          <li className="p-2 hover:text-red-600">
            <Link to="/about">About Us</Link>
          </li>
          <li className="p-2 hover:text-red-600">Contact Us</li>
          <Link to="/cart">
            <li className="p-2 hover:text-red-600 flex items-center gap-1 relative">
              Cart
              <div className="relative">
                <MdShoppingBag className="text-[20px] text-gray-800 " />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </div>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
