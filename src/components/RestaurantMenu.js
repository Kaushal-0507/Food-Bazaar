import Shimmer from "./shimmer";
import { RATING_ICON } from "../utils/constants";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import MenuCategory from "./MenuCategory";
import { useState, useEffect } from "react";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const [mainCategories, setMainCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isVegFilterActive, setIsVegFilterActive] = useState(false);
  const { resInfo, isLoading, error, refetch } = useRestaurantMenu(resId);

  useEffect(() => {
    if (resInfo) {
      const menuItems =
        resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
          (c) =>
            c?.card?.card?.["@type"] ===
            "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        );
      setMainCategories(menuItems || []);
      setCategories(menuItems || []);
    }
  }, [resInfo]);

  if (isLoading) return <Shimmer />;

  if (error) {
    return (
      <div className="menu-part w-full md:w-[800px] mx-auto px-2 md:px-0 text-center py-8">
        <div className="mb-4">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load menu</h3>
        <p className="text-gray-500 mb-4">{error}</p>
        <button 
          onClick={refetch}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!resInfo) return <Shimmer />;

  const { name, costForTwoMessage, avgRating, cuisines, sla } =
    resInfo?.cards?.[2]?.card?.card?.info || {};

  const toggleVegFilter = () => {
    if (isVegFilterActive) {
      setCategories(mainCategories);
    } else {
      const vegCategories = mainCategories.map((category) => ({
        ...category,
        card: {
          ...category.card,
          card: {
            ...category.card.card,
            itemCards: category.card.card.itemCards?.filter(
              (item) => item.card.info.itemAttribute?.vegClassifier === "VEG"
            ),
          },
        },
      }));
      setCategories(vegCategories);
    }
    setIsVegFilterActive(!isVegFilterActive);
  };

  return (
    <div className="menu-part w-full md:w-[800px] mx-auto px-2 md:px-0">
      <div className="res-menu-info w-full md:w-[800px] mx-auto flex flex-col">
        <div className="res-name text-xl md:text-2xl font-extrabold pl-2 md:pl-4 mt-8 md:mt-5 mb-4 md:mb-6">
          {name}
        </div>
        <div className="res-info-card w-full md:w-[97%] mx-auto flex flex-col border border-gray-200 rounded-[15px] md:rounded-[25px] p-2 md:p-3 pl-2 md:pl-4">
          <div className="res-rating font-semibold py-1 md:py-2 flex items-center text-xs md:text-sm">
            <img
              className="rating-icon w-[14px] md:w-[18px]"
              src={RATING_ICON}
              alt="Rating"
              loading="lazy"
            />
            <p className="ml-1">
              {avgRating} - {costForTwoMessage?.toUpperCase()}
            </p>
          </div>
          <div className="cuisines text-xs md:text-sm text-red-600 underline font-semibold pb-1 md:pb-2 pl-0.5">
            {cuisines?.join(", ") || "Cuisines not available"}
          </div>
          <div className="delivery-time text-xs md:text-sm font-semibold pl-0.5 pb-3 md:pb-5">
            --- {sla?.slaString || "Delivery time not available"}
          </div>
        </div>
      </div>
      <div className="main-menu-info flex flex-col w-full md:w-[800px] p-1 md:p-2 pl-0 md:pl-1 mt-3 md:mt-5 border-b border-gray-200">
        <div className="menu-search-filter flex flex-col gap-1 md:gap-2">
          <div className="menu-text text-lg md:text-xl mx-auto p-1 pb-1 md:pb-2 font-bold">
            MENU
          </div>

          <div className="menu-filters flex gap-2 p-2 md:p-3 pl-2 md:pl-4">
            <button
              className={`px-3 md:px-4 py-1 md:py-2 border ${
                isVegFilterActive
                  ? "border-red-400 border-[2px] text-red-400"
                  : "border-green-600 border-[2px]"
              } bg-white mb-1 md:mb-2 rounded-lg md:rounded-xl text-sm md:text-base font-bold cursor-pointer text-green-600 transition-colors`}
              onClick={toggleVegFilter}
            >
              {isVegFilterActive ? "Show All" : "Veg Only"}
            </button>
          </div>
        </div>
      </div>

      <div className="res-menu-card mt-3 md:mt-5 mb-3 md:mb-5">
        <div className="menu-card flex gap-2 md:gap-4 flex-col items-center">
          {categories?.length > 0 ? (
            categories.map((category) => (
              <MenuCategory
                key={category?.card?.card?.categoryId}
                data={category}
              />
            ))
          ) : (
            <p>No menu categories available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
