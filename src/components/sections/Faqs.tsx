"use client";

import { useState } from "react";

const FAQS = [
  { q: "Is it free to join?", a: "Yes. There is no fee at any stage." },
  {
    q: "How much time does it take?",
    a: "A few hours a week, mostly sharing sessions with your network. A campus seminar takes more planning, and we support you through it.",
  },
  {
    q: "Do I need to sell Catalyst?",
    a: "No. You invite people to sessions. Our counsellors answer every question about the program and enrollment.",
  },
  {
    q: "How are rewards paid?",
    // TODO: confirm timing (per brief)
    a: "Through your personal links and dashboard. Vouchers are sent once each session's attendance is verified; enrollment rewards are paid after the enrolled student's refund period ends.",
  },
  {
    q: "What counts as attendance?",
    a: "Online: a registrant from your link who attends for at least 20 minutes. Offline: a registrant who checks in at the venue.",
  },
  {
    q: "Can I bring Vishwa Mohan to my college?",
    a: "Yes. Once 200 students from your campus register, we bring Vishwa to your college.",
  },
  {
    q: "Will this clash with my exams?",
    a: "You set your pace. Online sessions can be shared any time, from anywhere.",
  },
  {
    q: "Can the program change?",
    a: "It's a new program, so we may update rewards or formats. We'll always tell you in advance, and rewards you've already earned stay yours.",
  },
];

export default function Faqs() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faqs" className="bg-white pb-10 sm:pb-16">
      <div className="mx-auto max-w-[860px] px-5 sm:px-8">
        <div data-anim="stagger" className="mb-6 text-center sm:mb-10">
          <p className="mb-3 text-[13px] font-medium text-brand">FAQs</p>
          <h2 className="text-[26px] leading-[1.15] font-semibold tracking-[-0.035em] text-ink sm:text-[38px]">
            Questions, answered
          </h2>
        </div>

        <ul data-anim="stagger" className="border-t border-black/[0.08]">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className="border-b border-black/[0.08]">
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-5 text-left sm:py-6"
                  >
                    <span className="text-[17px] leading-snug font-medium tracking-[-0.01em] text-ink transition group-hover:text-brand sm:text-lg">
                      {f.q}
                    </span>
                    <span
                      aria-hidden
                      className={`relative size-7 flex-none rounded-[3px] transition-colors ${
                        isOpen ? "bg-brand text-white" : "bg-[#f3f3f5] text-ink"
                      }`}
                    >
                      <span className="absolute top-1/2 left-1/2 h-[1.5px] w-3 -translate-x-1/2 -translate-y-1/2 bg-current" />
                      <span
                        className={`absolute top-1/2 left-1/2 h-3 w-[1.5px] -translate-x-1/2 -translate-y-1/2 bg-current transition-transform duration-300 ${
                          isOpen ? "scale-y-0" : ""
                        }`}
                      />
                    </span>
                  </button>
                </h3>
                {/* grid-rows trick animates height to the answer's natural size */}
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[680px] pr-12 pb-6 text-[15px] leading-[1.65] text-[#4a4a57]">{f.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
