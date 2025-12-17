import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router";
import { getOriginalLink } from "../../api/links/get-original-link";
import { increaseLinkAccessCount } from "../../api/links/increase-link-access-count";
import { queryClient } from "../../lib/react-query";

export function Redirect() {
  const { shortUrl } = useParams();
  const location = useLocation();

  const { data: link, isLoading: isLoadingLink } = useQuery({
    queryKey: ["link", shortUrl],
    queryFn: () => getOriginalLink(shortUrl!),
    enabled: !!shortUrl,
    staleTime: Infinity,
  });

  const { mutateAsync: increaseAccessCountFn } = useMutation({
    mutationFn: (id: string) => increaseLinkAccessCount(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["link", shortUrl] });
      queryClient.invalidateQueries({ queryKey: ["links"] });
      if (link?.originalUrl) {
        window.location.href = link?.originalUrl;
      }
    },
  });

  useEffect(() => {
    if (link?.id && link?.originalUrl) {
      increaseAccessCountFn(link.id);
    }
  }, [link, increaseAccessCountFn]);

  const renderNotFound = () => (
    <main className="flex flex-col items-center justify-center h-screen">
      <div className="bg-gray-100 flex flex-col items-center justify-center max-w-[580px] rounded-lg p-12 mx-4">
        <img src="./404.svg" alt="404" />
        <h2 className="mt-6 text-xl text-gray-600">Link não encontrado</h2>
        <div className="mt-6 text-md text-gray-500 flex flex-col items-center justify-center max-w-[400px]">
          <span className="text-md text-gray-500 text-wrap text-center">
            O link que você está tentando acessar não existe, foi removido ou é
            uma URL inválida. Saiba mais em{" "}
            <Link to="/" className="text-blue-base underline">
              brev.ly
            </Link>
            .
          </span>
        </div>
      </div>
    </main>
  );

  const renderRedirecting = () => (
    <main className="flex flex-col items-center justify-center h-screen">
      <div className="bg-gray-100 flex flex-col items-center justify-center max-w-[580px] rounded-lg p-12 mx-4">
        <img src="./logo-icon.svg" alt="logo" />
        <h2 className="mt-6 text-xl text-gray-600">Redirecionando...</h2>
        <div className="mt-6 text-md text-gray-500 flex flex-col items-center justify-center max-w-[400px]">
          <span className="text-md text-gray-500 text-wrap text-center">
            O link será aberto automaticamente em alguns instantes. Não foi
            redirecionado?{" "}
            <Link to={location.pathname} className="text-blue-base underline">
              Acesse aqui
            </Link>
          </span>
        </div>
      </div>
    </main>
  );

  if (!link?.id && !link?.originalUrl && !isLoadingLink) {
    return renderNotFound();
  }

  return renderRedirecting();
}
