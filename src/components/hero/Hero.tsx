import Image from "next/image";
import Logos from "./Logos";
import HeroCta from "./HeroCta";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[max(100svh,680px)] flex-col overflow-hidden">
      {/* Background: students attending a live tech session (generated with Figma AI) */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="/hero-students.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="animate-ken object-cover object-[50%_60%] max-sm:object-[50%_center]"
        />
      </div>

      <div className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col px-4 sm:px-8">
        <header className="flex items-center justify-between py-5 sm:py-6">
          <Logos />
          <a
            href="https://sot.upgrad.com/catalyst"
            target="_blank"
            rel="noopener"
            className="hidden rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-semibold text-text backdrop-blur-md transition hover:bg-white sm:block"
          >
            Explore Catalyst ↗
          </a>
        </header>

        <div className="flex flex-col items-center pt-12 text-center sm:pt-20 lg:pt-24">
          <h1 className="mb-4 animate-reveal text-[34px] leading-[1.08] font-semibold tracking-[-0.04em] text-balance text-ink [animation-delay:.12s] sm:text-5xl lg:text-[clamp(36px,3.4vw,52px)] lg:whitespace-nowrap">
            Bring the tech industry&apos;s know-how to your campus.
          </h1>

          <p className="mb-7 max-w-[480px] animate-reveal text-[15px] leading-relaxed text-[#2a2a35] [animation-delay:.2s] sm:text-base lg:max-w-none lg:whitespace-nowrap">
            Become a Catalyst Campus Ambassador. Bring industry leaders and live tech sessions to your peers, and win
            exciting rewards.
          </p>

          <div className="animate-reveal [animation-delay:.28s]">
            <HeroCta />
          </div>
        </div>

      </div>
    </section>
  );
}
