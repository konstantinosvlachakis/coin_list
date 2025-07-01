import api from "../../lib/api";

export default async function getCoinList(page = 1) {
  try {
    const response = await api.get(`/coins/markets`, {
      params: {
        per_page: 10,
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching coins:", error);
    return [];
  }
}
