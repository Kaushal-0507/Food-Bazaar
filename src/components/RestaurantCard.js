import { CDN_URL } from "../utils/constants";
import { RATING_ICON } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { name, cuisines, avgRating, costForTwo, sla, cloudinaryImageId } =
    resData.info;
  return (
    <div className="res-card">
      <div className="res-card-img">
        <img className="card-img" src={CDN_URL + cloudinaryImageId} />
      </div>
      <div className="res-card-name">
        <h4 className="res-card-name">{name}</h4>
      </div>
      <p className="cost-two">{costForTwo}</p>
      <div className="res-rate-time">
        <img className="rating-icon" src={RATING_ICON} />
        <p className="res-ratings">{avgRating}</p>
        <p className="res-timing">{sla.slaString}</p>
      </div>
      <p className="res-cuisine">{cuisines.join(", ")}</p>
    </div>
  );
};

export default RestaurantCard;
