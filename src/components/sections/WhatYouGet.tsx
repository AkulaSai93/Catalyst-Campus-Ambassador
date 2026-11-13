import Image from "next/image";
import type { ReactNode } from "react";

/* Soft pastel tints, one per reward; `ink` is the accent used inside each preview */
const REWARDS: { title: string; body: string; bg: string; ink: string; preview: ReactNode }[] = [
  {
    title: "Rewards on every enrolment",
    body: "Every friend who joins Catalyst through your link wins you a reward. The more students you inspire, the more you win.",
    bg: "bg-[#fde9e7]",
    ink: "#e8343a",
    preview: <EnrolmentPreview />,
  },
  {
    title: "Exclusive uGSOT goodies",
    body: "Fill the room for live sessions and unlock goodies you'll want to show off.",
    bg: "bg-[#fff1d6]",
    ink: "#d98a00",
    preview: <GoodiesPreview />,
  },
  {
    title: "Certificate of Appreciation",
    body: "Official recognition from upGrad School of Technology for the impact you create on your campus.",
    bg: "bg-[#e3eefe]",
    ink: "#2f6fd6",
    preview: <CertificatePreview />,
  },
  {
    title: "Letter of Recommendation",
    body: "For select ambassadors who stand out: a Letter of Recommendation from Vishwa Mohan to strengthen your internship and higher-studies applications.",
    bg: "bg-[#def4ea]",
    ink: "#13946a",
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
      <div className="mx-auto max-w-[1180px] px-6 sm:px-8">
        <div data-anim="stagger" className="mb-6 text-center sm:mb-10">
          <p className="mb-3 text-[13px] font-medium text-brand">What you get</p>
          <h2 className="text-[30px] leading-[1.1] font-semibold tracking-[-0.035em] text-balance text-ink sm:text-[38px] lg:whitespace-nowrap">
            Lead your campus. Get rewarded.
          </h2>
        </div>

        <ul data-anim="stagger" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REWARDS.map((r) => (
            <li
              key={r.title}
              className={`relative flex flex-col sm:h-[340px] overflow-hidden rounded-sm ${r.bg} ring-4 ring-white outline outline-black/[0.06]`}
            >
              <div className="p-6 pb-0 text-center">
                <h3 className="mb-2 text-[18px] leading-snug font-semibold tracking-[-0.02em] text-balance text-ink">
                  {r.title}
                </h3>
                <p className="text-[13.5px] leading-[1.55] text-[#4a4a57]">{r.body}</p>
              </div>
              {/* App-window preview peeking from the bottom-right */}
              <div className="mt-6 ml-8 translate-x-2 translate-y-2 sm:mt-auto">
                <div className="overflow-hidden rounded-tl-sm border border-black/[0.06] bg-white/70 backdrop-blur-sm">
                  <div className="flex gap-1 px-3 py-2">
                    {[0, 1, 2].map((d) => (
                      <span key={d} className="size-1.5 rounded-full" style={{ background: r.ink, opacity: 0.35 }} />
                    ))}
                  </div>
                  <div className="h-[130px] bg-white">{r.preview}</div>
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
  return (
    <div className="flex flex-col gap-2 p-3">
      <div className="mb-0.5 flex items-center justify-between text-[10px] text-muted">
        <span className="font-semibold text-ink">Your dashboard</span>
        <span>Enrolments</span>
      </div>
      {["A", "R", "S"].map((initial, i) => (
        <div key={initial} className="flex items-center gap-2 rounded-sm bg-[#fafafa] px-2 py-1.5 ring-1 ring-black/[0.04]">
          <span className="grid size-5 flex-none place-items-center rounded-full bg-ink text-[9px] font-semibold text-white">
            {initial}
          </span>
          <span className="h-1 rounded-sm bg-black/10" style={{ width: `${46 - i * 8}%` }} />
          <span className="ml-auto rounded-sm bg-[#fde9e7] px-1.5 py-0.5 text-[9px] font-semibold whitespace-nowrap text-brand">
            + Reward
          </span>
        </div>
      ))}
    </div>
  );
}

function GoodiesPreview() {
  return (
    <div className="relative h-full">
      <Image src="/get/goodies.jpg" alt="" fill sizes="260px" className="object-cover object-[30%_center]" />
      <span className="absolute bottom-3 left-3 rounded-sm whitespace-nowrap bg-white px-2 py-1 text-[10px] font-semibold text-ink ring-1 ring-black/[0.06]">
        Goodies unlocked
      </span>
    </div>
  );
}

function CertificatePreview() {
  return (
    <div className="flex h-full items-start justify-start p-3">
      <div className="w-[200px] border border-[#2f6fd6]/30 p-1">
        <div className="flex flex-col items-center border border-[#2f6fd6]/15 px-3 py-3 text-center">
          <Image src="/logo-ugsot-catalyst.png" alt="" width={2360} height={300} className="mb-2 h-2.5 w-auto" />
          <span className="text-[7px] font-medium tracking-[0.16em] text-muted uppercase">Certificate of</span>
          <span className="text-[14px] leading-tight font-semibold tracking-[-0.02em] text-ink">Appreciation</span>
          <span className="mt-1.5 border-b border-black/15 px-3 pb-0.5 text-[10px] font-medium text-ink italic">Your name</span>
          <span className="mt-2 h-1 w-14 rounded-sm bg-black/10" />
        </div>
      </div>
    </div>
  );
}

function LetterPreview() {
  return (
    <div className="p-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[10px] font-semibold text-ink">Letter of Recommendation</p>
        <span className="rounded-sm bg-[#def4ea] px-1.5 py-0.5 text-[8px] font-semibold tracking-[0.06em] text-[#13946a] uppercase">
          Select
        </span>
      </div>
      {[100, 90, 96, 72, 84].map((w, i) => (
        <span key={i} className="mb-1.5 block h-1 rounded-sm bg-black/10" style={{ width: `${w}%` }} />
      ))}
      <p className="mt-3 text-[9px] text-muted">
        Warm regards,
        <br />
        <span className="font-medium text-ink">Vishwa Mohan</span>
      </p>
    </div>
  );
}
