import RestaurantCard from "./RestaurantCard";
import Shimmer from "./shimmer";
import { useState, useEffect } from "react";
import Slider from "./Slider";
import { Link } from "react-router-dom";
import { RESTAURANT_API } from "../utils/constants";

const Body = () => {
  const [restaurantList, setRestaurantLists] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(RESTAURANT_API);
    const json = await data.json();
    console.log(json);
    const resObj =
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;
    setRestaurantLists(resObj);
    setFilteredRestaurants(resObj);
    const foodObj = json?.data?.cards[0]?.card?.card.imageGridCards.info;
    setFoodList(foodObj);
  };

  return restaurantList.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="landing-page-img">
        <img
          className="landing-img"
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/seo/Food_collectionbanner.png"
        />
      </div>
      <div className="food-slider-box">
        <div className="food-slider-text ">
          <p>What's on your mind?</p>
        </div>
        <div className="food-slider">
          {foodList.map((food) => (
            <Slider key={food.id || food.info.id} resData={food} />
          ))}
        </div>
        <div className="food-slider-border"></div>
      </div>

      <div className="res-body">
        <div className="food-slider-text ">
          <p className="res-text">Restaurants</p>
        </div>
        <div className="filters">
          <button
            className="filter-btn"
            onClick={() => {
              const filteredList = restaurantList.filter(
                (res) => res.info.avgRating >= 4
              );
              setFilteredRestaurants(filteredList);
            }}
          >
            Rating 4.0+
          </button>
          <button
            className="filter-btn"
            onClick={() => {
              const filteredList = restaurantList.filter(
                (res) => res.info.sla.deliveryTime <= 20
              );
              setFilteredRestaurants(filteredList);
            }}
          >
            Fast Delivery
          </button>
          <button
            className="filter-btn"
            onClick={() => {
              const filteredList = restaurantList.filter(
                (res) => res.info.avgRating >= 4
              );
              setFilteredRestaurants(filteredList);
            }}
          >
            Pure Veg
          </button>
          <button
            className="filter-btn"
            onClick={() => {
              const filteredList = restaurantList.filter(
                (res) => res.info.avgRating >= 4
              );
              setRestaurantLists(filteredList);
            }}
          >
            Rs. 300-Rs. 400
          </button>
          <button
            className="filter-btn"
            onClick={() => {
              const filteredList = restaurantList.filter(
                (res) => res.info.avgRating >= 4
              );
              setRestaurantLists(filteredList);
            }}
          >
            Less than Rs. 300
          </button>
        </div>
        <div className="res-container">
          {filteredRestaurants.map((restaurant) => (
            <Link
              key={restaurant.info.id}
              to={"/restaurant/" + restaurant.info.id}
            >
              {" "}
              <RestaurantCard resData={restaurant} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Body;
