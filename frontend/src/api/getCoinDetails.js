import api from "../../lib/api";

export default async function getCoinDetails(id) {
  try {
    const response = await api.get(`/coins/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching coin details:", error);
    return null;
  }
}
