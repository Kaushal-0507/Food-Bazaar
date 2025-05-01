import { Link } from "react-router-dom";
import { FOOD_SLIDE_IMG } from "../utils/constants";
const Slider = (props) => {
  const { resData } = props;
  return (
    <div className="flex mb-10 w-[144px] h-[180px] gap-6 px-2">
      <img
        className="w-[144px] h-[180px]"
        src={FOOD_SLIDE_IMG + resData.imageId}
      />
    </div>
  );
};
export default Slider;
