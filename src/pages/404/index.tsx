import svg404 from "../../assets/404.svg";
import { Container } from "../../components/container";
import { Link } from "../../components/link";

export function NotFound() {
  return (
    <div className="size-full flex items-center justify-center">
      <Container className="gap-6 py-16 px-12 w-full items-center max-w-[580px]">
        <img className="w-[194px] object-contain" src={svg404} alt="404" />
        <strong className="text-2xl">Link não encontrado</strong>
        <span className="font-semibold text-sm text-gray-500 text-center leading-[18px]">
          O link que você está tentando acessar não existe, foi removido ou é
          uma URL inválida. Saiba mais em <Link to={"/"}>brev.ly</Link>.
        </span>
      </Container>
    </div>
  );
}
