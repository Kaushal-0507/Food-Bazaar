import Shimmer from "./shimmer";
import { RATING_ICON } from "../utils/constants";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import MenuCategory from "./MenuCategory";
const RestaurantMenu = () => {
  const { resId } = useParams();
  console.log(resId);

  const resInfo = useRestaurantMenu(resId);

  if (!resInfo) return <Shimmer />; // Show shimmer until data loads

  // Safely extract data (optional chaining)
  const { name, costForTwoMessage, avgRating, cuisines, sla } =
    resInfo?.cards?.[2]?.card?.card?.info || {};
  const { itemCards } =
    resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[2]?.card
      ?.card || {};

  const categories =
    resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  return (
    <div className="menu-part flex flex-col w-[800px] mx-auto">
      <div className="res-menu-info w-[800px] mx-auto flex flex-col">
        <div className="res-name text-2xl font-extrabold pl-4 mt-5 mb-6">
          {name}
        </div>
        <div className="res-info-card w-[97%] mx-auto flex flex-col border border-gray-200 rounded-[25px] p-3 pl-4">
          <div className="res-rating font-semibold py-2 flex items-center text-sm">
            <img className="rating-icon w-[18px]" src={RATING_ICON} />
            <p className="ml-1">
              {avgRating} - {costForTwoMessage?.toUpperCase()}
            </p>
          </div>
          <div className="cuisines text-sm text-orange-500 underline font-semibold pb-2 pl-0.5">
            {cuisines?.join(", ") || "Cuisines not available"}
          </div>
          <div className="delivery-time text-sm font-semibold pl-0.5 pb-5">
            --- {sla?.slaString || "Delivery time not available"}
          </div>
        </div>
      </div>
      <div className="main-menu-info flex flex-col w-[800px] p-2 pl-1 mt-5 border-b border-gray-200">
        <div className="menu-search-filter flex flex-col gap-2">
          <div className="menu-text text-xl mx-auto p-1 pb-2 font-bold">
            MENU
          </div>
          <div className="menu-search flex justify-center">
            <input
              className="dish-search w-[97%] p-3 text-base bg-gray-200 border-none outline-none rounded-xl"
              type="text"
              placeholder="Search"
            />
          </div>
          <div className="menu-filters flex gap-2 p-3 pl-4">
            <button className="all-menu px-4 py-2 border border-gray-200 bg-white mb-2 rounded-xl text-base font-bold cursor-pointer text-gray-600">
              All
            </button>
            <button className="veg-menu px-4 py-2 border border-gray-200 bg-white mb-2 rounded-xl text-base font-bold cursor-pointer text-green-600">
              Veg
            </button>
            <button className="non-veg-menu non-veg-menu px-4 py-2 border border-gray-200 bg-white mb-2 rounded-xl text-base font-bold cursor-pointer text-red-600">
              Non-veg
            </button>
          </div>
        </div>
      </div>
      <div className="res-menu-card mt-5 mb-5">
        <div className="menu-card flex gap-4 flex-col items-center">
          {categories.map((category, index) => (
            <MenuCategory
              key={category?.card?.card?.categoryId}
              data={category}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default RestaurantMenu;
