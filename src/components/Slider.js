import { FOOD_SLIDE_IMG } from "../utils/constants";
const Slider = (props) => {
  const { resData } = props;
  return (
    <div className="food-div">
      <img className="food-img" src={FOOD_SLIDE_IMG + resData.imageId} />
    </div>
  );
};
export default Slider;
