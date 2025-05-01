import { useDispatch } from "react-redux";
import { MENU_CARD_IMG } from "../utils/constants";
import { addItem } from "../utils/cartSlice";
const MenuCard = (props) => {
  const { menuData, flag } = props;

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

  const dispatch = useDispatch();

  const handleAddItem = (menuData) => {
    dispatch(addItem(menuData));
  };
  return (
    <div className="menu-card-div flex w-[750px] justify-center items-center py-4">
      <div className="menu-card-info-div w-[580px]">
        <div className="menu-category"></div>
        <div
          className="card-food-type text-[14px] font-bold py-[5px]"
          style={{
            color: itemAttribute.vegClassifier === "VEG" ? "green" : "red",
          }}
        >
          {itemAttribute.vegClassifier}
        </div>
        <div className="menu-card-name font-semibold text-[18px] leading-[22px] tracking-[-0.45px] text-[rgba(2,6,12,0.75)] pb-[5px]">
          {name}
        </div>
        <div className="menu-card-price pb-[5px] font-bold text-[16px]">
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
                <span className="gold-star text-[14px] font-bold text-[rgb(230,164,8)]">
                  ★
                </span>{" "}
                <span className="gold-star text-[14px] font-bold text-[rgb(230,164,8)]">
                  {ratings.aggregatedRating.rating}
                </span>
              </>
            )}
            {ratings?.aggregatedRating?.ratingCountV2 !== undefined && (
              <>
                <span className="rating-count text-[14px] text-gray-500">
                  ({ratings.aggregatedRating.ratingCountV2})
                </span>
              </>
            )}
          </span>
        </div>
        <div className="menu-card-des">
          <span className="menu-card-description w-[95%] max-h-full overflow-hidden text-ellipsis mt-[5px] text-gray-500 line-clamp-2">
            {description}
          </span>
        </div>
      </div>
      <div className="relative">
        {!flag ? (
          <button
            onClick={() => handleAddItem(menuData)}
            className="cursor-pointer absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 p-1.5 rounded-[8px] bg-white border-gray-300 border-[1px] px-10 font-bold text-[#1ba672] text-[18px] hover:bg-gray-100"
          >
            ADD
          </button>
        ) : null}

        <img
          className="menu-card-img-div w-[160px] h-[145px] rounded-[12px]"
          src={imageId ? `${MENU_CARD_IMG}${imageId}` : ""}
          alt="Menu Item"
        />
      </div>
    </div>
  );
};

export default MenuCard;
