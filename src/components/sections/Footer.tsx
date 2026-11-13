import Image from "next/image";
import Logos from "../hero/Logos";

// TODO: real URLs for Terms, Privacy and the ambassador support email / WhatsApp number (per brief)
const LINKS = [
  { label: "Terms and Conditions", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Ambassador support", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-white">
      <div className="relative z-10 mx-auto flex max-w-[1280px] flex-col items-center gap-6 px-5 pt-12 sm:flex-row sm:justify-between sm:px-8">
        <Logos />
        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[14.5px] text-[#4a4a57] sm:gap-x-2">
            {LINKS.map((l, i) => (
              <li key={l.label} className="flex items-center gap-2">
                {i > 0 && (
                  <span aria-hidden className="text-black/25 max-sm:hidden">
                    ·
                  </span>
                )}
                <a href={l.href} className="transition hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Golden-hour campus lawn (Figma AI), with the wordmark set into the bottom edge over a soft dark overlay */}
      <div className="relative mt-4 aspect-[1792/768] w-full overflow-hidden" aria-hidden>
        <Image src="/footer/campus-lawn.jpg" alt="" fill sizes="100vw" className="object-cover object-bottom" />
        <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-white to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
        <span
          data-anim="letters"
          className="absolute inset-x-0 -bottom-[0.1em] text-center text-[16.5vw] leading-[0.8] font-semibold tracking-[-0.06em] text-white select-none"
        >
          {"CATALYST".split("").map((ch, i) => (
            <span key={i} className="inline-block">
              {ch}
            </span>
          ))}
        </span>
        {/* over the letters, so their base fades into the ground instead of a hard cut */}
        <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#0d1406]/95 via-[#0d1406]/55 to-transparent" />
      </div>
    </footer>
  );
}
