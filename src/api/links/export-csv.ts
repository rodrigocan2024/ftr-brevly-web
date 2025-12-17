import { api } from "../../lib/axios";

export async function exportCSV() {
  const response = await api.post("/links/export");
  return response.data;
}
