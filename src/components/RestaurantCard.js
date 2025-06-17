import { CDN_URL } from "../utils/constants";
import { RATING_ICON } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { name, cuisines, avgRating, costForTwo, sla, cloudinaryImageId } =
    resData.info;
  return (
    <div className="res-card p-2 bg-white w-[280px] md:w-[280px] rounded-xl flex flex-col gap-1 shadow-md transition-transform duration-400 hover:scale-95 hover:shadow-lg">
      <div className="res-card-img flex justify-center mb-1">
        <img
          className="card-img w-[280px] md:w-[280px] h-[150px] md:h-[150px] rounded-xl object-cover"
          src={CDN_URL + cloudinaryImageId}
          alt={name}
        />
      </div>
      <div className="res-card-name truncate font-semibold text-sm">{name}</div>
      <p className="cost-two ml-2 text-sm font-semibold text-red-600">
        {costForTwo}
      </p>
      <div className="res-rate-time flex text-sm items-center">
        <img className="rating-icon w-[18px] mr-0.5" src={RATING_ICON} alt="rating" />
        <p className="res-ratings mr-2">{avgRating}</p>
        <p className="res-timing">{sla.slaString}</p>
      </div>
      <p className="res-cuisine truncate text-gray-500 text-xs">
        {cuisines.join(", ")}
      </p>
    </div>
  );
};

export default RestaurantCard;
