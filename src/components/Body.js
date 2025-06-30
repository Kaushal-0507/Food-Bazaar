import RestaurantCard from "./RestaurantCard";
import Shimmer from "./shimmer";
import { useState, useEffect, useCallback } from "react";
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
  const [retryCount, setRetryCount] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Add timeout to the fetch request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

      const data = await fetch(RESTAURANT_API, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Cache-Control': 'max-age=300' // 5 minutes cache
        },
        credentials: 'include',
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }

      const json = await data.json();

      if (!json?.data?.cards) {
        throw new Error("Invalid data structure received from API");
      }

      const resObj =
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];
      
      const foodObj =
        json?.data?.cards[0]?.card?.card?.imageGridCards?.info || [];

      setRestaurantLists(resObj);
      setFilteredRestaurants(resObj);
      setFoodList(foodObj);
      setRetryCount(0); // Reset retry count on success
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setError(error.message);
      setRestaurantLists([]);
      setFoodList([]);
      
      // Auto-retry logic
      if (retryCount < 2 && error.name !== 'AbortError') {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          fetchData();
        }, 2000); // Retry after 2 seconds
      }
    } finally {
      setIsLoading(false);
    }
  }, [RESTAURANT_API, retryCount]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg p-1 pb-3 mt-4">
        <div className="flex justify-center my-3 md:my-0 mb-6 md:mb-10 px-2 md:px-0">
          <div className="w-full md:w-[996px] h-[170px] md:h-[380px] rounded-[20px] md:rounded-[40px] bg-gray-200 animate-pulse"></div>
        </div>
        <Shimmer />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="bg-white rounded-lg p-4 mt-4 text-center">
        <div className="mb-4">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load data</h3>
        <p className="text-gray-500 mb-4">{error}</p>
        <button 
          onClick={() => {
            setRetryCount(0);
            fetchData();
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Try Again
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
          loading="lazy"
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
              onClick={() => {
                setRetryCount(0);
                fetchData();
              }}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
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
