import { FOOD_SLIDE_IMG } from "../utils/constants";

const Slider = (props) => {
  const { resData } = props;
  return (
    <div className="flex mb-6 md:mb-10 w-[150px] md:w-[144px] h-[190px] md:h-[180px] md:gap-8 px-1 md:px-2">
      <img
        className="w-[150px] md:w-[144px] h-[190px] md:h-[180px] object-cover"
        src={FOOD_SLIDE_IMG + resData.imageId}
        alt="Food item"
      />
    </div>
  );
};

export default Slider;
