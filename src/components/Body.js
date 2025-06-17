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
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Log device information
      console.log('User Agent:', navigator.userAgent);
      console.log('Platform:', navigator.platform);
      console.log('Fetching data from:', RESTAURANT_API);

      const data = await fetch(RESTAURANT_API, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      console.log('Response status:', data.status);
      console.log('Response headers:', Object.fromEntries(data.headers.entries()));

      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }

      const json = await data.json();
      console.log("Received data structure:", {
        hasData: !!json?.data,
        hasCards: !!json?.data?.cards,
        cardsLength: json?.data?.cards?.length
      });

      if (!json?.data?.cards) {
        throw new Error("Invalid data structure received from API");
      }

      const resObj =
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];
      
      console.log("Restaurant objects count:", resObj.length);
      
      if (resObj.length === 0) {
        console.warn("No restaurants found in the response");
      }

      setRestaurantLists(resObj);
      setFilteredRestaurants(resObj);

      const foodObj =
        json?.data?.cards[0]?.card?.card?.imageGridCards?.info || [];
      
      console.log("Food objects count:", foodObj.length);
      
      if (foodObj.length === 0) {
        console.warn("No food items found in the response");
      }

      setFoodList(foodObj);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setError(error.message);
      setRestaurantLists([]);
      setFoodList([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Shimmer />;
  }

  if (error) {
    return (
      <div className="text-center p-4">
        <p className="text-red-500">Error loading data: {error}</p>
        <button 
          onClick={fetchData}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
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

      <div className="flex flex-wrap justify-center gap-4 md:gap-4 px-4 md:px-[60px]">
        {filteredRestaurants.length === 0 ? (
          <div className="text-center w-full py-4">
            <p className="text-gray-500">No restaurants found</p>
            <button 
              onClick={fetchData}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Refresh
            </button>
          </div>
        ) : (
          filteredRestaurants.map((restaurant) => (
            <Link
              key={restaurant.info.id}
              to={"/restaurant/" + restaurant.info.id}
              className="no-underline text-inherit"
            >
              <RestaurantCard resData={restaurant} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Body;
