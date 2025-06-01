import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./shimmer";
import RestaurantCard from "./RestaurantCard";
import { Link } from "react-router-dom";

const FoodType = () => {
  const { resId } = useParams();
  console.log(resId);

  const [foodType, setFoodType] = useState(null);

  useEffect(() => {
    if (resId) fetchData();
  }, [resId]);

  const fetchData = async () => {
    try {
      const data = await fetch(
        `https://thingproxy.freeboard.io/fetch/https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.4103104&lng=72.8365911&collection=${resId}&sortBy=&filters=&type=rcv2&offset=0&page_type=null`
      );
      const json = await data.json();
      setFoodType(json?.data);

      console.log(json?.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  console.log("Current foodType state:", foodType);
  if (!foodType) {
    console.log("Rendering Shimmer");
    return <Shimmer />;
  }

  const { title, description } = foodType?.cards[0]?.card?.card || {};
  console.log(foodType?.cards);
  const foodRestaurant = foodType?.cards.filter(
    (c) =>
      c?.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
  );
  console.log(foodRestaurant);

  return (
    <div className="p-2 md:p-2.5">
      <div className="flex flex-col p-3 mt-3 md:p-5">
        <p className="text-3xl md:text-[40px] font-bold">{title}</p>
        <p className="text-base md:text-[18px] mt-1 md:mt-2 mb-2 md:mb-2.5 font-semibold text-gray-700">
          {description}
        </p>
        <p className="text-xl md:text-[26px] mt-2 md:mt-2.5 font-bold">
          Restaurants to explore
        </p>
      </div>
      <div className="flex flex-wrap gap-3 md:gap-12 md:px-14 md:my-4 justify-center ">
        {foodRestaurant.map((restaurant) => (
          <Link
            key={restaurant?.card?.card?.info?.id}
            to={"/restaurant/" + restaurant?.card?.card?.info?.id}
            className="no-underline text-inherit"
          >
            <RestaurantCard resData={restaurant?.card?.card} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FoodType;
