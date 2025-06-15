import axios from "axios";

export default async function handler(req, res) {
  try {
    const { restaurantId } = req.query;
    const response = await axios.get("https://www.swiggy.com/dapi/menu/pl", {
      params: {
        "page-type": "REGULAR_MENU",
        "complete-menu": true,
        lat: "19.4103104",
        lng: "72.8365911",
        restaurantId,
      },
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        Accept: "application/json",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching menu:", error);
    res.status(500).json({ error: "Failed to fetch menu" });
  }
}
