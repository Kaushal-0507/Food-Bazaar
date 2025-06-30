import { useEffect, useState, useCallback } from "react";
import { MENU_RES_URL } from "./constants";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!resId) return;

    try {
      setIsLoading(true);
      setError(null);

      // Add timeout to the fetch request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

      const dataMenu = await fetch(
        MENU_RES_URL + resId + "&catalog_qa=undefined&submitAction=ENTER",
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cache-Control': 'max-age=600' // 10 minutes cache for menu
          },
          signal: controller.signal
        }
      );

      clearTimeout(timeoutId);

      if (!dataMenu.ok) {
        throw new Error(`HTTP error! status: ${dataMenu.status}`);
      }

      const json = await dataMenu.json();
      
      if (!json?.data) {
        throw new Error("Invalid menu data received from API");
      }

      setResInfo(json.data);
    } catch (error) {
      console.error("Error fetching menu:", error.message);
      setError(error.message);
      setResInfo(null);
    } finally {
      setIsLoading(false);
    }
  }, [resId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { resInfo, isLoading, error, refetch: fetchData };
};

export default useRestaurantMenu;
