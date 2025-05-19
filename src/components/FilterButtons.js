import React, { useState } from "react";

const FilterButtons = ({ restaurantList, setFilteredRestaurants }) => {
  const [activeFilter, setActiveFilter] = useState("All");

  const handleAllClick = () => {
    setFilteredRestaurants(restaurantList);
    setActiveFilter("All");
  };

  const handleRatingClick = () => {
    const filtered = restaurantList.filter((res) => res.info.avgRating >= 4);
    setFilteredRestaurants(filtered);
    setActiveFilter("Rating 4.0+");
  };

  const handleDeliveryClick = () => {
    const filtered = restaurantList.filter(
      (res) => res.info.sla.deliveryTime <= 25
    );
    setFilteredRestaurants(filtered);
    setActiveFilter("Fast Delivery");
  };

  const handleCuisineClick = (cuisine) => {
    const filtered = restaurantList.filter((res) =>
      res.info.cuisines?.includes(cuisine)
    );
    setFilteredRestaurants(filtered);
    setActiveFilter(cuisine);
  };

  return (
    <div className="flex gap-5 ml-[150px] mb-6">
      <button
        className={`border-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors cursor-pointer ${
          activeFilter === "All"
            ? "border-red-500 bg-gray-200"
            : "border-gray-300 bg-white hover:bg-gray-100"
        }`}
        onClick={handleAllClick}
      >
        All
      </button>

      <button
        className={`border rounded-full px-4 py-2 text-sm font-semibold transition-colors cursor-pointer ${
          activeFilter === "Rating 4.0+"
            ? "border-red-500 bg-gray-200"
            : "border-gray-300 bg-white hover:bg-gray-100"
        }`}
        onClick={handleRatingClick}
      >
        Rating 4.0+
      </button>

      <button
        className={`border rounded-full px-4 py-2 text-sm font-semibold transition-colors cursor-pointer ${
          activeFilter === "Fast Delivery"
            ? "border-red-500 bg-gray-200"
            : "border-gray-300 bg-white hover:bg-gray-100"
        }`}
        onClick={handleDeliveryClick}
      >
        Fast Delivery
      </button>

      {[
        "Burgers",
        "Pizzas",
        "Desserts",
        "Italian",
        "Beverages",
        "North Indian",
      ].map((c) => (
        <button
          key={c}
          className={`border rounded-full px-4 py-2 text-sm font-semibold transition-colors cursor-pointer ${
            activeFilter === c
              ? "border-red-500 bg-gray-200"
              : "border-gray-300 bg-white hover:bg-gray-100"
          }`}
          onClick={() => handleCuisineClick(c)}
        >
          {c}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
