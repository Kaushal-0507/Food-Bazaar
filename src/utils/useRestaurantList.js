import { useEffect, useState } from "react";
import { RESTAURANT_API } from "./constants";

const useRestaurantList = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await fetch(RESTAURANT_API);
    console.log(data);
    const json = await data.json();
    setRestaurantList(json?.data);
    console.log(json?.data);
  };
  return restaurantList;
};

export default useRestaurantList;
