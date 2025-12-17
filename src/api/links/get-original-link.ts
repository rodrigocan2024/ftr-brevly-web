import { api } from "../../lib/axios";

type GetLinkResponse = {
  id: string;
  originalUrl: string;
};

export async function getOriginalLink(
  shortUrl: string,
): Promise<GetLinkResponse> {
  const response = await api.get(`/links/${shortUrl}`);
  return response.data;
}
