import logoSvg from "@assets/Varlık_4_1781727048468.svg";

export function LogoSvg({ className = "" }: { className?: string }) {
  return (
    <img src={logoSvg} alt="TamBebe" className={className} />
  );
}
