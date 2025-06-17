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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      console.log("Fetching data from:", RESTAURANT_API);

      const data = await fetch(RESTAURANT_API);
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }

      const json = await data.json();
      console.log("Received data:", json);

      if (!json?.data?.cards) {
        throw new Error("Invalid data structure received from API");
      }

      const resObj =
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];
      setRestaurantLists(resObj);
      setFilteredRestaurants(resObj);

      const foodObj =
        json?.data?.cards[0]?.card?.card?.imageGridCards?.info || [];
      setFoodList(foodObj);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setRestaurantLists([]);
      setFoodList([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Shimmer />;
  }

  return (
    <div className="bg-white rounded-lg p-1 pb-3 mt-4">
      <div className="flex justify-center my-3 md:my-0 mb-6 md:mb-10 px-2 md:px-0 ">
        <img
          className="w-full md:w-[996px] h-[170px] md:h-[380px] rounded-[20px] md:rounded-[40px] object-cover"
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/seo/Food_collectionbanner.png"
          alt="Food collection banner"
        />
      </div>

      <div className="max-w-[996px] mx-auto mb-5 md:px-0">
        <div className="my-3 md:my-5 font-bold text-xl md:text-2xl pl-2 md:pl-2.5">
          <p>What's on your mind?</p>
        </div>
        <div className="flex overflow-x-scroll [&::-webkit-scrollbar]:hidden gap-2 md:gap-5">
          {foodList.map((food) => {
            const entityId = food.entityId
              ? Number(food.entityId.match(/collection_id=(\d+)/)?.[1])
              : null;
            const idToUse = entityId || food.id || food.info.id;

            return (
              <Link
                to={`/dish/${idToUse}`}
                key={idToUse}
                className="flex-shrink-0"
              >
                <Slider resData={food} />
              </Link>
            );
          })}
        </div>
        <div className="food-slider-border border border-gray-200 w-full mx-auto my-3 md:my-5"></div>
      </div>

      <div className="flex flex-col">
        <div className="font-bold text-xl md:text-2xl ml-4 md:ml-[150px] my-3 md:my-4">
          <p>Restaurants</p>
        </div>

        <FilterButtons
          restaurantList={restaurantList}
          setFilteredRestaurants={setFilteredRestaurants}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-4 md:gap-6 px-4 md:px-[150px]">
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
  );
};

export default Body;
