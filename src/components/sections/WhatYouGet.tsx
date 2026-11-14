import Image from "next/image";
import type { ReactNode } from "react";

/* Soft pastel tints, one per reward */
const REWARDS: { title: string; body: string; bg: string; preview: ReactNode }[] = [
  {
    title: "Rewards on every enrolment",
    body: "Every friend who joins Catalyst through your link wins you a reward. The more students you inspire, the more you win.",
    bg: "bg-[#fde9e7]",
    preview: <EnrolmentPreview />,
  },
  {
    title: "Exclusive uGSOT goodies",
    body: "Fill the room for live sessions and unlock goodies you'll want to show off.",
    bg: "bg-[#fff1d6]",
    preview: <GoodiesPreview />,
  },
  {
    title: "Certificate of Appreciation",
    body: "Official recognition from upGrad School of Technology for the impact you create on your campus.",
    bg: "bg-[#e3eefe]",
    preview: <CertificatePreview />,
  },
  {
    title: "Letter of Recommendation",
    body: "For select ambassadors who stand out: a Letter of Recommendation from Vishwa Mohan to strengthen your internship and higher-studies applications.",
    bg: "bg-[#def4ea]",
    preview: <LetterPreview />,
  },
];

const BEYOND = [
  { color: "bg-[#e8343a]", text: "Work directly with uGSOT's growth team on real campaigns." },
  { color: "bg-[#f0a500]", text: "Host and meet industry leaders on your own campus." },
  { color: "bg-[#2f6fd6]", text: "The opportunity to interact 1:1 with Vishwa Mohan, CEO of uGSOT" },
];

export default function WhatYouGet() {
  return (
    <section id="what-you-get" className="bg-white pb-10 sm:pb-16">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div data-anim="stagger" className="mb-6 text-center sm:mb-10">
          <p className="mb-3 text-[13px] font-medium text-brand">What you get</p>
          <h2 className="text-[26px] leading-[1.15] font-semibold tracking-[-0.035em] text-balance text-ink sm:text-[38px] lg:whitespace-nowrap">
            Lead your campus. Get rewarded.
          </h2>
        </div>

        <ul data-anim="stagger" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REWARDS.map((r) => (
            <li
              key={r.title}
              className={`relative flex flex-col sm:h-[340px] overflow-hidden rounded-sm ${r.bg} ring-4 ring-white outline outline-black/[0.06]`}
            >
              <div className="p-5 pb-0 text-center">
                <h3 className="mb-1.5 text-[15.5px] leading-snug font-semibold tracking-[-0.015em] text-balance text-ink">
                  {r.title}
                </h3>
                <p className="text-[12.5px] leading-[1.55] text-[#5a5a66]">{r.body}</p>
              </div>
              {/* Preview panel peeking from the bottom-right */}
              <div className="mt-6 ml-8 translate-x-2 translate-y-2 sm:mt-auto">
                <div className="h-[156px] overflow-hidden rounded-tl-md bg-white shadow-[0_-10px_30px_-14px_rgba(10,10,16,.18)] ring-1 ring-black/[0.05]">
                  {r.preview}
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Beyond the rewards — light strip */}
        <div className="mt-14 text-center sm:mt-16">
          <h3 className="mb-8 text-[22px] leading-tight font-semibold tracking-[-0.025em] text-ink sm:text-[26px]">
            Beyond the rewards
          </h3>
          <ul data-anim="stagger" className="mx-auto grid max-w-[1080px] text-left sm:grid-cols-3 sm:divide-x sm:divide-black/[0.08]">
            {BEYOND.map((b) => (
              <li key={b.text} className="flex gap-3 py-3 text-[14.5px] leading-[1.55] text-[#4a4a57] sm:px-7">
                <span className={`mt-1 size-3.5 flex-none rounded-[3px] ${b.color}`} />
                {b.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* Previews are illustrative: they show the shape of each reward, never amounts or real students. */

function EnrolmentPreview() {
  const rows = [
    { bg: "bg-[#fbd5d1]", w: "62%" },
    { bg: "bg-[#d9e6fb]", w: "48%" },
    { bg: "bg-[#d4efe2]", w: "56%" },
  ];
  return (
    <div className="px-4 pt-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="h-2 w-20 rounded-full bg-black/[0.12]" />
        <span className="size-2 rounded-full bg-ok" />
      </div>
      <ul className="divide-y divide-black/[0.05]">
        {rows.map((r, i) => (
          <li key={i} className="flex items-center gap-2.5 py-2">
            <span className={`size-6 flex-none rounded-full ${r.bg}`} />
            <span className="flex min-w-0 flex-1 flex-col gap-1">
              <span className="h-[5px] rounded-full bg-black/[0.12]" style={{ width: r.w }} />
              <span className="h-[5px] w-1/3 rounded-full bg-black/[0.06]" />
            </span>
            <span className="grid size-6 flex-none place-items-center rounded-full bg-brand/10 text-brand">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M20 12v10H4V12" />
                <path d="M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
              </svg>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function GoodiesPreview() {
  return (
    <div className="relative h-full">
      <Image src="/get/goodies.jpg" alt="" fill sizes="260px" className="object-cover object-[30%_center]" />
    </div>
  );
}

function CertificatePreview() {
  return (
    <div className="h-full bg-[#f7f9fd] p-3 pr-0">
      <div className="relative h-[150px] border border-[#2f6fd6]/25 bg-white p-[3px]">
        <div className="flex h-full flex-col items-center border border-[#2f6fd6]/10 px-4 pt-5 text-center">
          <span className="h-[4px] w-14 rounded-full bg-black/[0.08]" />
          <span className="mt-2 h-[7px] w-28 rounded-full bg-black/[0.14]" />
          <span className="mt-2 font-script text-[22px] leading-none text-ink">Your name</span>
          <span className="mt-0.5 h-px w-24 bg-black/15" />
          <span className="mt-2.5 h-[4px] w-20 rounded-full bg-black/[0.06]" />
        </div>
        {/* seal */}
        <span className="absolute right-3 bottom-6 grid size-7 place-items-center rounded-full bg-brand ring-2 ring-brand/20 ring-offset-1">
          <span className="size-3 rounded-full border border-white/70" />
        </span>
      </div>
    </div>
  );
}

function LetterPreview() {
  return (
    <div className="px-4 pt-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="h-[7px] w-24 rounded-full bg-black/[0.14]" />
        <span className="h-3 w-9 rounded-full bg-[#def4ea]" />
      </div>
      {[100, 94, 98, 70].map((w, i) => (
        <span key={i} className="mb-[5px] block h-[3px] rounded-full bg-black/[0.08]" style={{ width: `${w}%` }} />
      ))}
      <span className="mt-2 block font-script text-[24px] leading-none text-ink">Vishwa Mohan</span>
    </div>
  );
}
