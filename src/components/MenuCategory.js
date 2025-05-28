import { useState } from "react";
import MenuCard from "./MenuCard";

const MenuCategory = ({ data }) => {
  const { title, itemCards } = data?.card?.card;
  const [showCategory, setShowCategory] = useState(true);
  const handleClick = () => {
    setShowCategory(!showCategory);
  };

  return (
    <div className="flex flex-col gap-1 w-full md:w-[800px] shadow-md md:shadow-lg">
      <div
        className="flex justify-between p-2 md:p-2.5 hover:bg-gray-200 text-base md:text-[18px] cursor-pointer"
        onClick={handleClick}
      >
        <span className="font-bold">
          {title}({itemCards.length})
        </span>
        {showCategory ? (
          <span className="font-bold rotate-180">⌵</span>
        ) : (
          <span className="font-bold">⌵</span>
        )}
      </div>
      {showCategory && (
        <div className="flex flex-col justify-center items-center my-1 md:my-2.5 gap-1 md:gap-2.5">
          {itemCards.map((item) => (
            <MenuCard key={item.card.info.id} menuData={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuCategory;
