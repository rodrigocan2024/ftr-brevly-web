import { api } from "../../lib/axios";

export async function increaseLinkAccessCount(id: string) {
  const response = await api.patch(`/links/${id}`);
  return response.data;
}
