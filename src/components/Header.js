import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL} />
      </div>
      <div className="search-box">
        <input
          className="input-box"
          type="text"
          placeholder="Search Food, Restaurants....."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button
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
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>Contact Us</li>
          <li>Cart</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
