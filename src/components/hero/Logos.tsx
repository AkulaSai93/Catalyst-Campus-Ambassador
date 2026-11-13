import Image from "next/image";

// Official uGSOT × Catalyst lockup (dark-text version of sot.upgrad.com's white logo)
export default function Logos() {
  return (
    <Image
      src="/logo-ugsot-catalyst.png"
      alt="upGrad School of Technology | Catalyst"
      width={2360}
      height={300}
      priority
      className="h-7 w-auto sm:h-9"
    />
  );
}
