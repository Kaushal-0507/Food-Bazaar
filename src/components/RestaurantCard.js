import { CDN_URL } from "../utils/constants";
import { RATING_ICON } from "../utils/constants";
import { useState } from "react";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { name, cuisines, avgRating, costForTwo, sla, cloudinaryImageId } =
    resData.info;
  
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <div className="res-card p-2 bg-white w-[300px] md:max-w-[250px] rounded-xl flex flex-col gap-1 shadow-md transition-transform duration-400 hover:scale-95 hover:shadow-lg">
      <div className="res-card-img flex justify-center mb-1 relative">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-xl flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        )}
        <img
          className={`card-img w-[300px] md:max-w-[250px] h-[160px] md:max-h-[150px] rounded-xl object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          src={imageError ? '/placeholder-food.jpg' : CDN_URL + cloudinaryImageId}
          alt={name}
          loading="lazy"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>
      <div className="res-card-name truncate font-semibold text-sm">{name}</div>
      <p className="cost-two ml-2 text-sm font-semibold text-red-600">
        {costForTwo}
      </p>
      <div className="res-rate-time flex text-sm items-center">
        <img
          className="rating-icon w-[18px] mr-0.5"
          src={RATING_ICON}
          alt="rating"
          loading="lazy"
        />
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
