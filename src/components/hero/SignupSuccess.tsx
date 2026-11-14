import SuccessTick from "./SuccessTick";

// TODO: replace with the real Catalyst Campus Ambassador WhatsApp channel invite link
export const WHATSAPP_CHANNEL_URL = "https://whatsapp.com/channel/";

/* Shown after sign-up: confirmation and a full-width WhatsApp join bar */
export default function SignupSuccess({ firstName }: { firstName: string }) {
  return (
    <div className="animate-rise">
      <div className="px-6 pt-7 pb-6 sm:px-8">
        <div className="text-center">
          <SuccessTick className="size-[88px]" />
          <span className="mt-0.5 block text-[10.5px] font-semibold tracking-[0.16em] text-ok uppercase">
            Registration successful
          </span>
          <h2 id="signup-title" className="mt-2 text-[30px] leading-[1] font-semibold tracking-[-0.04em] text-brand">
            You&apos;re in, {firstName}.
          </h2>
          <p className="mx-auto mt-2.5 max-w-[340px] text-[13.5px] leading-relaxed text-muted">
            Welcome to the Catalyst Campus Ambassador Program. Your dashboard is ready.
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between border-y border-dashed border-black/[0.12] py-2.5 text-[10.5px] font-semibold tracking-[0.12em] uppercase">
          <span className="text-muted">Ambassador registered</span>
          <span className="text-ink">Free to join</span>
        </div>
      </div>

      <a
        href={WHATSAPP_CHANNEL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 bg-[#25D366] px-6 py-4 text-white transition hover:brightness-95 sm:px-8"
      >
        <WhatsAppIcon />
        <span className="min-w-0 flex-1">
          <span className="block text-[14.5px] leading-tight font-semibold">Join on WhatsApp</span>
          <span className="block text-[11.5px] leading-tight text-white/85">Catalyst Campus Ambassador channel</span>
        </span>
        <span aria-hidden className="text-lg font-semibold transition group-hover:translate-x-0.5">
          →
        </span>
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="flex-none">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.4.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  );
}
