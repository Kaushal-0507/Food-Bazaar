import { useDispatch } from "react-redux";
import { MENU_CARD_IMG } from "../utils/constants";
import { addItem, removeItem } from "../utils/cartSlice";

const CartItems = (props) => {
  const { menuData } = props;
  const dispatch = useDispatch();

  const {
    id,
    name,
    imageId,
    defaultPrice,
    price,
    ratings,
    variantsV2,
    itemAttribute,
  } = menuData?.card?.info || {};

  const handleIncreaseQuantity = () => {
    dispatch(addItem(menuData));
  };

  const handleDecreaseQuantity = () => {
    dispatch(removeItem(id));
  };
  const itemPrice = !isNaN(price)
    ? `${price / 100}`
    : !isNaN(defaultPrice)
    ? `${defaultPrice / 100}`
    : !isNaN(variantsV2?.pricingModels?.price)
    ? `${variantsV2.pricingModels.price / 100}`
    : "N/A";

  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-200 shadow-lg">
      <div className="flex items-center gap-4">
        <img
          className="w-[70px] h-[70px] rounded-[12px] object-cover"
          src={imageId ? `${MENU_CARD_IMG}${imageId}` : ""}
          alt="Menu Item"
        />
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <div
              className="text-[10px] font-bold pt-1.5"
              style={{
                color: itemAttribute?.vegClassifier === "VEG" ? "green" : "red",
              }}
            >
              {itemAttribute?.vegClassifier}
            </div>
            <div>
              {ratings?.aggregatedRating?.rating && (
                <span className="text-[10px] font-bold text-[rgb(230,164,8)]">
                  ★ {ratings.aggregatedRating.rating}
                </span>
              )}
            </div>
          </div>
          <div className="font-semibold text-[14px] text-[rgba(2,6,12,0.75)]">
            {name}
          </div>
          <div className="flex gap-3 pt-1.5 items-center">
            <div className="font-bold text-[14px]">₹{itemPrice}</div>
            <div className="flex items-center justify-center bg-white gap-0.5 border-gray-300 border-[1px] rounded-[8px]">
              <button
                onClick={handleDecreaseQuantity}
                className="text-[#1ba672] cursor-pointer text-[20px] font-bold px-3 hover:bg-gray-200 rounded-l-[8px]"
              >
                -
              </button>
              <span className="px-2 text-[14px] font-medium">
                {menuData.quantity}
              </span>
              <button
                onClick={handleIncreaseQuantity}
                className="text-[#1ba672] cursor-pointer text-[20px] font-bold px-2.5 hover:bg-gray-200 rounded-r-[8px]"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="font-bold pt-4">₹{itemPrice * menuData.quantity}</div>
    </div>
  );
};

export default CartItems;
