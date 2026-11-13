const CRITERIA = [
  // TODO: eligibility wording to be finalised (per brief)
  "You're enrolled in an undergraduate program at a recognised college in India.",
  "You're active in your campus community: a club, a class group, a society, or simply the person friends come to for advice.",
  "You can give a few hours a week.",
  "No prior ambassador experience needed.",
];

export default function WhoCanApply() {
  return (
    <section id="who-can-apply" className="bg-white pb-14 sm:pb-16">
      <div className="mx-auto max-w-[1000px] px-4 sm:px-8">
        <div data-anim="stagger" className="mb-8 text-center sm:mb-10">
          <p className="mb-3 text-[13px] font-medium text-brand">Eligibility</p>
          <h2 className="text-[30px] leading-[1.1] font-semibold tracking-[-0.035em] text-ink sm:text-[38px]">Who can apply</h2>
        </div>

        <ul data-anim="stagger" className="grid border-t border-black/[0.08] sm:grid-cols-2">
          {CRITERIA.map((c, i) => (
            <li
              key={c}
              className={`flex gap-4 border-b border-black/[0.08] py-6 sm:py-8 ${
                i % 2 === 0 ? "sm:border-r sm:pr-10" : "sm:pl-10"
              }`}
            >
              <span className="mt-0.5 grid size-6 flex-none place-items-center rounded-[3px] bg-brand text-white">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <p className="text-[16px] leading-[1.6] text-[#2f2f3a]">{c}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
