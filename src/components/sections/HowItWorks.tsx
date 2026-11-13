"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

const STEPS: { title: string; body: ReactNode; img: string; alt: string }[] = [
  {
    title: "Register in 2 minutes",
    body: "Verify your phone and email, and add your college.",
    img: "/how/step-1-register.jpg",
    alt: "A student signing up on her phone on the campus lawn",
  },
  {
    title: "Get your dashboard",
    body: (
      <>
        Your personal links for every session,
        <br />
        ready to share.
      </>
    ),
    img: "/how/step-2-dashboard.jpg",
    alt: "A student looking at a dashboard on a laptop on the campus lawn",
  },
  {
    title: "Bring your campus in",
    body: "Share sessions with classmates, clubs and juniors, or host a seminar.",
    img: "/how/step-3-campus.jpg",
    alt: "A student ambassador talking to classmates on the campus lawn",
  },
  {
    title: "Track your rewards",
    body: "See registrations, attendance and rewards live, and what you need for your next reward.",
    img: "/how/step-4-rewards.jpg",
    alt: "Two friends celebrating with a high five",
  },
];

/* Point on screen (fraction of viewport height) that "draws" the red line as you scroll */
const ANCHOR = 0.6;

/* Timeline in the style of a printed day plan: centre line, polaroids alternating sides.
   A red line fills the track as you scroll, and each marker turns red once it's reached. */
export default function HowItWorks() {
  const track = useRef<HTMLSpanElement>(null);
  const markers = useRef<(HTMLSpanElement | null)[]>([]);
  const [progress, setProgress] = useState(0);
  const [reached, setReached] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = track.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const line = window.innerHeight * ANCHOR;
      setProgress(Math.min(1, Math.max(0, (line - rect.top) / rect.height)));
      setReached(markers.current.filter((m) => m && m.getBoundingClientRect().top <= line).length);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="how-it-works" className="bg-white pb-20 sm:pb-28">
      <div className="mx-auto max-w-[1000px] px-4 sm:px-8">
        <div className="mb-12 text-center sm:mb-16">
          <p className="mb-3 text-[13px] font-medium text-brand">How it works</p>
          <h2 className="text-[30px] leading-[1.1] font-semibold tracking-[-0.035em] text-ink sm:text-[38px]">
            From sign-up to rewards
          </h2>
        </div>

        <ol className="relative">
          {/* grey track, with the red line filling it as you scroll */}
          <span
            ref={track}
            aria-hidden
            className="absolute top-2 bottom-2 left-[5px] w-px bg-black/10 lg:left-1/2 lg:-translate-x-1/2"
          >
            <span
              className="absolute inset-x-0 top-0 h-full origin-top bg-brand"
              style={{ transform: `scaleY(${progress})` }}
            />
          </span>

          {STEPS.map((s, i) => {
            const photoLeft = i % 2 === 0;
            const active = i < reached;
            return (
              <li key={s.title} className="relative grid items-center gap-6 pb-14 pl-8 last:pb-0 lg:grid-cols-2 lg:gap-24 lg:pb-20 lg:pl-0">
                {/* marker */}
                <span
                  ref={(el) => {
                    markers.current[i] = el;
                  }}
                  aria-hidden
                  className={`absolute top-1 left-0 size-[11px] rotate-45 rounded-[2px] ring-4 ring-white transition-colors duration-300 lg:left-1/2 lg:-translate-x-1/2 ${
                    active ? "bg-brand" : "bg-[#d9d9de]"
                  }`}
                />

                {/* polaroid */}
                <div className={`flex ${photoLeft ? "lg:justify-end" : "lg:order-2 lg:justify-start"}`}>
                  <figure
                    className={`w-full max-w-[300px] bg-white p-3 pb-10 shadow-[0_14px_30px_-16px_rgba(30,20,10,.35)] ring-1 ring-black/[0.06] ${
                      photoLeft ? "-rotate-2" : "rotate-2"
                    }`}
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <Image src={s.img} alt={s.alt} fill sizes="300px" className="object-cover" />
                    </div>
                  </figure>
                </div>

                {/* text */}
                <div className={photoLeft ? "lg:text-left" : "lg:order-1 lg:text-right"}>
                  <span
                    className={`block text-[56px] leading-none font-light tracking-[-0.04em] tabular-nums transition-colors duration-300 sm:text-[68px] ${
                      active ? "text-ink" : "text-black/25"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 mb-3 text-2xl leading-tight font-semibold tracking-[-0.025em] text-ink">{s.title}</h3>
                  <p className={`max-w-[320px] text-[15px] leading-[1.6] text-[#4a4a57] ${photoLeft ? "" : "lg:ml-auto"}`}>
                    {s.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
