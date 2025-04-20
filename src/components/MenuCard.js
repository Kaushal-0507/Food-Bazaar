import { MENU_CARD_IMG } from "../utils/constants";
const MenuCard = (props) => {
  const { menuData } = props;

  const {
    name,
    imageId,
    description,
    defaultPrice,
    price,
    ratings,
    variantsV2,
    itemAttribute,
  } = menuData?.card?.info;
  return (
    <div className="menu-card-div">
      <div className="menu-card-info-div">
        <div className="menu-category"></div>
        <div
          className="card-food-type"
          style={{
            color: itemAttribute.vegClassifier === "VEG" ? "green" : "red",
          }}
        >
          {itemAttribute.vegClassifier}
        </div>
        <div className="menu-card-name">{name}</div>
        <div className="menu-card-price">
          ₹
          {!isNaN(price)
            ? `${price / 100}`
            : !isNaN(defaultPrice)
            ? `${defaultPrice / 100}`
            : !isNaN(variantsV2?.pricingModels?.price)
            ? `${variantsV2.pricingModels.price / 100}`
            : "N/A"}
        </div>
        <div className="menu-card-rating">
          <span>
            {ratings?.aggregatedRating?.rating !== undefined && (
              <>
                <span className="gold-star">★</span>{" "}
                <span className="gold-star">
                  {ratings.aggregatedRating.rating}
                </span>
              </>
            )}
            {ratings?.aggregatedRating?.ratingCountV2 !== undefined && (
              <>
                <span className="rating-count">
                  ({ratings.aggregatedRating.ratingCountV2})
                </span>
              </>
            )}
          </span>
        </div>
        <div className="menu-card-des">
          <span className="menu-card-description">{description}</span>
        </div>
      </div>
      <div className="menu-card-img-div">
        <img
          className="menu-card-img-div"
          src={
            imageId
              ? `${MENU_CARD_IMG}${imageId}`
              : "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/p0ywhncl6ccwfm8bpame"
          }
          alt="Menu Item"
        />
      </div>
    </div>
  );
};

export default MenuCard;
