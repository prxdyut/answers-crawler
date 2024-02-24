"use server";
import axios from "axios";

export default async function proxy(url: string) {
  try {
    const imageUrl = url; // Assuming the URL is passed as a query parameter

    // Fetch the image from the external server
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });

    return response.data;
  } catch (error) {
    console.error("Error fetching image:", error);
    return "Internal Server Error";
  }
}
