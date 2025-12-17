import { api } from "../../lib/axios";

type CreateLinkData = {
  originalUrl: string;
  shortUrl: string;
};

export async function createLink(data: CreateLinkData) {
  const response = await api.post("/links", data);
  return response.data;
}
