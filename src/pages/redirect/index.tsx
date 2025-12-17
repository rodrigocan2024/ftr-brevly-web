import { useParams } from "react-router";

export function Redirect() {
  const params = useParams();
  const shortUrl = params.shortUrl;

  if (!shortUrl) {
    return;
  }

  return <h1>Redirecionando...</h1>;
}
