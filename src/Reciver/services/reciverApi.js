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

    if (!response.ok || !data.success) {
      throw new Error(
        data.message || "Unable to fetch shared bouquet"
      );
    }

    return data.bouquet;
  } catch (error) {
    console.error("Receiver API Error:", error);
    throw error;
  }
};