import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdShoppingBag, MdMenu } from "react-icons/md";
import useRestaurantList from "../utils/useRestaurantList";

const Header = () => {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItems = useSelector((store) => store.cart.items);
  const restaurantData = useRestaurantList();

  useEffect(() => {
    const newResults = restaurantData?.cards?.find(
      (card) =>
        card?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.gandalf.widgets.v2.GridWidget"
    )?.card?.card?.gridElements?.infoWithStyle?.info;

    setResults(newResults || []);
  }, [restaurantData, searchText]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col md:flex-row p-1 md:px-24 justify-between items-center bg-white mb-4 border-b border-gray-200 fixed top-0 left-0 right-0 z-10">
      <div className="flex justify-between w-full md:w-auto items-center px-4 md:px-0">
        <Link to="/">
          <img
            src="https://raw.githubusercontent.com/Kaushal-0507/images/refs/heads/main/foodlogo.png"
            className="w-[70px]"
          />
        </Link>

        <button className="md:hidden p-2" onClick={toggleMenu}>
          <MdMenu className="text-2xl" />
        </button>
      </div>

      <div className="w-full md:w-[40%] px-2 md:pl-14 md:px-0 mt-1 md:mt-0 relative order-last md:order-none">
        <div className="relative w-full">
          <input
            className="w-full p-2 pl-5 text-base bg-gray-200 border-none outline-none placeholder:text-gray-500"
            type="text"
            placeholder="Search Food....."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setTimeout(() => setIsInputFocused(false), 100)}
          />

          {isInputFocused && results.length > 0 && (
            <div className="absolute top-full left-0 mt-1 p-2 w-full max-h-[255px] overflow-y-auto bg-gray-200 shadow-lg z-50 hide-scrollbar">
              {results.map((food) => {
                const entityId = food.entityId
                  ? Number(food.entityId.match(/collection_id=(\d+)/)?.[1])
                  : null;
                const idToUse = entityId || food.id || food.info?.id;

                return (
                  <Link
                    to={`/dish/${idToUse}`}
                    key={idToUse}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setIsInputFocused(false)}
                  >
                    <p className="pl-3 p-2 hover:bg-white">
                      {food.action?.text}
                    </p>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50 mt-1">
            <ul className="list-none text-base font-medium">
              <li className="p-3 hover:text-red-600 border-b border-gray-100">
                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li className="p-3 hover:text-red-600 border-b border-gray-100">
                <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                  About Us
                </Link>
              </li>
              <li className="p-3 hover:text-red-600 border-b border-gray-100">
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  Contact Us
                </Link>
              </li>
              <li className="p-3 hover:text-red-600">
                <Link
                  to="/cart"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-1"
                >
                  Cart
                  <div className="relative">
                    <MdShoppingBag className="text-[20px] text-gray-800 hover:text-red-600" />
                    {cartItems.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItems.length}
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="hidden md:block nav-items ml-auto">
        <ul className="flex list-none text-base font-medium">
          <li className="p-2  hover:text-red-600">
            <Link to="/">Home</Link>
          </li>
          <li className="p-2 hover:text-red-600">
            <Link to="/about">About Us</Link>
          </li>
          <li className="p-2 hover:text-red-600">
            <Link to="/contact">Contact Us</Link>
          </li>
          <Link to="/cart">
            <li className="p-2 hover:text-red-600 flex items-center gap-1 relative">
              Cart
              <div className="relative">
                <MdShoppingBag className="text-[20px] text-gray-800 hover:text-red-600" />
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
