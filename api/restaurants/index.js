import axios from "axios";

export default async function handler(req, res) {
  try {
    const { lat, lng } = req.query;
    const response = await axios.get(
      "https://www.swiggy.com/dapi/restaurants/list/v5",
      {
        params: {
          lat: lat || "19.4103104",
          lng: lng || "72.8365911",
          is_seo_homepage_enabled: true,
          page_type: "DESKTOP_WEB_LISTING",
        },
        headers: {
          "Content-Type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
          Accept: "application/json",
          "Accept-Language": "en-US,en;q=0.9",
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
}
