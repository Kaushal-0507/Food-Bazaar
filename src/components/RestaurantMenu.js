import Shimmer from "./shimmer";
import { RATING_ICON } from "../utils/constants";
import MenuCard from "./MenuCard";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
const RestaurantMenu = () => {
  const { resId } = useParams();
  console.log(resId);

  const resInfo = useRestaurantMenu(resId);
  console.log(resInfo);

  if (!resInfo) return <Shimmer />; // Show shimmer until data loads

  // Safely extract data (optional chaining)
  const { name, costForTwoMessage, avgRating, cuisines, sla } =
    resInfo?.cards?.[2]?.card?.card?.info || {};
  const { itemCards } =
    resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[2]?.card
      ?.card || {};
  console.log(itemCards);

  return (
    <div className="menu-part">
      <div className="res-menu-info">
        <div className="res-name">{name}</div>
        <div className="res-info-card">
          <div className="res-rating">
            <img className="rating-icon" src={RATING_ICON} />
            <p>
              {avgRating} - {costForTwoMessage?.toUpperCase()}
            </p>
          </div>
          <div className="cuisines">
            {cuisines?.join(", ") || "Cuisines not available"}
          </div>
          <div className="delivery-time">
            --- {sla?.slaString || "Delivery time not available"}
          </div>
        </div>
      </div>
      <div className="main-menu-info">
        <div className="menu-search-filter">
          <div className="menu-text">MENU</div>
          <div className="menu-search">
            <input className="dish-search" type="text" placeholder="Search" />
          </div>
          <div className="menu-filters">
            <button className="all-menu">All</button>
            <button className="veg-menu">Veg</button>
            <button className="non-veg-menu">Non-veg</button>
          </div>
        </div>
      </div>
      <div className="res-menu-card">
        <div className="menu-card">
          {itemCards.map((item) => (
            <MenuCard key={item.card.info.id} menuData={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default RestaurantMenu;
