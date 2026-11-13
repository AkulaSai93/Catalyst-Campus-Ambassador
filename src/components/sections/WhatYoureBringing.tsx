const YEARS = ["Year 1", "Year 2", "Year 3", "Year 4"];

export default function WhatYoureBringing() {
  return (
    <section id="what-youre-bringing" className="bg-white pb-14 sm:pb-16">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-8">
        <div data-anim="stagger" className="mx-auto max-w-[920px] text-center">
          <p className="mb-3 text-[13px] font-medium text-brand">About Catalyst</p>
          <h2 className="mb-6 text-[30px] leading-[1.1] font-semibold tracking-[-0.035em] text-balance text-ink sm:text-[38px]">
            What you&apos;re bringing to your campus
          </h2>
          <p className="mx-auto max-w-[880px] text-[17px] leading-[1.65] text-[#2f2f3a] sm:text-lg">
            Catalyst is an online two-year technology accelerator from upGrad School of Technology that students take
            alongside their B.Tech, B.E., BCA or B.Sc. Live classes, real projects and a structured path from
            programming foundations to AI engineering, built by engineers from leading tech companies.
          </p>

          {/* Year 1, not Year 4 */}
          <div className="mx-auto mt-10 max-w-[600px] border-t border-black/[0.08] pt-8">
            <p className="mb-5 text-[15px] leading-[1.6] text-[#4a4a57]">
              When you share Catalyst, you help your peers start building in{" "}
              <span className="whitespace-nowrap">
                <span className="font-semibold text-ink">Year 1</span>, not Year 4.
              </span>
            </p>
            <ol className="grid grid-cols-4 gap-1.5 text-left" aria-label="Degree years">
              {YEARS.map((y, i) => (
                <li key={y}>
                  <span className={`block h-1.5 rounded-[1px] ${i === 0 ? "bg-brand" : "bg-black/10"}`} />
                  <span className={`mt-2 block text-xs whitespace-nowrap ${i === 0 ? "font-semibold text-brand" : "text-muted"}`}>
                    {i === 0 ? "Start building" : y}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <a
            href="https://sot.upgrad.com/catalyst"
            target="_blank"
            rel="noopener"
            className="group mt-10 inline-flex items-center gap-3 rounded-md bg-ink px-6 py-3 text-[15px] font-medium text-white transition hover:bg-black"
          >
            Explore Catalyst
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
