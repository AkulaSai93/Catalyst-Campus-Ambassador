import HeroCta from "../hero/HeroCta";

/* Bookends the hero: same sky-to-sunset palette as the hero photo, as a soft gradient. */
export default function FinalCta() {
  return (
    <section
      id="final-cta"
      data-anim="stagger"
      className="bg-[linear-gradient(180deg,#e4eef8_0%,#f3efe9_55%,#fbe3c6_100%)] px-5 py-12 text-center sm:px-8 sm:py-16"
    >
      <h2 className="mx-auto mb-4 max-w-[760px] text-[26px] leading-[1.15] font-semibold tracking-[-0.035em] text-balance text-ink sm:max-w-none sm:text-[clamp(22px,3.6vw,40px)] sm:whitespace-nowrap">
        Your campus can start early. You can lead it.
      </h2>
      <p className="mx-auto mb-6 max-w-[520px] text-[16px] leading-[1.6] text-[#2f2f3a] sm:text-[17px]">
        Register in 2 minutes and get your ambassador dashboard today.
      </p>
      <HeroCta />
    </section>
  );
}
