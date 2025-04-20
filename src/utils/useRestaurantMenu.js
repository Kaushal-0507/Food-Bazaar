import { useEffect, useState } from "react";
import { MENU_RES_URL } from "./constants";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  useEffect(() => {
    fetchData();
  }, [resId]);

  const fetchData = async () => {
    const dataMenu = await fetch(
      MENU_RES_URL + resId + "&catalog_qa=undefined&submitAction=ENTER"
    );
    const json = await dataMenu.json();
    setResInfo(json?.data);
    console.log(json?.data);
  };
  return resInfo;
};

export default useRestaurantMenu;
