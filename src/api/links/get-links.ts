import { api } from "../../lib/axios";
import type { Link } from "../../types/link";

type GetLinksResponse = {
  links: Link[];
  total: number;
};

export async function getLinks(): Promise<GetLinksResponse> {
  const response = await api.get("/links");
  return response.data;
}
