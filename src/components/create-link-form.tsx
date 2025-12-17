import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Warning } from "phosphor-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createLink } from "../api/links/create-link";
import { queryClient } from "../lib/react-query";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const createLinkFormSchema = z.object({
  originalUrl: z.string().url("URL inválida"),
  shortUrl: z.string().min(1, "URL encurtada é obrigatória"),
});

type CreateLinkFormSchema = z.infer<typeof createLinkFormSchema>;

type CreateLinkParams = {
  originalUrl: string;
  shortUrl: string;
};

export function CreateLinkForm() {
  const { mutateAsync: createLinkFn, isPending: isCreatingLink } = useMutation({
    mutationFn: ({ originalUrl, shortUrl }: CreateLinkParams) =>
      createLink({ originalUrl, shortUrl }),
    onSuccess: () => {
      toast.success("Link criado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        if (
          error.response?.data.message ===
          "O link encurtado já existe. Por favor, escolha outro!"
        ) {
          toast.error("Erro no cadastro.", {
            description: "Essa URL encurtada já existe.",
          });
          return;
        }
      }
      toast.error("Erro ao criar link. Por favor, tente novamente.");
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateLinkFormSchema>({
    resolver: zodResolver(createLinkFormSchema),
    values: {
      originalUrl: "",
      shortUrl: "",
    },
  });

  async function handleCreateLink(data: CreateLinkFormSchema) {
    await createLinkFn({
      originalUrl: data.originalUrl,
      shortUrl: data.shortUrl,
    });
    reset();
  }

  return (
    <form
      className="flex flex-col w-full"
      onSubmit={handleSubmit(handleCreateLink)}
    >
      <div className="flex flex-col w-full gap-4">
        <div className="group flex w-full flex-col-reverse gap-1.5">
          <div className="flex items-center gap-2">
            {errors.originalUrl?.message && (
              <>
                <Warning size={16} className="text-danger" />
                <p className="text-sm text-gray-500">
                  {errors.originalUrl?.message}
                </p>
              </>
            )}
          </div>
          <Input
            type="url"
            id="originalUrl"
            placeholder="www.exemplo.com.br"
            status={errors.originalUrl?.message ? "error" : "default"}
            {...register("originalUrl")}
          />
          <Label
            id="originalUrl"
            status={errors.originalUrl?.message ? "error" : "default"}
          >
            LINK ORIGINAL
          </Label>
        </div>

        <div className="group flex w-full flex-col-reverse gap-1.5">
          <div className="flex items-center gap-2">
            {errors.shortUrl?.message && (
              <>
                <Warning size={16} className="text-danger" />
                <p className="text-sm text-gray-500">
                  {errors.shortUrl?.message}
                </p>
              </>
            )}
          </div>
          <Input
            type="text"
            id="shortUrl"
            prefix="brev.ly/"
            status={errors.shortUrl?.message ? "error" : "default"}
            {...register("shortUrl")}
          />
          <Label
            id="shortUrl"
            status={errors.shortUrl?.message ? "error" : "default"}
          >
            LINK ENCURTADO
          </Label>
        </div>
      </div>

      <div className="mt-6 w-full">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting || isCreatingLink}
          className="w-full"
        >
          <Button.Title>Salvar link</Button.Title>
        </Button>
      </div>
    </form>
  );
}
