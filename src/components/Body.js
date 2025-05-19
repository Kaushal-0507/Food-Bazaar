import RestaurantCard from "./RestaurantCard";
import Shimmer from "./shimmer";
import { useState, useEffect } from "react";
import Slider from "./Slider";
import { Link } from "react-router-dom";
import { RESTAURANT_API } from "../utils/constants";
import FilterButtons from "./FilterButtons";

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
    <div className="bg-white rounded-lg p-1 pb-3">
      {/* Landing Image Section */}
      <div className="flex justify-center my-5 mb-10">
        <img
          className="w-[996px] h-[380px] rounded-[40px] object-cover"
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/seo/Food_collectionbanner.png"
          alt="Food collection banner"
        />
      </div>

      {/* Food Slider Section */}
      <div className="w-[996px] mx-auto mb-5">
        <div className="my-5 font-bold text-2xl pl-2.5">
          <p>What's on your mind?</p>
        </div>
        <div className="flex overflow-x-scroll  [&::-webkit-scrollbar]:hidden">
          {foodList.map((food) => {
            // Extract the ID from food.entityId
            const entityId = food.entityId
              ? Number(food.entityId.match(/collection_id=(\d+)/)?.[1])
              : null;
            const idToUse = entityId || food.id || food.info.id;

            return (
              <Link to={`/dish/${idToUse}`} key={idToUse}>
                <Slider resData={food} />
              </Link>
            );
          })}
        </div>
        <div className="food-slider-border border border-gray-200 w-full mx-auto my-5"></div>
      </div>

      {/* Restaurants Section */}
      <div className="flex flex-col">
        <div className="font-bold text-2xl ml-[150px] my-4">
          <p>Restaurants</p>
        </div>

        <FilterButtons
          restaurantList={restaurantList}
          setFilteredRestaurants={setFilteredRestaurants}
        />

        {/* Restaurant Cards Grid */}
        <div className="flex flex-wrap gap-4 px-12 justify-center">
          {filteredRestaurants.map((restaurant) => (
            <Link
              key={restaurant.info.id}
              to={"/restaurant/" + restaurant.info.id}
              className="no-underline text-inherit"
            >
              <RestaurantCard resData={restaurant} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Body;
