import api from "../../lib/api";

export default async function getCoinList(page = 1) {
  try {
    const response = await api.get(`/coins/markets`, {
      params: {
        per_page: 9,
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching coins:", error);
    throw error;
  }
}
