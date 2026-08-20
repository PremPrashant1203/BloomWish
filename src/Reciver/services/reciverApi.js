const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://bloomwish.onrender.com";

export const getSharedBouquet = async (shareId) => {
  try {
    if (!shareId) {
      throw new Error("Share ID is missing");
    }

    const response = await fetch(
      `${API_BASE_URL}/api/bouquets/shared/${shareId}`
    );

    const data = await response.json();

    console.log("Shared Bouquet API Response:", data);

    if (!response.ok || !data.success) {
      throw new Error(
        data.message || "Unable to fetch shared bouquet"
      );
    }

    // IMPORTANT:
    // Return complete backend response.
    // ReciverPage needs both:
    // data.success
    // data.bouquet

    return data;

  } catch (error) {
    console.error("Receiver API Error:", error);
    throw error;
  }
};