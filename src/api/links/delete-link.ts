import { api } from "../../lib/axios";

export async function deleteLink(id: string) {
  const response = await api.delete(`/links/${id}`);
  return response.data;
}
