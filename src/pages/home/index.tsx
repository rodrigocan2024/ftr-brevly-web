import { useMutation, useQuery } from "@tanstack/react-query";
import { DownloadSimple, Link } from "phosphor-react";
import { toast } from "sonner";
import { exportCSV } from "../../api/links/export-csv";
import { getLinks } from "../../api/links/get-links";
import { CreateLinkForm } from "../../components/create-link-form";
import { Header } from "../../components/header";
import { LinkCard } from "../../components/link-card";
import { Button } from "../../components/ui/button";

export function Home() {
  const { data: links, isLoading: isLoadingLinks } = useQuery({
    queryKey: ["links"],
    queryFn: getLinks,
  });

  const { mutateAsync: exportCSVFn, isPending: isLoadingCSVDownload } =
    useMutation({
      mutationFn: exportCSV,
      onSuccess: () => {
        toast.success("CSV baixado com sucesso.");
      },
      onError: (error) => {
        console.log(error);
        toast.error("Erro ao baixar CSV. Por favor, tente novamente.");
      },
    });

  async function handleDownloadCSV() {
    const downloadUrl = await exportCSVFn();

    const anchor = document.createElement("a");
    anchor.href = downloadUrl.reportUrl;
    anchor.download = "";
    anchor.target = "_blank";
    anchor.click();

    anchor.remove();
  }

  return (
    <div className="flex flex-col justify-center max-w-7xl mx-auto items-start h-screen w-screen">
      <div className="w-full flex items-center justify-center lg:justify-start">
        <Header />
      </div>
      <main className="flex gap-5 w-full flex-col lg:flex-row px-3">
        <div className="bg-gray-100 lg:w-[700px] w-full p-8 rounded-lg max-h-[380px]">
          <h1 className="text-gray-600 text-lg mb-6">Novo link</h1>
          <CreateLinkForm />
        </div>
        <div className="w-full bg-gray-100 p-8 rounded-lg max-h-[850px] overflow-y-auto scrollbar scrollbar-thumb-blue-base">
          <div className="flex items-center justify-between">
            <h2 className="text-gray-600 text-lg mb-6">Meus links</h2>
            <Button
              variant="secondary"
              disabled={
                links?.total === 0 || isLoadingLinks || isLoadingCSVDownload
              }
              className="p-1 w-[100px] h-[32px]"
              onClick={handleDownloadCSV}
            >
              <Button.Icon icon={DownloadSimple} />
              <Button.Title className="font-semibold text-sm">
                Baixar CSV
              </Button.Title>
            </Button>
          </div>

          <div className="flex w-full items-center justify-center mt-5 pb-4 flex-col">
            <div className="w-full flex items-center justify-center flex-col gap-3">
              <div className="border w-full border-gray-200" />
              {links?.total === 0 && !isLoadingLinks && (
                <div className="flex flex-col items-center justify-center gap-3 mt-4.5">
                  <Link className="size-8 text-gray-400" />
                  <span className="text-xs uppercase text-gray-500">
                    Ainda não existem links cadastrados
                  </span>
                </div>
              )}
            </div>
            <div className="flex-1 w-full">
              {links?.links.map((link) => {
                return <LinkCard key={link.id} link={link} />;
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
