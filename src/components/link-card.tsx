import { useMutation } from "@tanstack/react-query";
import { Copy, Trash } from "phosphor-react";
import { Link } from "react-router";
import { toast } from "sonner";
import { deleteLink } from "../api/links/delete-link";
import { queryClient } from "../lib/react-query";
import type { Link as LinkType } from "../types/link";
import { Button } from "./ui/button";

export function LinkCard({ link }: { link: LinkType }) {
  const fullLink = `localhost:5173/${link.shortUrl}`;

  const { mutateAsync: deleteLinkFn, isPending: isDeletingLink } = useMutation({
    mutationFn: () => deleteLink(link.id),
    onSuccess: () => {
      toast.success("Link deletado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Erro ao deletar link");
    },
  });

  function handleDeleteLink() {
    const confirmed = window.confirm(
      `Você realmente quer apagar o link ${link.shortUrl}?`,
    );
    if (confirmed) {
      deleteLinkFn();
    }
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(fullLink);
    toast.info("Link copiado com sucesso!", {
      description: `O link ${link.shortUrl} foi copiado para a área de transferência.`,
    });
  }

  return (
    <>
      <div className="flex items-center justify-between w-full mt-4.5">
        <div className="flex flex-col justify-center gap-1">
          <Link
            className="text-md text-blue-base"
            to={`http://${fullLink}`}
            target="_blank"
          >
            {fullLink}
          </Link>
          <span className="text-sm text-gray-500">{link.originalUrl}</span>
        </div>
        <div className="flex items-center justify-center">
          <span className="text-sm text-gray-500">
            {link.accessCount} acessos
          </span>
        </div>
        <div className="flex gap-1">
          <Button
            variant="secondary"
            className="size-8"
            onClick={handleCopyLink}
            disabled={isDeletingLink}
          >
            <span className="sr-only">Copiar link</span>
            <Button.Icon icon={Copy} />
          </Button>
          <Button
            variant="secondary"
            className="size-8"
            onClick={handleDeleteLink}
            disabled={isDeletingLink}
          >
            <span className="sr-only">Deletar link</span>
            <Button.Icon icon={Trash} />
          </Button>
        </div>
      </div>
      <div className="border w-full border-gray-200 mt-4.5" />
    </>
  );
}
