import Image from "next/image";
import Logos from "./Logos";
import HeroCta from "./HeroCta";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[max(100svh,680px)] flex-col overflow-hidden">
      {/* Background: students attending a live tech session (generated with Figma AI) */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div data-anim="hero-bg" className="absolute inset-0">
          <Image
            src="/hero-students.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_60%] max-sm:object-[50%_center]"
          />
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col px-5 sm:px-8">
        <div className="flex flex-col items-center pt-16 text-center sm:pt-24 lg:pt-28">
          {/* Logo centred above the headline */}
          <header data-anim="hero" className="mb-8 sm:mb-10">
            <Logos />
          </header>

          <h1
            data-anim="hero"
            className="mb-4 text-[34px] leading-[1.08] font-semibold tracking-[-0.04em] text-balance text-ink sm:text-5xl lg:text-[clamp(36px,3.4vw,52px)] lg:whitespace-nowrap"
          >
            Bring the tech industry&apos;s <span className="whitespace-nowrap">know how</span> to your campus.
          </h1>

          <p
            data-anim="hero"
            className="mb-7 max-w-[480px] text-[15px] leading-relaxed text-[#2a2a35] sm:text-base lg:max-w-none lg:whitespace-nowrap"
          >
            Become a Catalyst Campus Ambassador. Bring industry leaders and live tech sessions to your peers, and win
            exciting rewards.
          </p>

          <div data-anim="hero">
            <HeroCta />
          </div>
        </div>
      </div>
    </section>
  );
}
